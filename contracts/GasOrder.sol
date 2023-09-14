// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ERC1155ish} from "./base/ERC1155ish.sol";

import {FeeProcessor} from "./tools/FeeProcessor.sol";

import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, web3skeptic (markfender)
 */

contract GasOrder is IGasOrder, FeeProcessor, ERC1155ish {
  using SafeERC20 for IERC20;

  address public immutable execution;

  uint256 public ordersCount;
  mapping(uint256 => Order) public order;

  mapping(uint256 => Payment) public reward;
  mapping(uint256 => GasPayment) public gasCost;
  mapping(uint256 => GasPayment) public guarantee;

  mapping(uint256 => address) public executor;

  event OrderCreate(uint256 indexed id, uint256 executionWindow);
  event OrderAccept(uint256 indexed id, address indexed executor);

  modifier executionCallback() {
    if (execution != msg.sender) revert Error.Unauthorized(msg.sender, execution);
    _;
  }
  /* @todo implement modifier of getter
  modifier orderExists(uint256 id) {
    
  }*/

  modifier deadlineNotMet(uint256 deadline) {
    if (deadline <= block.timestamp) revert Error.DeadlineExpired(block.timestamp, deadline);
    _;
  }

  modifier possibleExecutionWindow(uint256 window) {
    if (window < Const.MIN_EXEC_WINDOW) revert Error.OverlowValue(window, Const.MIN_EXEC_WINDOW);
    _;
  }

  modifier specificStatus(uint256 id, OrderStatus expected) {
    OrderStatus real = status(id);
    if (real != expected) revert Error.WrongOrderStatus(real, expected);
    _;
  }

  constructor(address executionEndpoint, string memory link) ERC1155ish(link) {
    execution = executionEndpoint;
  }

  // @todo add orderExist function
  // @todo add support of our _msgSender
  // @todo gas optimization
  function createOrder(
    uint256 maxGas,
    // uint256 maxGasCost, // @todo add maxGasCost
    uint256 executionPeriodStart,
    uint256 executionPeriodDeadline,
    uint256 executionWindow,
    bool revokable,
    Payment calldata rewardValue,
    GasPayment calldata gasCostValue,
    GasPayment calldata guaranteeValue,
    uint256 rewardTransfer,
    uint256 gasCostTransfer
  )
    external
    deadlineNotMet(executionPeriodDeadline)
    deadlineNotMet(executionPeriodStart)
    possibleExecutionWindow(executionWindow)
  {
    require(executionPeriodStart + executionWindow < executionPeriodDeadline); // @todo add error msg
    require(maxGas > 0); // @todo consider replacing `0` with the value which represents the minimum valuable value

    uint256 id = ordersCount++;

    order[id] = Order({
      creator: msg.sender, // @todo replace with `owner`, make transferable
      maxGas: maxGas,
      /// @dev magic number, should be removed in the future
      maxGasPrice: 1 ether,
      executionPeriodStart: executionPeriodStart,
      executionPeriodDeadline: executionPeriodDeadline,
      executionWindow: executionWindow,
      isRevokable: revokable
    });

    reward[id] = rewardValue;
    gasCost[id] = gasCostValue;
    guarantee[id] = guaranteeValue;

    _acceptIncomingOrderCreate(maxGas, rewardValue, gasCostValue, rewardTransfer, gasCostTransfer);

    emit OrderCreate(id, executionWindow);
  }

  /// @dev function to avoid stack too deep issue
  function _acceptIncomingOrderCreate(
    uint256 maxGas,
    Payment calldata rewardValue,
    GasPayment calldata gasCostValue,
    uint256 rewardTransfer,
    uint256 gasCostTransfer
  ) private {
    _acceptIncoming(rewardValue.token, msg.sender, rewardTransfer, rewardValue.amount);
    _acceptIncoming(gasCostValue.token, msg.sender, gasCostTransfer, gasCostValue.gasPrice * maxGas);
  }

  function acceptOrder(uint256 id, uint256 guaranteeTransfer) external specificStatus(id, OrderStatus.Pending) {
    executor[id] = msg.sender;
    _mint(order[id].creator, id, order[id].maxGas);

    _distribute(msg.sender, reward[id].token, _takeFee(reward[id].token, reward[id].amount));
    _acceptIncoming(guarantee[id].token, msg.sender, guaranteeTransfer, totalSupply(id) * guarantee[id].gasPrice);

    emit OrderAccept(id, msg.sender);
  }

  function retrieveGasCost(address holder, uint256 id, uint256 amount) external {
    _utilizeOperator(holder, id, msg.sender, amount);

    OrderStatus orderStatus = status(id);
    if (orderStatus == OrderStatus.Active || orderStatus == OrderStatus.Inactive)
      _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * amount);

    IERC20(gasCost[id].token).safeTransfer(holder, gasCost[id].gasPrice * amount);
  }

  function retrieveGuarantee(uint256 id) external specificStatus(id, OrderStatus.Inactive) {
    _guaranteeAndRewardDelivered(id); // @todo it might be already
    _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * totalSupply(id));
  }

  function revokeOrder(uint256 id) external {
    Order memory currentOrder = order[id];
    if (msg.sender != currentOrder.creator) revert Error.Unauthorized(msg.sender, currentOrder.creator);

    OrderStatus currentStatus = status(id);
    if (
      currentStatus == OrderStatus.Pending ||
      (currentOrder.isRevokable && (currentStatus == OrderStatus.Accepted || currentStatus == OrderStatus.Active))
    ) {
      _guaranteeAndRewardDelivered(id);
      IERC20(reward[id].token).safeTransfer(order[id].creator, reward[id].amount);
      /// @notice gasCost also should be withdrawn back to the creator
      IERC20(gasCost[id].token).safeTransfer(order[id].creator, gasCost[id].gasPrice * order[id].maxGas);
    } else {
      revert Error.RevokeNotAllowed(currentOrder.isRevokable, currentStatus);
    }
  }

  function reportExecution(
    uint256 id,
    address from,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external executionCallback specificStatus(id, OrderStatus.Active) {
    uint256 balance = usable(onBehalf, id, from);
    if (gasLimit > balance) revert Error.GasLimitExceedBalance(gasLimit, balance);

    /// @dev should not happen in ordinary situations
    if (gasSpent > balance) gasSpent = balance;
    _utilizeAllowance(onBehalf, id, from, gasSpent);

    if (fulfiller == address(0)) fulfiller = executor[id];

    _distribute(fulfiller, gasCost[id].token, gasCost[id].gasPrice * gasSpent);

    uint256 unlockAmount = guarantee[id].gasPrice * gasSpent;
    if (fulfiller == executor[id]) {
      _distribute(fulfiller, guarantee[id].token, unlockAmount);
    } else {
      address unlockToken = guarantee[id].token;
      _distribute(fulfiller, unlockToken, _takeFee(unlockToken, unlockAmount));
    }
  }

  /// @notice if the order is published and not accepted by any Executor it is still in `Pending` status
  /// until the `block.timestamp` excceds the `Order.executionPeriodDeadline`
  // @todo verify the function and all the possible states
  function status(uint256 id) public view returns (OrderStatus) {
    if (order[id].creator == address(0)) return OrderStatus.None;
    if (executor[id] == address(1)) return OrderStatus.Closed;

    if (executor[id] == address(0) && order[id].executionPeriodDeadline >= block.timestamp) {
      return OrderStatus.Pending;
    }

    if (executor[id] != address(0) && totalSupply(id) == 0) return OrderStatus.Inactive;

    if (order[id].executionPeriodStart > block.timestamp) return OrderStatus.Accepted;
    return OrderStatus.Active;
  }

  function _guaranteeAndRewardDelivered(uint256 id) private {
    executor[id] = address(1);
  }
}
