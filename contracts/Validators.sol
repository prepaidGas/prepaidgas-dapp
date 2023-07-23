// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "./Errors.sol" as Error;
import "./Constants.sol" as Const;

contract Validators is Ownable2Step {
  uint256 private _validatorThreshold;

  mapping(address => bool) private _isValidator;

  event ValidatorThresholdUpdate(uint256 old, uint256 current);
  event SetValidatorStatus(address validator, bool old, bool current);

  constructor() Ownable2Step() {}

  function setValidatorThreshold(uint256 value) external onlyOwner {
    if (value < Const.MINIMAL_THRESHOLD) revert Error.UnderThreshold(Const.MINIMAL_THRESHOLD, value);
    uint256 old = _validatorThreshold;
    _validatorThreshold = value;

    emit ValidatorThresholdUpdate(old, value);
  }

  function setValidatorStatus(address validator, bool status) external onlyOwner {
    bool old = _isValidator[validator];
    _isValidator[validator] = status;

    emit SetValidatorStatus(validator, old, status);
  }

  function validatorThreshold() public view returns (uint256) {
    return _validatorThreshold;
  }

  function isValidator(address validator) public view returns (bool) {
    return _isValidator[validator];
  }
}
