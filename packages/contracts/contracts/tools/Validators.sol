// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "./../common/Errors.sol" as Error;
import "./../common/Constants.sol" as Const;

contract Validators is Ownable2Step {
  uint256 private _validatorThreshold;

  uint256 public validatorSetLength;
  mapping(address => uint256) private _validatorSetIndex;
  mapping(uint256 => address) private _validatorSetValue;

  mapping(address => string) private _validatorURI;

  event UpdateValidatorThreshold(uint256 old, uint256 current);
  event UpdateValidatorStatus(address indexed validator, bool old, bool current);
  event UpdateValidatorURI(address indexed validator, string old, string current);

  modifier enoughValidations(uint256 validations) {
    if (_validatorThreshold > validations) revert Error.FewValidations(validations, _validatorThreshold);
    _;
  }

  constructor(uint256 minValidations, address[] memory initialValidators) {
    setValidatorThreshold(minValidations);

    for (uint256 i = 0; i < initialValidators.length; i++) {
      setValidatorStatus(initialValidators[i], true);
    }
  }

  function setValidatorThreshold(uint256 value) public onlyOwner {
    if (value < Const.MIN_VALIDATIONS) revert Error.OverlowValue(value, Const.MIN_VALIDATIONS);

    uint256 old = _validatorThreshold;
    _validatorThreshold = value;

    emit UpdateValidatorThreshold(old, value);
  }

  function setValidatorStatus(address validator, bool status) public onlyOwner {
    /// @dev 0x0 validator is possible but has no effect due to `_checkValidations` design
    bool old = _validatorSetIndex[validator] > 0;
    if (old && !status) {
      _validatorSetIndex[_validatorSetValue[validatorSetLength]] = _validatorSetIndex[validator];
      _validatorSetValue[_validatorSetIndex[validator]] = _validatorSetValue[validatorSetLength];
      _validatorSetValue[validatorSetLength--] = address(0);
      _validatorSetIndex[validator] = 0;
    } else if (!old && status) {
      _validatorSetIndex[validator] = ++validatorSetLength;
      _validatorSetValue[validatorSetLength] = validator;
    }

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
    return _validatorSetIndex[validator] > 0;
  }

  function validators(uint256 offset, uint256 limit) external view returns (address[] memory) {
    address[] memory values = new address[](limit);

    for (uint256 i = 0; i < limit; i++) {
      values[i] = _validatorSetValue[offset + i + 1];
    }

    return values;
  }

  function validatorURI(address validator) external view returns (string memory) {
    return _validatorURI[validator];
  }
}
