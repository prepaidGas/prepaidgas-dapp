// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import {Order, FilteredOrder, OrderStatus, GasPayment, Payment, IGasOrder} from "../interfaces/IGasOrder.sol";

contract GasOrderStateVariables {
  uint256 public ordersCount;
  mapping(uint256 => Order) public order;

  mapping(uint256 => Payment) public reward;
  mapping(uint256 => GasPayment) public gasCost;
  mapping(uint256 => GasPayment) public guarantee;

  mapping(uint256 => address) public executor;

  // orderId -> txMsgHash -> amount of locked tokens
  mapping(uint256 => mapping(bytes32 => uint256)) public lockedTokens;
  mapping(bytes32 => bool) public txMsgHashes;
}
