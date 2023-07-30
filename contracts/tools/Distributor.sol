// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {PaymentMethods} from "./PaymentMethods.sol";

contract Distributor is PaymentMethods {
  using SafeERC20 for IERC20;

  mapping(address => mapping(address => uint256)) private _balances;

  event Distribute(address receiver, address token, uint256 amount);
  event Claim(address receiver, address token, uint256 amount);

  function claim(address token) external paymentMethod(token) {
    uint256 amount = _balances[msg.sender][token];
    _balances[msg.sender][token] = 0;

    IERC20(token).safeTransfer(msg.sender, amount);
    emit Claim(msg.sender, token, amount);
  }

  function _distribute(address receiver, address token, uint256 amount) internal {
    _balances[receiver][token] += amount;
    emit Distribute(receiver, token, amount);
  }

  function claimable(address user, address token) external view returns (uint256) {
    return _balances[user][token];
  }
}
