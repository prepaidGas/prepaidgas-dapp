// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

struct Order {
  address manager;
  uint256 gas;
  uint256 expire;
  uint256 start;
  uint256 end;
  uint256 txWindow;
}

enum OrderStatus {
  None,
  Pending,
  Accepted,
  Active,
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
