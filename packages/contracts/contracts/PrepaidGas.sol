// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import { Executor } from "./base/Executor.sol";
import { GasOrder } from "./base/GasOrder.sol";

import { Distributor } from "./tools/Distributor.sol";
import { Fee, FeeProcessor } from "./tools/FeeProcessor.sol";

import { Message, MessageHash } from "./common/Message.sol";
import { Order } from "./common/Order.sol";

import "./common/Constants.sol" as Const;

contract PrepaidGas is Executor, GasOrder, Distributor, FeeProcessor {
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
  ) Ownable(admin) MessageHash(name, version) {
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

  function claimFee(
    address[] calldata receivers,
    address[] calldata tokens,
    uint256[] calldata amounts,
    address requestor
  ) public override onlyTreasury {
    super.claimFee(receivers, tokens, amounts, requestor);

    uint256 length = receivers.length;
    if (length > tokens.length) length = tokens.length;
    if (length > amounts.length) length = amounts.length;

    for (uint256 i = 0; i < length; i++) {
      _claim(Const.TREASURY, tokens[i], amounts[i]);
    }
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

  function _takeFee(Fee id, address token, uint256 amount) internal override returns (uint256) {
    uint256 left = super._takeFee(id, token, amount);

    _distribute(Const.TREASURY, token, amount - left);

    return left;
  }
}
