// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

contract MockEndpoint {
  uint256 number;

  function store(uint256 num) public {
    number = num;
  }

  function retrieve() public view returns (uint256) {
    return number;
  }
}
