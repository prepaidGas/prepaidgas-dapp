// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20, Ownable {
  constructor(string memory mockName, string memory mockSymbol, uint256 supply) ERC20(mockName, mockSymbol) {
    _mint(msg.sender, supply);
  }

  function mint(address recipient, uint256 amount) external onlyOwner {
    _mint(recipient, amount);
  }

  function burn(address target, uint256 amount) external onlyOwner {
    _burn(target, amount);
  }
}
