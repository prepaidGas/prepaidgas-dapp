// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

contract Distributor {
  mapping(address holder => mapping(address token => uint256 balance)) public claimable;

  event Distribute(address indexed receiver, address indexed token, uint256 amount);
  event Claim(address indexed holder, address indexed token, uint256 amount);

  function _claim(address holder, address token, uint256 amount) internal {
    if (amount == 0) return;

    uint256 available = claimable[holder][token];
    if (amount > available) revert();
    claimable[holder][token] -= amount;

    emit Claim(holder, token, amount);
  }

  function _distribute(address holder, address token, uint256 amount) internal {
    if (amount == 0) return;

    claimable[holder][token] += amount;
    emit Distribute(holder, token, amount);
  }
}
