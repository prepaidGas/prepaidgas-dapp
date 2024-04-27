// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import { GasOrder } from "../base/GasOrder.sol";
import { Executor } from "../base/Executor.sol";
import { Order } from "../common/Order.sol";
import { Message, Resolution } from "../common/Message.sol";

enum Validation {
  None,
  StartInFuture,
  NonceExhaustion,
  BalanceCompliance,
  OwnerCompliance,
  TimelineCompliance
}

abstract contract MessageValidations is Executor, GasOrder {
  function messageValidate(Message calldata message) external view returns (Validation) {
    uint256 id = message.order;
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    if (message.start <= block.timestamp) return Validation.StartInFuture;

    if (nonce[message.from][message.nonce]) return Validation.NonceExhaustion;

    if (message.gas > left) return Validation.BalanceCompliance;
    if (order.manager != message.from) return Validation.OwnerCompliance;

    if (message.start + 2 * order.txWindow > order.end) return Validation.TimelineCompliance;
    if (message.start < order.start) return Validation.TimelineCompliance;

    return Validation.None;
  }

  function _reportExecution(
    Message calldata message,
    address fulfiller,
    uint256 gasSpent,
    Resolution resolution
  ) internal virtual override(Executor, GasOrder) {
    super._reportExecution(message, fulfiller, gasSpent, resolution);
  }
}
