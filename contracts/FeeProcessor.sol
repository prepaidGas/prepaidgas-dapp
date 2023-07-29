// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./Errors.sol" as Error;
import "./Constants.sol" as Const;

contract FeeProcessor is Ownable2Step {
  using SafeERC20 for IERC20;

  address private _treasury;
  uint256 private _fee;

  event UpdateTreasury(address old, address current);
  event UpdateProtocolFee(uint256 old, uint256 current);

  function setTreasury(address value) external onlyOwner {
    address old = _treasury;
    _treasury = value;

    emit UpdateTreasury(old, value);
  }

  function setFee(uint256 value) external onlyOwner {
    if (value > Const.MAX_FEE) revert Error.OverhighValue(value, Const.MAX_FEE);

    uint256 old = _fee;
    _fee = value;

    emit UpdateProtocolFee(old, value);
  }

  function fee() external view returns (uint256) {
    return _fee;
  }

  function treasury() external view returns (address) {
    return _treasury;
  }

  function _takeFee(address token, uint256 amount) internal returns (uint256) {
    if (_treasury == address(0)) return amount;

    uint256 taken = (amount * _fee) / Const.DENOM;
    IERC20(token).safeTransfer(_treasury, taken);

    return amount - taken;
  }
}
