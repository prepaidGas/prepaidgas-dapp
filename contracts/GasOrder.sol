// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {FeeProcessor} from "./tools/FeeProcessor.sol";
import {ERC1155ish} from "./base/ERC1155ish.sol";
import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;

//@todo remove
import "hardhat/console.sol";

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, markfender
 */

contract GasOrder is IGasOrder, FeeProcessor, ERC1155ish {
  using SafeERC20 for IERC20;

  address public immutable execution;

  uint256 public orders;
  mapping(uint256 => Order) public order;

  mapping(uint256 => Payment) public reward;
  mapping(uint256 => GasPayment) public prepay;
  mapping(uint256 => GasPayment) public guarantee;

  mapping(uint256 => address) public executor;

  event OrderCreate(uint256 indexed id, uint256 executionWindow);
  event OrderAccept(uint256 indexed id, address indexed executor);

  modifier executionCallback() {
    if (execution != msg.sender) revert Error.Unauthorized(msg.sender, execution);
    _;
  }

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

  function createOrder(
    uint256 maxGas,
    uint256 deadline,
    uint256 acceptDeadline,
    uint256 executionWindow,
    Payment calldata rewardValue,
    GasPayment calldata prepayValue,
    GasPayment calldata guaranteeValue,
    uint256 rewardTransfer, // @todo replace with rewardTransfer amount and prepayTransferAmount
    uint256 prepayTransfer
  ) external deadlineNotMet(deadline) deadlineNotMet(acceptDeadline) possibleExecutionWindow(executionWindow) {
    uint256 id = orders++;

    if (acceptDeadline > deadline) acceptDeadline = deadline;

    order[id] = Order({ // @todo add start date deadline
      creator: msg.sender,
      maxGas: maxGas,
      deadline: deadline,
      acceptDeadline: acceptDeadline, // @todo add ability to revoke any time
      executionWindow: executionWindow
    });

    reward[id] = rewardValue;
    prepay[id] = prepayValue;
    guarantee[id] = guaranteeValue;

    _acceptIncomingOrderCreate(maxGas, rewardValue, prepayValue, rewardTransfer, prepayTransfer);

    emit OrderCreate(id, executionWindow);
  }

  // @dev function to avoid stack too deep issue
  function _acceptIncomingOrderCreate(
    uint256 maxGas,
    Payment calldata rewardValue,
    GasPayment calldata prepayValue,
    uint256 rewardTransfer,
    uint256 prepayTransfer
  ) private {
    _acceptIncoming(rewardValue.token, msg.sender, rewardTransfer, rewardValue.amount);
    _acceptIncoming(prepayValue.token, msg.sender, prepayTransfer, prepayValue.gasPrice * maxGas);
  }

  function acceptOrder(uint256 id, uint256 guaranteeTransfer) external specificStatus(id, OrderStatus.Pending) {
    executor[id] = msg.sender;
    _mint(order[id].creator, id, order[id].maxGas);

    _distribute(msg.sender, reward[id].token, _takeFee(reward[id].token, reward[id].amount));
    _acceptIncoming(guarantee[id].token, msg.sender, guaranteeTransfer, totalSupply(id) * guarantee[id].gasPrice);

    emit OrderAccept(id, msg.sender);
  }

  function retrievePrepay(address holder, uint256 id, uint256 amount) external {
    _utilizeOperator(holder, id, msg.sender, amount);

    OrderStatus orderStatus = status(id);
    if (orderStatus == OrderStatus.Active || orderStatus == OrderStatus.Exhausted)
      _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * amount);

    IERC20(prepay[id].token).safeTransfer(holder, prepay[id].gasPrice * amount);
  }

  function retrieveGuarantee(uint256 id) external specificStatus(id, OrderStatus.Exhausted) {
    _guaranteeAndRewardDelivered(id);
    _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * totalSupply(id));
  }

  function retrieveReward(uint256 id) external specificStatus(id, OrderStatus.Untaken) {
    // @todo add ability to revoke during Pending
    // @todo might be removed
    if (msg.sender != order[id].creator) revert Error.Unauthorized(msg.sender, order[id].creator);

    _guaranteeAndRewardDelivered(id);
    IERC20(reward[id].token).safeTransfer(order[id].creator, reward[id].amount);
    // @notice prepay also should be withdrawn back to the creator
    IERC20(prepay[id].token).safeTransfer(order[id].creator, prepay[id].gasPrice * order[id].maxGas);
  }

  function reportExecution(
    uint256 id,
    address signer,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external executionCallback specificStatus(id, OrderStatus.Active) {
    uint256 balance = usable(onBehalf, id, signer);
    if (gasLimit > balance) revert Error.GasLimitExceedBalance(gasLimit, balance);

    /// @dev should not happen in ordinary situations
    if (gasSpent > balance) gasSpent = balance;
    _utilizeAllowance(onBehalf, id, signer, gasSpent);

    if (fulfiller == address(0)) fulfiller = executor[id];

    _distribute(fulfiller, prepay[id].token, prepay[id].gasPrice * gasSpent);

    uint256 unlockAmount = guarantee[id].gasPrice * gasSpent;
    if (fulfiller == executor[id]) {
      _distribute(fulfiller, guarantee[id].token, unlockAmount);
    } else {
      address unlockToken = guarantee[id].token;
      _distribute(fulfiller, unlockToken, _takeFee(unlockToken, unlockAmount));
    }
  }

  function status(uint256 id) public view returns (OrderStatus) {
    if (order[id].creator == address(0)) return OrderStatus.Closed;
    if (executor[id] == address(1)) return OrderStatus.Closed;

    if (executor[id] == address(0)) {
      if (order[id].acceptDeadline < block.timestamp) return OrderStatus.Untaken;
      return OrderStatus.Pending;
    }

    if (totalSupply(id) == 0) return OrderStatus.Closed;
    if (order[id].deadline < block.timestamp) return OrderStatus.Exhausted;

    return OrderStatus.Active;
  }

  function _guaranteeAndRewardDelivered(uint256 id) private {
    executor[id] = address(1);
  }
}
