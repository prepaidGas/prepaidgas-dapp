// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

struct Order {
  address manager;
  uint256 maxGas;
  uint256 executionPeriodStart;
  uint256 executionPeriodDeadline;
  uint256 executionWindow;
}

enum OrderStatus {
  None,
  Pending,
  Accepted,
  Active,
  /// @notice the order might be inactive due to exhausted gas limit or execution time
  Inactive,
  Untaken,
  Closed
}

struct GasPayment {
  address token;
  uint256 gasPrice;
}

struct Payment {
  address token;
  uint256 amount;
}

interface IGasOrder {
  function reportExecution(
    uint256 id,
    address from,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external;

  function ordersCount() internal returns (uint256);
//  mapping(uint256 => Order) public order;
//
//  mapping(uint256 => Payment) public reward;
//  mapping(uint256 => GasPayment) public gasCost;
//  mapping(uint256 => GasPayment) public guarantee;
//
//  mapping(uint256 => address) public executor;
//
//  // orderId -> txMsgHash -> amount of locked tokens
//  // @todo utilize this variable
//  mapping(bytes32 => uint256) public transactionLockedTokens;
//  mapping(bytes32 => bool) public txMsgHashes;

  event OrderCreate(uint256 indexed id, uint256 executionWindow);
  event OrderAccept(uint256 indexed id, address indexed executor);
  event OrderManagerChanged(uint256 indexed id, address indexed oldManager, address indexed newManager);
}
