// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import { PrepaidGas } from "./PrepaidGas.sol";
import { Order } from "./common/Order.sol";

contract Treasury {
  using SafeERC20 for IERC20;

  PrepaidGas public immutable pgas;

  constructor(PrepaidGas target) {
    pgas = target;
  }

  function orderCreate(Order calldata order) external returns (uint256 id) {
    id = pgas.orderCreate(order);

    _acceptIncoming(order.acceptReward.token, msg.sender, order.acceptReward.amount);
    _acceptIncoming(order.gasPrice.token, msg.sender, order.gasPrice.gasPrice * order.gas);
  }

  function orderWithdraw(uint256 id) external {
    Order memory order = pgas.gasOrder(id);

    pgas.orderWithdraw(id);

    IERC20(order.acceptReward.token).safeTransfer(order.manager, order.acceptReward.amount);
    IERC20(order.gasPrice.token).safeTransfer(order.manager, order.gasPrice.gasPrice * order.gas);
  }

  function orderAccept(uint256 id) external {
    Order memory order = pgas.gasOrder(id);

    pgas.orderAccept(id, msg.sender);

    _acceptIncoming(order.gasGuarantee.token, msg.sender, order.gasGuarantee.gasPrice * order.gas);
  }

  function claim(address token, uint256 amount) external {
    pgas.claim(msg.sender, token, amount);

    IERC20(token).safeTransfer(msg.sender, amount);
  }

  function claimFee(address[] calldata receivers, address[] calldata tokens, uint256[] calldata amounts) external {
    uint256 length = receivers.length;
    if (length > tokens.length) length = tokens.length;
    if (length > amounts.length) length = amounts.length;

    pgas.claimFee(receivers, tokens, amounts, msg.sender);

    for (uint256 i = 0; i < length; i++) {
      IERC20(receivers[i]).safeTransfer(tokens[i], amounts[i]);
    }
  }

  function _acceptIncoming(address token, address from, uint256 amount) internal {
    uint256 pre = IERC20(token).balanceOf(address(this));
    IERC20(token).safeTransferFrom(from, address(this), amount);
    uint256 incoming = IERC20(token).balanceOf(address(this)) - pre;

    if (incoming < amount) revert();
  }
}
