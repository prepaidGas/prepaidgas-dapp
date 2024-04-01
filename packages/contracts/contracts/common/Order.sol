// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

struct GasPayment {
  address token;
  uint256 gasPrice;
}

struct Payment {
  address token;
  uint256 amount;
}

struct Order {
  address manager;
  uint256 gas;
  uint256 expire;
  uint256 start;
  uint256 end;
  uint256 txWindow;
  uint256 redeemWindow;
  Payment acceptReward;
  GasPayment gasPrice;
  GasPayment gasGuarantee;
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
