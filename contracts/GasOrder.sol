// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {FeeProcessor} from "./tools/FeeProcessor.sol";
import {ERC1155ish} from "./base/ERC1155ish.sol";
import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

import "./common/Errors.sol" as Error;

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

  event OrderCreate(uint256 id);
  event OrderAccept(uint256 id, address executor);

  modifier executionCallback() {
    if (execution != msg.sender) revert Error.Unauthorized(msg.sender, execution);
    _;
  }

  modifier deadlineNotMet(uint256 deadline) {
    if (deadline <= block.timestamp) revert Error.DeadlineExpired(block.timestamp, deadline);
    _;
  }

  constructor(address executionEndpoint, string memory link) ERC1155ish(link) {
    execution = executionEndpoint;
  }

  function createOrder(
    uint256 maxGas,
    uint256 deadline,
    Payment calldata rewardValue,
    GasPayment calldata prepayValue,
    GasPayment calldata guaranteeValue,
    uint256 rewardTransfer,
    uint256 prepayTransfer
  ) external deadlineNotMet(deadline) {
    uint256 id = orders++;

    order[id] = Order({deadline: deadline});

    reward[id] = rewardValue;
    prepay[id] = prepayValue;
    guarantee[id] = guaranteeValue;

    uint256 incomeReward = _acceptIncoming(rewardValue.token, msg.sender, rewardTransfer);
    if (incomeReward < rewardValue.amount) revert Error.BadIncomeTransfer(incomeReward, rewardValue.amount);
    _distribute(msg.sender, rewardValue.token, incomeReward - rewardValue.amount);

    uint256 incomePrepay = _acceptIncoming(prepayValue.token, msg.sender, prepayTransfer);
    uint256 expectedPrepay = prepayValue.gasPrice * maxGas;
    if (incomePrepay < expectedPrepay) revert Error.BadIncomeTransfer(incomePrepay, expectedPrepay);
    _distribute(msg.sender, prepayValue.token, incomePrepay - expectedPrepay);

    /// @dev before mint is called entering to all the functions (for the id) is impossible
    _mint(msg.sender, id, maxGas);

    emit OrderCreate(id);
  }

  function acceptOrder(uint256 id, uint256 guaranteeTransfer) public {
    if (status(id) != OrderStatus.Pending) revert Error.WrongOrderStatus(status(id), OrderStatus.Pending);

    executor[id] = msg.sender;

    uint256 incomeGuarantee = _acceptIncoming(guarantee[id].token, msg.sender, guaranteeTransfer);
    uint256 expectedGuarantee = totalSupply(id) * guarantee[id].gasPrice;
    if (incomeGuarantee < expectedGuarantee) revert Error.BadIncomeTransfer(incomeGuarantee, expectedGuarantee);
    _distribute(msg.sender, guarantee[id].token, incomeGuarantee - expectedGuarantee);

    IERC20(reward[id].token).safeTransfer(msg.sender, _takeFee(reward[id].token, reward[id].amount));

    emit OrderAccept(id, msg.sender);
  }

  function retrievePrepay(address holder, uint256 id, uint256 amount) external {
    _utilizeOperator(holder, id, msg.sender, amount);

    if (executor[id] != address(0)) _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * amount);
    IERC20(prepay[id].token).safeTransfer(holder, prepay[id].gasPrice * amount);
  }

  function retrieveGuarantee(uint256 id) external {
    if (status(id) != OrderStatus.Exhausted) revert Error.WrongOrderStatus(status(id), OrderStatus.Exhausted);

    _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * totalSupply(id));
    executor[id] = address(0);
  }

  function reportExecution(
    uint256 id,
    address signer,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external executionCallback {
    if (status(id) != OrderStatus.Active) revert Error.WrongOrderStatus(status(id), OrderStatus.Active);

    uint256 balance = usable(onBehalf, id, signer);
    if (gasLimit > balance) revert Error.GasLimitExceedBalance(gasLimit, balance);

    if (gasSpent > balance) gasSpent = balance;
    _utilizeAllowance(onBehalf, id, signer, gasSpent);

    if (fulfiller == address(0)) fulfiller = executor[id];

    _distribute(fulfiller, prepay[id].token, prepay[id].gasPrice * gasSpent);

    if (fulfiller == executor[id]) {
      _distribute(fulfiller, guarantee[id].token, guarantee[id].gasPrice * gasSpent);
    } else {
      address unlockToken = guarantee[id].token;
      _distribute(fulfiller, unlockToken, _takeFee(unlockToken, guarantee[id].gasPrice * gasSpent));
    }
  }

  function status(uint256 id) public view returns (OrderStatus) {
    if (totalSupply(id) == 0) return OrderStatus.Fulfilled;
    if (executor[id] == address(0) && order[id].deadline < block.timestamp) return OrderStatus.Fulfilled;

    if (order[id].deadline < block.timestamp) return OrderStatus.Exhausted;

    if (executor[id] == address(0)) return OrderStatus.Pending;

    return OrderStatus.Active;
  }
}
