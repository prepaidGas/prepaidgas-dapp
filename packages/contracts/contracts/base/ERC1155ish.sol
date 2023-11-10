// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./../common/Errors.sol" as Error;

abstract contract ERC1155ish is ERC1155Supply, Ownable2Step {
  /// @dev id => holder => spender => amount
  mapping(uint256 => mapping(address => mapping(address => uint256))) private _allowance;
  /// @dev id => holder => amount
  mapping(uint256 => mapping(address => uint256)) private _totalLock;

  event Approval(address indexed holder, uint256 indexed id, address indexed spender, uint256 amount);
  event UpdateLock(address indexed holder, uint256 indexed id, uint256 amount);
  event URI(string value);

  constructor(string memory link) Ownable(msg.sender) ERC1155(link) {}

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

    uint256 allowed = allowance(holder, id, spender);
    if (allowed < subtractedValue) subtractedValue = allowed;
    _approve(holder, id, spender, allowed - subtractedValue);
  }

  function approve(uint256 id, address spender, uint256 amount) external {
    address holder = _msgSender();
    _approve(holder, id, spender, amount);
  }

  function usable(address holder, uint256 id, address spender) public view returns (uint256) {
    uint256 balance = balanceAvailable(holder, id);
    uint256 boundary = allowance(holder, id, spender);

    if (!isApprovedForAll(holder, spender) && balance > boundary) return boundary;
    return balance;
  }

  function allowance(address holder, uint256 id, address spender) public view returns (uint256) {
    return _allowance[id][holder][spender];
  }

  function isApprovedForAll(address holder, address spender) public view override returns (bool) {
    return holder == spender || super.isApprovedForAll(holder, spender);
  }

  function _mint(address holder, uint256 id, uint256 amount) internal {
    _mint(holder, id, amount, "Mint GasOrder Tokens");
  }

  function _utilizeAllowance(address holder, uint256 id, address spender, uint256 amount) internal {
    uint256 balance = usable(holder, id, spender);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);

    if (!isApprovedForAll(holder, spender)) _approve(holder, id, spender, allowance(holder, id, spender) - amount);
    _burn(holder, id, amount);
  }

  function _utilizeOperator(address holder, uint256 id, address spender, uint256 amount) internal {
    uint256 balance = balanceAvailable(holder, id);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);

    if (!isApprovedForAll(holder, spender)) revert Error.NotOperator(holder, spender);
    _burn(holder, id, amount);
  }

  function _approve(address holder, uint256 id, address spender, uint256 amount) private {
    _allowance[id][holder][spender] = amount;

    emit Approval(holder, id, spender, amount);
  }

  function totalLock(address holder, uint256 id) public view returns (uint256) {
    return _totalLock[id][holder];
  }

  function _increaseLock(address holder, uint256 id, uint256 value) internal {
    uint256 balance = balanceAvailable(holder, id);
    if (balance < value) revert Error.BalanceExhausted(value, balance);

    _setLock(holder, id, totalLock(holder, id) + value);
  }

  function _decreaseLock(address holder, uint256 id, uint256 value) internal {
    uint256 balance = totalLock(holder, id);
    if (balance < value) revert Error.BalanceExhausted(value, balance);

    _setLock(holder, id, totalLock(holder, id) - value);
  }

  function _setLock(address holder, uint256 id, uint256 value) private {
    _totalLock[id][holder] = value;

    emit UpdateLock(holder, id, value);
  }

  function balanceAvailable(address holder, uint256 id) public view returns (uint256) {
    return balanceOf(holder, id) - totalLock(holder, id);
  }

  function _update(address holder, address receiver, uint256[] memory ids, uint256[] memory values) internal override {
    super._update(holder, receiver, ids, values);

    /// @dev ids may contain duplications => pre-validation requires a lot of memory => post-validation is used
    for (uint256 i = 0; i < ids.length; i++) {
      uint256 id = ids[i];
      uint256 balance = balanceOf(holder, id);
      uint256 lock = totalLock(holder, id);

      if (balance < lock) revert Error.BalanceExhausted(lock, balance);
    }
  }
}
