// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { Validators } from "../tools/Validators.sol";
import { Message, MessageHash } from "../common/Message.sol";

abstract contract Executor is Validators, MessageHash {
  using ECDSA for bytes32;

  mapping(address signer => mapping(uint256 id => bool used)) public nonce;

  event Execution(
    address signer,
    uint256 nonce,
    uint256 order,
    bool status,
    bytes result,
    uint256 timestamp,
    address executor,
    bool liquidation
  );

  modifier useNonce(address signer, uint256 id) {
    if (nonce[signer][id]) revert();
    nonce[signer][id] = true;
    _;
  }

  modifier checkValidations(Message calldata message, bytes[] calldata validations) {
    if (validatorThreshold > validations.length) revert();

    bytes32 digest = messageHash(message);

    address last;
    for (uint256 i = 0; i < validatorThreshold; i++) {
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert();
      if (!isValidator[recovered]) revert();
    }

    _;
  }

  modifier validSignature(Message calldata message, bytes calldata signature) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);

    if (recovered != message.from) revert();

    _;
  }

  function execute(
    Message calldata message,
    bytes calldata signature
  ) external useNonce(message.from, message.nonce) validSignature(message, signature) {
    uint256 gasSpent = _execute(message, false);

    _reportExecution(message, address(0), gasSpent);
  }

  function liquidate(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    useNonce(message.from, message.nonce)
    validSignature(message, signature)
    checkValidations(message, validations)
  {
    uint256 gasSpent = _execute(message, true);

    _reportExecution(message, msg.sender, gasSpent);
  }

  function redeem(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    useNonce(message.from, message.nonce)
    validSignature(message, signature)
    checkValidations(message, validations)
  {
    _reportExecution(message, message.from, 0);
  }

  function _execute(Message calldata message, bool liquidation) private returns (uint256 gasSpent) {
    uint256 gas = gasleft();
    // @audit bomb here
    (bool success, bytes memory returndata) = message.to.call{ gas: message.gas }(
      abi.encodePacked(message.data, message.from)
    );

    gasSpent = gas - gasleft();

    emit Execution(
      message.from,
      message.nonce,
      message.order,
      success,
      returndata,
      block.timestamp,
      msg.sender,
      liquidation
    );
  }

  function _reportExecution(Message calldata message, address fulfiller, uint256 gasSpent) internal virtual {}
}
