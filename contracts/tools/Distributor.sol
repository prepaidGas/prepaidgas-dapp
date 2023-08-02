// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./../common/Errors.sol" as Error;

contract Distributor {
  using SafeERC20 for IERC20;

  mapping(address => mapping(address => uint256)) private _balances;

  event Distribute(address receiver, address token, uint256 amount);
  event Claim(address receiver, address token, uint256 amount);

  function claim(address token, uint256 amount) external {
    _claim(msg.sender, token, amount);
  }

  function _claim(address user, address token, uint256 amount) internal {
    if (_balances[user][token] < amount) revert Error.BalanceExhausted(amount, _balances[user][token]);
    _balances[user][token] -= amount;

    IERC20(token).safeTransfer(user, amount);
    emit Claim(user, token, amount);
  }

  function _distribute(address receiver, address token, uint256 amount) internal {
    _balances[receiver][token] += amount;
    emit Distribute(receiver, token, amount);
  }

  function claimable(address user, address token) external view returns (uint256) {
    return _balances[user][token];
  }
}
