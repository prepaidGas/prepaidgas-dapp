// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

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
    require(by == from || _allowance[from][id][by] >= amount);

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

  function allowance(address from, uint256 id, address to) public view returns (uint256) {
    return _allowance[from][id][to];
  }
}
