// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "../common/Constants.sol" as Const;
import "../common/Errors.sol" as Error;

enum Fee {
  LiquidateGuarantee,
  RedeemGuarantee,
  UnspentPrice
}

abstract contract FeeProcessor is Ownable2Step {
  mapping(Fee => uint256) public fee;

  event UpdateProtocolFee(Fee indexed fee, uint256 old, uint256 current);

  function setFee(Fee id, uint256 value) public onlyOwner {
    if (value > Const.MAX_FEE) revert Error.ExceedMax(value, Const.MAX_FEE);

    uint256 old = fee[id];
    fee[id] = value;

    emit UpdateProtocolFee(id, old, value);
  }

  function claimFee(
    address[] calldata /* receivers */,
    address[] calldata /* tokens */,
    uint256[] calldata /* amounts */,
    address requestor
  ) public virtual {
    if (owner() != requestor) revert OwnableUnauthorizedAccount(requestor);
  }

  function _takeFee(Fee id, address /* token */, uint256 amount) internal virtual returns (uint256) {
    uint256 taken = (amount * fee[id]) / Const.DENOM;

    return amount - taken;
  }
}
