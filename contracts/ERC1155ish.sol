// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "./Errors.sol" as Error;

contract ERC1155ish {
  event Transfer(address indexed from, address indexed to, uint256 id, uint256 amount);
  event Approval(address indexed from, address indexed to, uint256 id, uint256 amount);

  mapping(address => mapping(uint256 => uint256)) private _balanceOf;
  mapping(address => mapping(uint256 => mapping(address => uint256))) private _allowance;
  mapping(uint256 => uint256) private _totalSupply;

  function transfer(address to, uint256 id, uint256 amount) external {
    _balanceOf[msg.sender][id] -= amount;
    unchecked {
      _balanceOf[to][id] += amount;
    }

    emit Transfer(msg.sender, to, id, amount);
  }

  function approve(address to, uint256 id, uint256 amount) external {
    _allowance[msg.sender][id][to] = amount;

    emit Approval(msg.sender, to, id, amount);
  }

  function _mint(address to, uint256 id, uint256 amount) internal {
    _totalSupply[id] += amount;
    unchecked {
      _balanceOf[to][id] += amount;
    }

    emit Transfer(address(0), to, id, amount);
  }

  function _utilize(address from, address by, uint256 id, uint256 amount) internal {
    if (by != from && _allowance[from][id][by] < amount)
      revert Error.MissingAllowance(amount, _allowance[from][id][by]);

    _balanceOf[from][id] -= amount;
    unchecked {
      _totalSupply[id] -= amount;
    }

    emit Transfer(from, address(0), id, amount);
  }

  function balanceOf(address user, uint256 id) public view returns (uint256) {
    return _balanceOf[user][id];
  }

  function totalSupply(uint256 id) public view returns (uint256) {
    return _totalSupply[id];
  }

  function allowance(address from, uint256 id, address to) external view returns (uint256) {
    return _allowance[from][id][to];
  }

  function usable(address from, uint256 id, address by) public view returns (uint256) {
    uint256 possible = _balanceOf[from][id];
    uint256 boundary = _allowance[from][id][by];

    if (from == by) return possible;
    if (possible > boundary) return boundary;
    return possible;
  }
}
