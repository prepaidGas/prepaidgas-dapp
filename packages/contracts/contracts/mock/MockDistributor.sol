// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import "../tools/Distributor.sol";

contract MockDistributor is Distributor {
  function distribute(address holder, address token, uint256 amount) external {
    _distribute(holder, token, amount);
  }

  function acceptIncoming(address token, address from, uint256 amount, uint256 expected) external {
    _acceptIncoming(token, from, amount, expected);
  }
}
