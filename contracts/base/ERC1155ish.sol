// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./../common/Errors.sol" as Error;

contract ERC1155ish is ERC1155Supply, Ownable2Step {
  mapping(address => mapping(uint256 => mapping(address => uint256))) private _allowance;

  event Approval(address indexed holder, uint256 id, address indexed spender, uint256 amount);
  event URI(string value);

  constructor(string memory link) ERC1155(link) {}

  function setURI(string memory link) external onlyOwner {
    _setURI(link);
    emit URI(link);
  }

  function increaseAllowance(uint256 id, address spender, uint256 addedValue) external {
    address holder = _msgSender();
    _approve(holder, id, spender, allowance(holder, id, spender) + addedValue);
  }

  function decreaseAllowance(uint256 id, address spender, uint256 subtractedValue) external {
    address holder = _msgSender();
    _approve(holder, id, spender, allowance(holder, id, spender) - subtractedValue);
  }

  function approve(uint256 id, address spender, uint256 amount) external {
    address holder = _msgSender();
    _approve(holder, id, spender, amount);
  }

  function allowance(address holder, uint256 id, address spender) public view returns (uint256) {
    return _allowance[holder][id][spender];
  }

  function usable(address holder, uint256 id, address spender) public view returns (uint256) {
    uint256 possible = balanceOf(holder, id);
    uint256 boundary = allowance(holder, id, spender);

    if (holder != spender && !isApprovedForAll(holder, spender) && possible > boundary) return boundary;
    return possible;
  }

  function _utilizeAllowance(address holder, uint256 id, address spender, uint256 amount) internal {
    uint256 balance = usable(holder, id, spender);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);

    if (holder != spender && !isApprovedForAll(holder, spender))
      _approve(holder, id, spender, allowance(holder, id, spender) - amount);
    _burn(holder, id, amount);
  }

  function _utilizeOperator(address holder, uint256 id, address spender, uint256 amount) internal {
    uint256 balance = balanceOf(holder, id);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);

    if (holder != spender && !isApprovedForAll(holder, spender)) revert Error.NotOperator(holder, spender);
    _burn(holder, id, amount);
  }

  function _approve(address holder, uint256 id, address spender, uint256 amount) private {
    _allowance[holder][id][spender] = amount;
    emit Approval(holder, id, spender, amount);
  }

  function _mint(address holder, uint256 id, uint256 amount) internal {
    _mint(holder, id, amount, "Mint GasOrder Tokens");
  }
}
