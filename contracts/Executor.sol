// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {Validators} from "./Validators.sol";
import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {ExecutionMessage, Message} from "./ExecutionMessage.sol";

import "./Errors.sol" as Error;

contract Executor is ExecutionMessage, Validators {
  using ECDSA for bytes32;

  address public immutable gasOrder;

  mapping(address => mapping(uint256 => bool)) public nonces;

  event Executed(address signer, uint256 nonce, bool status, bytes result, uint256 timestamp, address executor);
  event Liquidated(address signer, uint256 nonce, bool status, bytes result, uint256 timestamp, address liquidator);

  modifier validNonce(address signer, uint256 nonce) {
    if (nonces[signer][nonce]) revert Error.NonceExhausted(signer, nonce);
    _;
  }

  modifier deadlineMet(uint256 deadline) {
    if (deadline > block.timestamp) revert Error.DeadlineNotMet(block.timestamp, deadline);
    _;
  }

  constructor(address ordersManager, string memory name, string memory version) ExecutionMessage(name, version) {
    gasOrder = ordersManager;
  }

  function execute(
    Message calldata message,
    bytes calldata signature
  ) external validNonce(message.signer, message.nonce) {
    uint256 gas = gasleft();

    (bool success, bytes memory result) = _execute(message, signature);
    emit Executed(message.signer, message.nonce, success, result, block.timestamp, msg.sender);

    // @todo calculate constant base gas usage and add here
    /// @dev address(0) means registered executor should be rewarded
    IGasOrder(gasOrder).reportExecution(message.gasOrder, address(0), gasleft() - gas);
  }

  function liquidate(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    enoughValidations(validations.length)
    deadlineMet(message.deadline)
    validNonce(message.signer, message.nonce)
  {
    uint256 gas = gasleft();

    address last;
    for (uint256 i = 0; i < validatorThreshold(); i++) {
      bytes32 digest = messageHash(message);
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert Error.IncorrectSignatureOrder(last, recovered);
      if (!isValidator(recovered)) revert Error.UnknownRecovered(recovered);
    }

    (bool success, bytes memory result) = _execute(message, signature);
    emit Liquidated(message.signer, message.nonce, success, result, block.timestamp, msg.sender);

    // @todo calculate constant base gas usage and add here
    IGasOrder(gasOrder).reportExecution(message.gasOrder, msg.sender, gasleft() - gas);
  }

  function _execute(Message calldata message, bytes calldata signature) private returns (bool, bytes memory) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);
    if (recovered != message.signer) revert Error.UnexpectedRecovered(recovered, message.signer);

    nonces[message.signer][message.nonce] = true;

    return address(message.endpoint).call{gas: message.gas}(message.data);
  }
}
