// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "../common/Constants.sol" as Const;

contract MockToken is ERC20, Ownable {
  uint256 fee;

  constructor(string memory mockName, string memory mockSymbol, uint256 supply) ERC20(mockName, mockSymbol) {
    _mint(msg.sender, supply);
  }

  function mint(address recipient, uint256 amount) external onlyOwner {
    _mint(recipient, amount);
  }

  function burn(address target, uint256 amount) external onlyOwner {
    _burn(target, amount);
  }

  function setFee(uint256 value) external {
    fee = value;
  }

  function _afterTokenTransfer(address, address to, uint256 amount) internal override {
    if (to == address(0)) return;

    _burn(to, (amount * fee) / Const.DENOM);
  }
}
