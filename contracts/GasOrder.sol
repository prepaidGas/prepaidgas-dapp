// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;
// @todo refactor
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {FeeProcessor} from "./FeeProcessor.sol";
import {PaymentMethods} from "./PaymentMethods.sol";
import {Distributor} from "./Distributor.sol";
import "./Errors.sol" as Error;

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, markfender
 */

contract GasOrder is FeeProcessor, PaymentMethods, Distributor {
  using SafeERC20 for IERC20;

  address public immutable execution;

  uint256 public orders;

  mapping(uint256 => Order) public order;
  mapping(uint256 => Spend) public spend;

  mapping(uint256 => Deposit) public prepay;
  mapping(uint256 => Deposit) public guarantee;

  mapping(uint256 => address) public executor;

  event OrderCreate(uint256 id);

  modifier onlyExecutionManager() {
    if (execution != msg.sender) revert Error.Unauthorized(msg.sender, execution);
    _;
  }

  constructor(address executionManager) {
    execution = executionManager;
  }

  function createOrder(
    address spender,
    uint256 maxGas,
    uint256 maxCalls,
    uint256 deadline,
    address pToken,
    uint256 pGasPrice,
    address gToken,
    uint256 gGasPrice
  ) public paymentMethod(pToken) paymentMethod(gToken) {
    uint256 id = orders++;
    order[id] = Order({creator: msg.sender, spender: spender, maxGas: maxGas, maxCalls: maxCalls, deadline: deadline});
    prepay[id] = Deposit({token: pToken, gasPrice: pGasPrice});
    guarantee[id] = Deposit({token: gToken, gasPrice: gGasPrice});

    if (status(id) != Status.Pending) revert Error.OrderNotPending();

    IERC20(pToken).safeTransferFrom(msg.sender, address(this), pGasPrice * maxGas);

    emit OrderCreate(id);
  }

  function closeOrder(uint256 id) external {
    if (status(id) != Status.Exhausted) revert Error.OrderNotExhausted();

    _closeOrder(id);
  }

  function closeOrderForce(uint256 id) external {
    if (status(id) == Status.Fulfilled) revert Error.OrderFulfilled();
    if (order[id].creator != msg.sender) revert Error.Unauthorized(msg.sender, order[id].creator);

    _closeOrder(id);
  }

  function _closeOrder(uint256 id) internal {
    uint256 remainingGas = unusedGas(id);
    spend[id].gasTakenBack += remainingGas;

    IERC20(prepay[id].token).safeTransfer(order[id].creator, prepay[id].gasPrice * remainingGas);
    if (executor[id] != address(0))
      IERC20(guarantee[id].token).safeTransfer(executor[id], guarantee[id].gasPrice * remainingGas);

    // @todo emit event
  }

  function acceptOrder(uint256 id) public {
    if (status(id) != Status.Pending) revert Error.OrderNotPending();

    executor[id] = msg.sender;

    IERC20(guarantee[id].token).safeTransferFrom(msg.sender, address(this), order[id].maxGas * guarantee[id].gasPrice);

    // @todo emit event
  }

  function fundOrder(uint256 id, uint256 gasPriceIncrease) public {
    Status status = status(id);
    if (status != Status.Pending && status != Status.Active) revert Error.WrongStatus(status);

    prepay[id].gasPrice += gasPriceIncrease;

    IERC20(prepay[id].token).safeTransferFrom(msg.sender, address(this), gasPriceIncrease * unusedGas(id));

    // @todo emit event
  }

  // left 21000+500 Gas
  // price 1:1
  // (21000+500)x10 tokens locked
  // (21000+500)+21000+21000+25000
  // -(21000+500)x10 -(21000+21000+25000)

  function reportExecution(
    uint256 id,
    address fulfiller,
    uint256 gasSpent
  ) external onlyExecutionManager activeOrder(id) {
    uint256 remainingGas = unusedGas(id);
    // @todo validate if order has enough gas
    // if message gas-limit > remaining-gas => revert
    //

    if (gasSpent > remainingGas) gasSpent = remainingGas;

    spend[id].gasSpent += gasSpent;
    spend[id].calls++;

    _mint(fulfiller, prepay[id].token, prepay[id].gasPrice * gasSpent);
    _mint(fulfiller, guarantee[id].token, guarantee[id].gasPrice * gasSpent);
  }

  function unusedGas(uint256 id) public view returns (uint256) {
    return order[id].maxGas - (spend[id].gasSpent + spend[id].gasTakenBack);
  }

  function orderStatus(uint256 id) public view returns (Status) {
    if (unusedGas(id) == 0) return Status.Fulfilled;

    if (order[id].deadline < block.timestamp) return Status.Exhausted;
    if (spend[id].calls >= order[id].maxCalls) return Status.Exhausted;

    if (executor[id] == address(0)) return Status.Pending;

    return Status.Active;
  }
}
