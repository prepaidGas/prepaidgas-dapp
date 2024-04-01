// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import { Executor } from "./base/Executor.sol";
import { GasOrder } from "./base/GasOrder.sol";
import { Distributor } from "./tools/Distributor.sol";
import { Message } from "./common/Message.sol";
import { Order } from "./common/Order.sol";

contract PrepaidGas is Executor, GasOrder, Distributor {
  address public immutable treasury;

  modifier onlyTreasury() {
    if (msg.sender != treasury) revert();
    _;
  }

  constructor(
    address relayer,
    address admin,
    string memory name,
    string memory version
  ) Executor(admin, name, version) {
    treasury = relayer;
  }

  function orderCreate(Order calldata order) public override onlyTreasury returns (uint256 id) {
    id = super.orderCreate(order);
  }

  function orderWithdraw(uint256 id) public override onlyTreasury {
    super.orderWithdraw(id);
  }

  function orderAccept(uint256 id, address promisor) public override onlyTreasury {
    super.orderAccept(id, promisor);
  }

  function orderClose(uint256 id) public override {
    super.orderClose(id);

    address promisor = executor[id];
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    _distribute(promisor, order.gasGuarantee.token, order.gasGuarantee.gasPrice * left);
    _distribute(promisor, order.gasPrice.token, order.gasPrice.gasPrice * left);
  }

  function claim(address holder, address token, uint256 amount) external onlyTreasury {
    _claim(holder, token, amount);
  }

  function _reportExecution(
    Message calldata message,
    address fulfiller,
    uint256 gasSpent
  ) internal override(Executor, GasOrder) {
    uint256 id = message.order;
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    if (gasSpent > left) gasSpent = left;

    super._reportExecution(message, fulfiller, gasSpent);

    if (fulfiller == address(0)) fulfiller = executor[id];

    _distribute(fulfiller, order.gasPrice.token, order.gasPrice.gasPrice * gasSpent);

    uint256 amount = order.gasGuarantee.gasPrice * gasSpent;
    if (fulfiller == executor[id]) {
      _distribute(fulfiller, order.gasGuarantee.token, amount);
    } else {
      _distribute(fulfiller, order.gasGuarantee.token, amount);
    }
  }
}
