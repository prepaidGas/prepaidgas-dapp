// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./../common/Errors.sol" as Error;

contract Distributor {
  using SafeERC20 for IERC20;

  /// @dev holder => token => amount
  mapping(address => mapping(address => uint256)) private _balance;

  event Distribute(address indexed receiver, address indexed token, uint256 amount);
  event Claim(address indexed holder, address indexed token, uint256 amount);

  function claim(address token, uint256 amount) external {
    _claim(msg.sender, msg.sender, token, amount);
  }

  function claimable(address holder, address token) public view returns (uint256) {
    return _balance[holder][token];
  }

  function _claim(address receiver, address holder, address token, uint256 amount) internal {
    if (amount == 0) return;

    uint256 available = claimable(holder, token);
    if (amount > available) revert Error.BalanceExhausted(amount, available);
    _balance[holder][token] -= amount;

    IERC20(token).safeTransfer(receiver, amount);
    emit Claim(holder, token, amount);
  }

  function _distribute(address holder, address token, uint256 amount) internal {
    if (amount == 0) return;

    _balance[holder][token] += amount;
    emit Distribute(holder, token, amount);
  }

  function _acceptIncoming(address token, address from, uint256 amount, uint256 expected) internal {
    uint256 pre = IERC20(token).balanceOf(address(this));
    IERC20(token).safeTransferFrom(from, address(this), amount);
    uint256 incoming = IERC20(token).balanceOf(address(this)) - pre;

    if (incoming < expected) revert Error.BadIncomeTransfer(incoming, expected);

    _distribute(from, token, incoming - expected);
  }
}
