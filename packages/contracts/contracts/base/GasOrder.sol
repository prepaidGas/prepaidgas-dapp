// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {Order, OrderStatus, GasPayment, Payment} from "../interfaces/IGasOrder.sol";
import {Distributor} from "../tools/Distributor.sol";

/**
 * @title GasOrder
 * @notice The contract provides functionality for orders creation and management
 * @dev State diagram:
 *   ```mermaids
 *   graph TB;
 *   Pending -- expire <= time --> Untaken
 *   Untaken -- orderRefund --> Closed
 *   Accepted -- unwrap all --> Closed
 *
 *   %% Main stream
 *   None -- orderNew --> Pending
 *   Pending -- orderAccept --> Accepted
 *   Accepted -- start <= time --> Active
 *   Active -- end <= time --> Inactive
 *   Inactive -- orderClose --> Closed
 *
 *   Pending -- orderRevoke --> Closed
 *   Active -- unwrap/use all --> Closed
 *   ```
 */
contract GasOrder is Distributor {
  using SafeERC20 for IERC20;

  uint256 private _orders;
  mapping(uint256 => Order) private _order;

  mapping(uint256 => OrderStatus) private _status;
  mapping(uint256 => address) private _executor;

  mapping(uint256 => Payment) private _acceptReward;
  mapping(uint256 => GasPayment) private _gasPrice;
  mapping(uint256 => GasPayment) private _gasGuarantee;

  modifier possibleTxWindow(uint256 window) {
    if (window < MIN_TX_WINDOW) revert BelowMin(window, MIN_TX_WINDOW);
    _;
  }

  modifier specificStatus(uint256 id, OrderStatus expected) {
    OrderStatus real = status(id);

    if (real != expected) revert WrongOrderStatus(real, expected);
    _;
  }

  event OrderCreate(uint256 indexed id, uint256 end);
  event OrderTransfer(uint256 indexed id, address indexed from, address indexed to);
  event OrderRefund(uint256 indexed id);
  event OrderRevoke(uint256 indexed id);
  event OrderAccept(uint256 indexed id, address indexed executor);
  event OrderClose(uint256 indexed id, uint256 gas);

  /**
   * @notice Get actual order status
   * @dev While `_status[id]` keeps the last recorded status, the function aplies variable conditions according
   *   to the state diagram: status depends on `block.timestamp` and `totalSupply`
   * @dev Requirements:
   *   - `totalSupply` should decrease only
   *   - `block.timestamp` should increase only
   * @return Returns actual order status
   */
  function _status(uint256 id) internal view returns (OrderStatus) {
    OrderStatus status = _status[id];

    if (status == OrderStatus.Closed) return OrderStatus.Closed;

    Order order = _order[id];
    if (status == OrderStatus.Pending) {
      if (order.expire <= block.timestamp) return OrderStatus.Untaken;
      return OrderStatus.Pending;
    }
    if (status == OrderStatus.Accepted) {
      if (totalSupply(id) == 0) return OrderStatus.Closed;
      if (order.end <= block.timestamp) return OrderStatus.Inactive;
      if (order.start <= block.timestamp) return OrderStatus.Active;
      return OrderStatus.Accepted;
    }
  }

  /**
   * @notice Create new order
   * @notice The function reserves gas price * gas ordered and the executor reward
   * @dev Constraints:
   *   - `block.timestamp < expire < end`
   *   - `start < end`
   *   - `txWindow` should be reasonable
   * @return Returns id of created order
   */
  function _orderNew(
    uint256 gas,
    uint256 expire,
    uint256 start,
    uint256 end,
    uint256 txWindow,
    Payment calldata acceptReward,
    GasPayment calldata gasPrice,
    GasPayment calldata gasGuarantee
  ) internal possibleTxWindow(txWindow) returns (uint256) {
    if (end <= start) revert();
    if (end <= expire) revert();
    if (expire <= block.timestamp) revert();

    if (gas == 0) revert();

    uint256 id = _orders++;
    _order[id] = Order(msg.sender, gas, expire, start, end, txWindow);

    _acceptReward[id] = acceptReward;
    _gasPrice[id] = gasPrice;
    _gasGuarantee[id] = gasGuarantee;

    uint256 totalGasPrice = gasPrice.gasPrice * gas;
    _acceptIncoming(acceptReward.token, msg.sender, acceptReward.amount, acceptReward.amount);
    _acceptIncoming(gasPrice.token, msg.sender, totalGasPrice, totalGasPrice);

    emit OrderCreate(id, end);

    return id;
  }

  /**
   * @notice Transfer order to another manager
   * @notice Order selling requires special smart contract and generally is not recommended
   * @dev Constraints:
   *   - `to != 0x0`
   * @dev May somehow race with `_orderAccept`
   */
  function _orderTransfer(uint256 id, address to) internal {
    if (to == address(0x0)) revert();

    address from = order(_orderId).manager;
    if (msg.sender != from) revert Unauthorized(msg.sender, from);

    _order[id].manager = to;

    emit OrderTransfer(id, from, to);
  }

  /**
   * @notice Refund gas price * gas ordered and the executor reward if order expired
   */
  function _orderRefund(uint256 id) internal specificStatus(id, OrderStatus.Untaken) {
    Order memory order = _order[id];
    _status[id] = OrderStatus.Closed;

    Payment acceptReward = _acceptReward[id];
    GasPayment gasPrice = _gasPrice[id];
    IERC20(acceptReward.token).safeTransfer(order.manager, acceptReward.amount);
    IERC20(gasPrice.token).safeTransfer(order.manager, gasPrice.gasPrice * order.gas);

    emit orderRefund(id);
  }

  /**
   * @notice Revoke order refunding gas price * gas ordered and the executor reward
   * @dev Constraints:
   *   - only order manager can call the function
   * @dev May race with `_orderAccept`
   */
  function _orderRevoke(uint256 id) internal specificStatus(id, OrderStatus.Pending) {
    Order memory order = _order[id];
    if (msg.sender != order.manager) revert Unauthorized(msg.sender, order.manager);

    _status[id] = OrderStatus.Closed;

    Payment acceptReward = _acceptReward[id];
    GasPayment gasPrice = _gasPrice[id];
    IERC20(acceptReward.token).safeTransfer(order.manager, acceptReward.amount);
    IERC20(gasPrice.token).safeTransfer(order.manager, gasPrice.gasPrice * order.gas);

    emit orderRevoke(id);
  }

  /**
   * @notice Accept order unlocking executor reward and reserving execution guarantee
   * @dev Should happen in same transaction with gas tokens mint
   * @dev May race with `_orderRevoke`
   */
  function _orderAccept(uint256 id) internal specificStatus(id, OrderStatus.Pending) {
    _status[id] = OrderStatus.Accepted;
    _executor[id] = msg.sender;

    Order memory order = _order[id];
    Payment acceptReward = _acceptReward[id];
    GasPayment gasGuarantee = _gasGuarantee[id];

    _distribute(msg.sender, acceptReward.token, _takeFee(Fee.AcceptReward, acceptReward.token, acceptReward.amount));
    _acceptIncoming(gasGuarantee.token, msg.sender, guaranteeTransfer, order.gas * gasGuarantee.gasPrice);

    emit OrderAccept(id, msg.sender);
  }

  /**
   * @notice Close order refunding execution guarantee
   */
  function _orderClose(uint256 id) internal specificStatus(id, OrderStatus.Inactive) {
    _status[id] = OrderStatus.Closed;

    GasPayment gasGuarantee = _gasGuarantee[id];
    uint256 gas = totalSupply(id);
    _distribute(_executor[id], gasGuarantee.token, gasGuarantee.gasPrice * gas);

    emit OrderClose(id, gas);
  }

  /**
   * @notice Free guarantee for gas used
   * @dev Should happen in same transaction with gas tokens burn
   */
  function _orderGuaranteeFree(uint256 id, uint256 gas) internal specificStatus(id, OrderStatus.Active) {
    GasPayment gasGuarantee = _gasGuarantee[id];
    _distribute(_executor[id], gasGuarantee.token, gasGuarantee.gasPrice * gas);
  }
}
