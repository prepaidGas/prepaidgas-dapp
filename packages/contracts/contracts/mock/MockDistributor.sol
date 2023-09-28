// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "../tools/Distributor.sol";

contract MockDistributor is Distributor {
  function distribute(address holder, address token, uint256 amount) external {
    _distribute(holder, token, amount);
  }

  function acceptIncoming(address token, address from, uint256 amount, uint256 expected) external {
    _acceptIncoming(token, from, amount, expected);
  }
}
