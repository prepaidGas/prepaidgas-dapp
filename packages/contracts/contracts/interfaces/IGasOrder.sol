// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import {Message} from "../base/VerifierMessage.sol";

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
  event Execution(
    address indexed from,
    uint256 nonce,
    uint256 indexed gasOrder,
    address indexed onBehalf,
    bool status,
    bytes result,
    uint256 timestamp,
    address fulfiller,
    bool liquidation
  );
  event OrderCreate(uint256 indexed id, uint256 executionWindow);
  event OrderAccept(uint256 indexed id, address indexed executor);
  event OrderManagerChanged(uint256 indexed id, address indexed oldManager, address indexed newManager);
}
