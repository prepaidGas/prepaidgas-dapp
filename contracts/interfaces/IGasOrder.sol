// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

struct Order {
  uint256 deadline;
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
