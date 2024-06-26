// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "../common/Constants.sol" as Const;
import "../common/Errors.sol" as Error;

abstract contract Validators is Ownable2Step {
  uint256 public validatorThreshold = Const.MIN_VALIDATIONS;

  mapping(address => bool) public isValidator;

  event UpdateValidatorThreshold(uint256 old, uint256 current);
  event UpdateValidatorStatus(address indexed validator, bool old, bool current);

  function setValidatorThreshold(uint256 value) external onlyOwner {
    if (value < Const.MIN_VALIDATIONS) revert Error.BelowMin(value, Const.MIN_VALIDATIONS);

    uint256 old = validatorThreshold;
    validatorThreshold = value;

    emit UpdateValidatorThreshold(old, value);
  }

  function setValidatorStatus(address validator, bool status) external onlyOwner {
    bool old = isValidator[validator];
    isValidator[validator] = status;

    emit UpdateValidatorStatus(validator, old, status);
  }
}
