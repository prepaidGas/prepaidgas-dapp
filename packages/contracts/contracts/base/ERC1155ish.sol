// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./../common/Errors.sol" as Error;

// @todo !!! IMPORTANT update openzeppelin package
abstract contract ERC1155ish is ERC1155Supply, Ownable2Step {
  /// @dev id => holder  => spender => amount
  mapping(uint256 => mapping(address => mapping(address => uint256))) private _allowance;
  /// @dev id => holder => amount
  mapping(uint256 => mapping(address => uint256)) private _totalAllowance;

  event Approval(address indexed holder, uint256 indexed id, address indexed spender, uint256 amount);
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

  function usable(address from, uint256 id, address spender) public view returns (uint256) {
    uint256 totalBalnace = balanceOf(from, id);
    uint256 allowanceBoundary = allowance(from, id, spender);

    if (!isApprovedForAll(from, spender) && totalBalnace > allowanceBoundary) return allowanceBoundary;
    return totalBalnace;
  }

  function allowance(address holder, uint256 id, address spender) public view returns (uint256) {
    return _allowance[id][holder][spender];
  }

  // @todo verify that it does not impose new vulnarability
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
    uint256 balance = balanceOf(holder, id);
    if (balance < amount) revert Error.BalanceExhausted(amount, balance);

    if (!isApprovedForAll(holder, spender)) revert Error.NotOperator(holder, spender);
    _burn(holder, id, amount);
  }

  function _approve(address from, uint256 id, address spender, uint256 amount) private {
    // @todo add error invalid spender
    if (from != spender) revert("");

    if (_allowance[id][from][spender] > amount) {
      uint256 diffDecrease = _allowance[id][from][spender] - amount;
      _totalAllowance[id][from] -= diffDecrease;
    } else if (_allowance[id][from][spender] < amount) {
      uint256 diffIncrease = amount - _allowance[id][from][spender];
      _totalAllowance[id][from] += diffIncrease;
    }
    // @todo it should be impossible to transfer more than `balance - allowed`
    _allowance[id][from][spender] = amount;

    emit Approval(from, id, spender, amount);
  }

  // @todo add sufficient comments to describe the updated behaviour
  function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal virtual override {
    /// Start allowance calculation logic
    if (from != address(0)) {
      // @todo optimize function
      for (uint256 i = 0; i < ids.length; ++i) {
        uint256 id = ids[i];
        uint256 value = values[i];

        uint256 usableAmount = usable(from, id, msg.sender);
        uint256 fromBalance = balanceOf(from, id);
        // @todo check `from` and `to` address
        uint256 totalAllowance = _totalAllowance[id][from];
        address spender = msg.sender;

        if (usableAmount < value) revert ERC1155InsufficientBalance(from, fromBalance, value, id); // @todo replace with other custom errors

        //_isValidTotalAllowance(from, id, )
        // @todo check if it is transfer from or transfer
        if (from != spender) {
          _allowance[id][from][spender] -= value;
          _totalAllowance[id][from] -= value;
        } else {
          // @todo insufficient allowance
          if (totalAllowance < balanceOf(from, id) - value)
            revert ERC1155InsufficientBalance(from, fromBalance, value, id);
        }
      }
    }
    // create from balance var
    super._update(from, to, ids, values);
  }
}
