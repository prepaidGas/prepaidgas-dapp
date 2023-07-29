// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "./Errors.sol" as Error;
import "./Constants.sol" as Const;

contract FeeProcessor is Ownable2Step {
  address public treasury;
  uint256 public fee;

  event TreasuryUpdate(address old, address current);
  event ProtocolFeeUpdate(uint256 old, uint256 current);

  function setTreasury(address value) public onlyOwner {
    address old = treasury;
    treasury = value;

    emit TreasuryUpdate(old, value);
  }

  function setFee(uint256 value) public onlyOwner {
    if (value > Const.MAX_FEE) revert Error.OverhighFee(value, Const.MAX_FEE);

    uint256 old = fee;
    fee = value;

    emit ProtocolFeeUpdate(old, value);
  }
}
