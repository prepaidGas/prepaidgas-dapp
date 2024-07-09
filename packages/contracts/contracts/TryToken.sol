// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TryToken is ERC20 {
  constructor(string memory tryName, string memory trySymbol) ERC20(tryName, trySymbol) {}

  /// @dev DoS due to supply overflow is conditionally possible but not really reachable
  function mint() external {
    _mint(msg.sender, 945 * 10 ** decimals());
  }
}
