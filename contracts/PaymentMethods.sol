// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "./Errors.sol" as Error;

contract PaymentMethods is Ownable2Step {
  mapping(address => bool) private _isPaymentMethod;

  event SetPaymentMethodStatus(address token, bool old, bool current);

  modifier onlyPaymentMethod(address token) {
    if (!_isPaymentMethod[token]) revert Error.NotPaymentMethod(token);
    _;
  }

  constructor() Ownable2Step() {}

  function setPaymentMethodStatus(address token, bool status) external onlyOwner {
    bool old = _isPaymentMethod[token];
    _isPaymentMethod[token] = status;

    emit SetPaymentMethodStatus(token, old, status);
  }

  function isPaymentMethod(address token) public view returns (bool) {
    return _isPaymentMethod[token];
  }
}
