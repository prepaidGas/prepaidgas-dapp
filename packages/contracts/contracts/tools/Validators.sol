// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "./../common/Errors.sol" as Error;
import "./../common/Constants.sol" as Const;

/// @dev Should be replaced with stake-to-validate implementation in future
contract Validators is Ownable2Step {
  uint256 private _validatorThreshold;

  // @todo make validators iteratable
  mapping(address => bool) private _isValidator;
  mapping(address => string) private _validatorURI;

  event UpdateValidatorThreshold(uint256 old, uint256 current);
  event UpdateValidatorStatus(address indexed validator, bool old, bool current);
  event UpdateValidatorURI(address indexed validator, string old, string current);

  modifier enoughValidations(uint256 validations) {
    if (_validatorThreshold > validations) revert Error.FewValidations(validations, _validatorThreshold);
    _;
  }

  function setValidatorThreshold(uint256 value) external onlyOwner {
    if (value < Const.MIN_VALIDATIONS) revert Error.OverlowValue(value, Const.MIN_VALIDATIONS);

    uint256 old = _validatorThreshold;
    _validatorThreshold = value;

    emit UpdateValidatorThreshold(old, value);
  }

  function setValidatorStatus(address validator, bool status) external onlyOwner {
    bool old = _isValidator[validator];
    _isValidator[validator] = status;

    emit UpdateValidatorStatus(validator, old, status);
  }

  function setValidatorLink(string calldata link) external {
    address validator = msg.sender;

    string memory old = _validatorURI[validator];
    _validatorURI[validator] = link;

    emit UpdateValidatorURI(validator, old, link);
  }

  function validatorThreshold() public view returns (uint256) {
    return _validatorThreshold;
  }

  function isValidator(address validator) public view returns (bool) {
    return _isValidator[validator];
  }

  function validatorURI(address validator) public view returns (string memory) {
    return _validatorURI[validator];
  }
}
