// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IOrder.sol";

/**
 * @title PrepaidGas
 * @notice The target contract for deployement
 * @dev The only contract implements `external` functions, all API is defined here
 */
contract PrepaidGas {
  // orderNew
  function createOrder(
    uint256 maxGas, // gas
    uint256 executionPeriodStart, // start
    uint256 executionPeriodDeadline, // end
    uint256 executionWindow, // txWindow
    Payment calldata rewardValue, // acceptReward
    GasPayment calldata gasCostValue, // gasPrice
    GasPayment calldata guaranteeValue, // gasGuarantee
    uint256 rewardTransfer, // delete it
    uint256 gasCostTransfer // delete it
  ) external returns (uint256) {
    return
      _orderNew(
        maxGas,
        block.timestamp + 360,
        executionPeriodStart,
        executionPeriodDeadline,
        executionWindow,
        rewardValue,
        gasCostValue,
        guaranteeValue
      );
  }

  // orderTransfer
  function transferOrderManagement(uint256 id, address newManager) external {
    _orderTransfer(id, newManager);
  }

  // orderRevoke
  function revokeOrder(uint256 id) external {}

  // orderAccept
  function acceptOrder(uint256 id) external {}

  // orderClose
  function retrieveGuarantee(uint256 id) external {}

  // txExecute
  function execute(Message calldata message, bytes calldata signature) external {}

  // txLiquidate
  function liquidate(Message calldata message, bytes calldata signature) external {}

  // txCloseDead
  function liquidateWithoutExecution(Message calldata message) external {}

  // unwrap
  function retrieveGasCost(address holder, uint256 id, uint256 amount) external {}
}
