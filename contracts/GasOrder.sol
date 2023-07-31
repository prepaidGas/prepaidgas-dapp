// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {FeeProcessor} from "./tools/FeeProcessor.sol";
import {Distributor} from "./tools/Distributor.sol";
import {ERC1155ish} from "./base/ERC1155ish.sol";
import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

import "./common/Errors.sol" as Error;

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, markfender
 */

contract GasOrder is IGasOrder, FeeProcessor, Distributor, ERC1155ish {
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
    Payment memory rewardValue,
    GasPayment calldata prepayValue,
    GasPayment calldata guaranteeValue // @todo replace with payment
  ) external deadlineNotMet(deadline) {
    uint256 id = orders++; // @todo (proposal) start from number 1

    _mint(msg.sender, id, maxGas);

    order[id] = Order({deadline: deadline});

    uint256 rewardFee = _calculateFee(rewardValue.amount);
    rewardValue.amount = rewardValue.amount - rewardFee;

    reward[id] = rewardValue;
    prepay[id] = prepayValue;
    guarantee[id] = guaranteeValue;

    IERC20(rewardValue.token).safeTransferFrom(msg.sender, address(this), rewardValue.amount);
    IERC20(prepayValue.token).safeTransferFrom(msg.sender, address(this), prepayValue.gasPrice * maxGas);

    _takeFee(rewardValue.token, rewardFee);

    emit OrderCreate(id);
  }

  function acceptOrder(uint256 id) public {
    if (status(id) != OrderStatus.Pending) revert Error.WrongOrderStatus(status(id), OrderStatus.Pending);

    executor[id] = msg.sender;

    IERC20(guarantee[id].token).safeTransferFrom(msg.sender, address(this), totalSupply(id) * guarantee[id].gasPrice);
    IERC20(reward[id].token).safeTransfer(msg.sender, reward[id].amount);

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
      uint256 unlock = guarantee[id].gasPrice * gasSpent;
      uint256 unlockFee = _calculateFee(unlock);
      address unlockToken = guarantee[id].token;
      _distribute(fulfiller, unlockToken, unlock - unlockFee);
      _takeFee(unlockToken, unlockFee);
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
