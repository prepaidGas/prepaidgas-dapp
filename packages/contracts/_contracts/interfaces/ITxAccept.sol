// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {Message} from "../base/VerifierMessage.sol";

interface ITxAccept {
  function isExecutable(Message memory message) external view returns (bool);

  function isLiquidatable(Message memory message) external view returns (bool);
}
