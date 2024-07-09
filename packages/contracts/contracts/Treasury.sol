// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import { PrepaidGas } from "./PrepaidGas.sol";
import { Order } from "./common/Order.sol";

import "./common/Errors.sol" as Error;

contract Treasury {
  using SafeERC20 for IERC20;

  PrepaidGas public immutable pgas;

  /// @notice Constructor to set the prepaidGas main contract address
  /// @param target The address of the main prepaidGas contract
  constructor(PrepaidGas target) {
    pgas = target;
  }

  /// @notice Creates a new order
  /// @param order The order data
  /// @return id The ID of the newly created order
  function orderCreate(Order calldata order) external returns (uint256 id) {
    id = pgas.orderCreate(order);

    _acceptIncoming(order.gasPrice.token, msg.sender, order.gasPrice.perUnit * order.gas);
  }

  /// @notice Withdraws an existing order
  /// @param id The ID of the order to be withdrawn
  function orderWithdraw(uint256 id) external {
    Order memory order = pgas.gasOrder(id);

    pgas.orderWithdraw(id);

    IERC20(order.gasPrice.token).safeTransfer(order.manager, order.gasPrice.perUnit * order.gas);
  }

  /// @notice Accepts an existing order
  /// @param id The ID of the order to be accepted
  function orderAccept(uint256 id) external {
    Order memory order = pgas.gasOrder(id);

    pgas.orderAccept(id, msg.sender);

    _acceptIncoming(order.gasGuarantee.token, msg.sender, order.gasGuarantee.perUnit * order.gas);
  }

  /// @notice Claims a specified amount of tokens
  /// @param token The address of the token to be claimed
  /// @param amount The amount of tokens to be claimed
  function claim(address token, uint256 amount) external {
    pgas.claim(msg.sender, token, amount);

    IERC20(token).safeTransfer(msg.sender, amount);
  }

  /// @notice Claims fees for multiple receivers
  /// @param receivers The addresses of the receivers
  /// @param tokens The addresses of the tokens to be claimed
  /// @param amounts The amounts of tokens to be claimed
  function claimFee(address[] calldata receivers, address[] calldata tokens, uint256[] calldata amounts) external {
    uint256 length = receivers.length;
    if (length > tokens.length) length = tokens.length;
    if (length > amounts.length) length = amounts.length;

    pgas.claimFee(receivers, tokens, amounts, msg.sender);

    for (uint256 i = 0; i < length; i++) {
      IERC20(receivers[i]).safeTransfer(tokens[i], amounts[i]);
    }
  }

  /// @notice Internal function to handle incoming token transfers
  /// @param token The address of the token
  /// @param from The address sending the tokens
  /// @param amount The amount of tokens to be transferred
  function _acceptIncoming(address token, address from, uint256 amount) internal {
    uint256 pre = IERC20(token).balanceOf(address(this));
    IERC20(token).safeTransferFrom(from, address(this), amount);
    uint256 incoming = IERC20(token).balanceOf(address(this)) - pre;

    if (incoming < amount) revert Error.BadIncomeTransfer(incoming, amount);
  }
}
