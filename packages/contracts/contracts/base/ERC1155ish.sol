// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./../common/Errors.sol" as Error;

abstract contract ERC1155ish is ERC1155Supply, Ownable2Step {

  event URI(string value);

  constructor(string memory link) Ownable(msg.sender) ERC1155(link) {}

  function setURI(string memory link) external onlyOwner {
    _setURI(link);
    emit URI(link);
  }

  function _mint(address holder, uint256 id, uint256 amount) internal {
    _mint(holder, id, amount, "Mint GasOrder Tokens");
  }

  function _utilizeAllowance(uint256 id, address spender, uint256 amount) internal {
    uint256 balance = balanceOf(spender, id);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);
    _burn(spender, id, amount);
  }

  function _update(address holder, address receiver, uint256[] memory ids, uint256[] memory values) internal override {
    require(receiver == address(0) || holder == address(0));
    super._update(holder, receiver, ids, values);
  }
}
