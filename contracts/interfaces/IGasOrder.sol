// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

struct Order {
  address creator;
  uint256 maxGas;
  uint256 deadline;
  uint256 acceptDeadline;
  uint256 executionWindow;
}

enum OrderStatus {
  Pending,
  Active,
  Untaken,
  Exhausted,
  Closed
} // @todo add none

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
    address signer,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external;
}
