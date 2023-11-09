// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./Executor.sol";

import "./base/GasOrderGetters.sol";
import {Message} from "./base/ExecutionMessage.sol";
import {OrderStatus} from "./interfaces/IGasOrder.sol";

abstract contract TxAccept is GasOrderGetters {
  using ECDSA for bytes32;

  mapping(address => mapping(uint256 => bool)) public nonce;
  mapping(address => mapping(uint256 => uint256)) public lock;

  function addTransaction(
    bytes calldata signature,
    Message calldata message
  ) public specificStatus(message.gasOrder, OrderStatus.Active) {
    bytes32 hash = Executor(execution()).messageHash(message);

    address recovered = hash.recover(signature);
    if (recovered != message.from) revert UnknownRecovered(recovered);

    // @todo update error to `InvalidSignature`
    if (nonce[message.from][message.nonce]) revert InvalidTransaction(hash);
    nonce[message.from][message.nonce] = true;

    lock[message.from][message.nonce] = message.gas;

    uint256 balance = usable(message.onBehalf, message.gasOrder, message.from);
    if (message.gas >= balance) revert GasLimitExceedBalance(message.gas, balance);

    _lockGasTokens(message.from, message.gasOrder, message.gas);

    // @todo time bounds check

    // @todo add event emmiting
  }

  // @todo check if the function is needed
  function unlockGasTokens(Message calldata message) public {
    // @todo finalize
    bytes32 hash = Executor(execution()).messageHash(message);
    // @todo add error, no such tx
    if (!nonce[message.from][message.nonce]) revert InvalidTransaction(hash);

    _unlockGasTokens(message.from, message.gasOrder, message.gas);
  }
}
