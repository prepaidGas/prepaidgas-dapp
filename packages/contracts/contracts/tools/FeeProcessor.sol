// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import {Distributor} from "./Distributor.sol";

import "./../common/Errors.sol" as Error;
import "./../common/Constants.sol" as Const;

enum Fee {
  Reward,
  Gas,
  Guarantee
}

contract FeeProcessor is Ownable2Step, Distributor {
  mapping(Fee => uint256) private _fee;

  event UpdateProtocolFee(Fee fee, uint256 old, uint256 current);

  function setFee(Fee id, uint256 value) public onlyOwner {
    if (value > Const.MAX_FEE) revert Error.OverhighValue(value, Const.MAX_FEE);

    uint256 old = _fee[id];
    _fee[id] = value;

    emit UpdateProtocolFee(id, old, value);
  }

  function takeAway(
    address[] calldata receivers,
    address[] calldata tokens,
    uint256[] calldata amounts
  ) external onlyOwner {
    uint256 length = receivers.length;
    if (length > tokens.length) length = tokens.length;
    if (length > amounts.length) length = amounts.length;

    for (uint256 i = 0; i < length; i++) {
      _claim(receivers[i], Const.TREASURY, tokens[i], amounts[i]);
    }
  }

  function fee(Fee id) external view returns (uint256) {
    return _fee[id];
  }

  function _takeFee(Fee id, address token, uint256 amount) internal returns (uint256) {
    uint256 taken = (amount * _fee[id]) / Const.DENOM;
    _distribute(Const.TREASURY, token, taken);

    return amount - taken;
  }
}
