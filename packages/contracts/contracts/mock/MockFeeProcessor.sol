// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../tools/FeeProcessor.sol";

contract MockFeeProcessor is FeeProcessor {
  using SafeERC20 for IERC20;

  constructor() Ownable(msg.sender) {}

  function takeFee(Fee id, address token, uint256 amount) external {
    _acceptIncoming(token, msg.sender, amount, amount);

    IERC20(token).safeTransfer(msg.sender, _takeFee(id, token, amount));
  }
}
