// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

import { Executor } from "./base/Executor.sol";
import { GasOrder } from "./base/GasOrder.sol";

import { Distributor } from "./tools/Distributor.sol";
import { Fee, FeeProcessor } from "./tools/FeeProcessor.sol";

import { Message, Resolution } from "./common/Message.sol";
import { Order } from "./common/Order.sol";

import { GasOrderGetters } from "./extensions/GasOrderGetters.sol";
import { MessageValidations } from "./extensions/MessageValidations.sol";

import "./common/Constants.sol" as Const;
import "./common/Errors.sol" as Error;

contract PrepaidGas is Executor, GasOrder, Distributor, FeeProcessor, GasOrderGetters, MessageValidations {
  address public immutable treasury;

  modifier onlyTreasury() {
    if (msg.sender != treasury) revert Error.Unauthorized(msg.sender, treasury);
    _;
  }

  constructor(
    address relayer,
    address admin,
    string memory name,
    string memory version
  ) Ownable(admin) EIP712(name, version) {
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

    uint256 amount = order.gasGuarantee.perUnit * left;
    _distribute(promisor, order.gasGuarantee.token, amount);
    _distribute(promisor, order.gasPrice.token, _takeFee(Fee.UnspentPrice, order.gasPrice.token, amount));
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
    uint256 gasSpent,
    Resolution resolution
  ) internal override(Executor, GasOrder, MessageValidations) {
    uint256 id = message.order;
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    if (gasSpent > left) gasSpent = left;

    if (resolution == Resolution.Execute) fulfiller = executor[id];
    if (resolution == Resolution.Redeem) fulfiller = message.from;

    super._reportExecution(message, fulfiller, gasSpent, resolution);

    _distribute(fulfiller, order.gasPrice.token, order.gasPrice.perUnit * gasSpent);

    uint256 amount = order.gasGuarantee.perUnit * gasSpent;
    if (fulfiller == executor[id]) {
      _distribute(fulfiller, order.gasGuarantee.token, amount);
    } else if (resolution == Resolution.Liquidate) {
      _distribute(
        fulfiller,
        order.gasGuarantee.token,
        _takeFee(Fee.LiquidateGuarantee, order.gasGuarantee.token, amount)
      );
    } else if (resolution == Resolution.Redeem) {
      _distribute(fulfiller, order.gasGuarantee.token, _takeFee(Fee.RedeemGuarantee, order.gasGuarantee.token, amount));
    }
  }

  function _takeFee(Fee id, address token, uint256 amount) internal override returns (uint256) {
    uint256 left = super._takeFee(id, token, amount);

    _distribute(Const.TREASURY, token, amount - left);

    return left;
  }
}
