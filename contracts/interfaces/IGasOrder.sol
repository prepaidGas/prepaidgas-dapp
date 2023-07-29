// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

struct Order {
  address creator;
  address spender;
  uint256 maxGas;
  uint256 maxCalls;
  uint256 deadline;
}

struct OrderConsumption {
  uint256 gasSpent;
  uint256 gasTakenBack;
  uint256 calls;
}

enum OrderStatus {
  Pending,
  Active,
  Exhausted,
  Fulfilled
}

struct GasPayment {
  address token;
  uint256 gasPrice;
}

interface IGasOrder {
  function reportExecution(uint256 id, address fulfiller, uint256 gasSpent) external;
}
