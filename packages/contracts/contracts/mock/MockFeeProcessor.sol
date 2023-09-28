// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../tools/FeeProcessor.sol";

contract MockFeeProcessor is FeeProcessor {
  using SafeERC20 for IERC20;

  function takeFee(Fee id, address token, uint256 amount) external {
    _acceptIncoming(token, msg.sender, amount, amount);

    IERC20(token).safeTransfer(msg.sender, _takeFee(id, token, amount));
  }
}
