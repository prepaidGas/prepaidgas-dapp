// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {FeeProcessor} from "./FeeProcessor.sol";
import {PaymentMethods} from "./PaymentMethods.sol";
import "./Errors.sol" as Error;

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, markfender
 */

contract GasOrder is FeeProcessor, PaymentMethods {
  using SafeERC20 for IERC20;

  struct Order {
    address creator;
    address spender;
    uint256 maxGas;
    uint256 maxCalls;
    uint256 deadline;
  }

  struct Spend {
    uint256 gasExecuted;
    uint256 gasLiquidated;
    uint256 gasTakenBack;
    uint256 calls;
  }

  struct Deposit {
    address token;
    uint256 gasPrice;
  }

  uint256 public orders;

  mapping(uint256 => Order) public order;
  mapping(uint256 => Spend) public spend;

  mapping(uint256 => Deposit) public prepay;
  mapping(uint256 => Deposit) public guarantee;

  mapping(uint256 => address) public executor;

  event OrderCreate(uint256 id);

  modifier activeOrder(uint256 id) {
    if (order[id].deadline < block.timestamp) revert Error.DeadlineExpired(block.timestamp, order[id].deadline);
    _;
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
  ) public onlyPaymentMethod(pToken) onlyPaymentMethod(gToken) {
    uint256 id = orders++;
    order[id] = Order({creator: msg.sender, spender: spender, maxGas: maxGas, maxCalls: maxCalls, deadline: deadline});
    prepay[id] = Deposit({token: pToken, gasPrice: pGasPrice});
    guarantee[id] = Deposit({token: gToken, gasPrice: gGasPrice});

    IERC20(pToken).safeTransferFrom(msg.sender, address(this), pGasPrice * maxGas);

    emit OrderCreate(id);
  }

  function closeOrder(uint256 id) public {
    if (order[id].creator != msg.sender) revert Error.Unauthorized(msg.sender, order[id].creator);

    if (order[id].deadline >= block.timestamp) order[id].deadline = block.timestamp - 1;

    uint256 remainingGas = (order[id].maxGas -
      (spend[id].gasExecuted + spend[id].gasLiquidated + spend[id].gasTakenBack));

    spend[id].gasTakenBack += remainingGas;
    IERC20(prepay[id].token).safeTransferFrom(address(this), order[id].creator, prepay[id].gasPrice * remainingGas);

    // @todo emit event
  }

  function acceptOrder(uint256 id) public activeOrder(id) {
    if (executor[id] != address(0x0)) revert Error.OrderExecutorExhausted(id);

    executor[id] = msg.sender;

    IERC20(guarantee[id].token).safeTransferFrom(msg.sender, address(this), order[id].maxGas * guarantee[id].gasPrice);

    // @todo emit event
  }

  function fundOrder(uint256 id, uint256 gasPriceIncrease) public activeOrder(id) {
    prepay[id].gasPrice += gasPriceIncrease;

    IERC20(prepay[id].token).safeTransferFrom(msg.sender, address(this), gasPriceIncrease * order[id].maxGas);

    // @todo emit event
  }

  // CALLBACKS
  // @todo add valiation that msg is approved by signer
  // @todo allow executing a portion of Gas
  // @todo add protocol fee
  // function executionCallback(uint256 _orderId, address _currentExecutor, uint256 _gasSpent) public {
  //   Order storage currentOrder = orders[_orderId];
  //   require(currentOrder.currentStatus == OrderStatus.Active);
  //   // Active => Fulfilled
  //   if (_currentExecutor != orders[_orderId].executor) {
  //     // unlock executor balance
  //     currentOrder.currentStatus = OrderStatus.Liquidated;

  //     IERC20(executionCost[_orderId].token).safeTransferFrom(
  //       address(this),
  //       currentOrder.creator,
  //       executionCost[_orderId].amount
  //     );
  //   } else {
  //     currentOrder.currentStatus = OrderStatus.Fulfilled;

  //     IERC20(executionCost[_orderId].token).safeTransferFrom(
  //       address(this),
  //       _currentExecutor,
  //       executionCost[_orderId].amount
  //     );
  //   }

  //   IERC20(lockedDeposit[_orderId].token).safeTransferFrom(
  //     address(this),
  //     _currentExecutor,
  //     lockedDeposit[_orderId].amount
  //   );
  // }

  // client (sign msg to validator)
  // validator (sign that the msg is valid, publish)
  // executor (execute)
}
