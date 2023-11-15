// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import {Message} from "../base/Message.sol";

interface ITxAccept {
  function isExecutable(Message memory message) external view returns (bool);

  function isLiquidatable(Message memory message) external view returns (bool);
}
