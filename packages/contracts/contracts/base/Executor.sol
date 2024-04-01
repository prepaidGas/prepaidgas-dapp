// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { Validators } from "../tools/Validators.sol";
import { Message, MessageHash, Resolution } from "../common/Message.sol";

import "../common/Constants.sol" as Const;

abstract contract Executor is Validators, MessageHash {
  using ECDSA for bytes32;

  mapping(address signer => mapping(uint256 id => bool used)) public nonce;

  event Execution(
    address indexed signer,
    uint256 indexed nonce,
    uint256 indexed order,
    bool status,
    bytes result,
    uint256 timestamp,
    address executor,
    Resolution resolution
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

  modifier chaeckSignature(Message calldata message, bytes calldata signature) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);

    if (recovered != message.from) revert();

    _;
  }

  function execute(
    Message calldata message,
    bytes calldata signature
  ) external useNonce(message.from, message.nonce) chaeckSignature(message, signature) {
    uint256 gasSpent = _execute(message, Resolution.Execute);

    _reportExecution(message, msg.sender, gasSpent + Const.INFRASTRUCTURE_GAS, Resolution.Execute);
  }

  function liquidate(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    useNonce(message.from, message.nonce)
    chaeckSignature(message, signature)
    checkValidations(message, validations)
  {
    uint256 gasSpent = _execute(message, Resolution.Liquidate);

    _reportExecution(message, msg.sender, gasSpent + Const.INFRASTRUCTURE_GAS, Resolution.Liquidate);
  }

  function redeem(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    useNonce(message.from, message.nonce)
    chaeckSignature(message, signature)
    checkValidations(message, validations)
  {
    emit Execution(
      message.from,
      message.nonce,
      message.order,
      false,
      "",
      block.timestamp,
      msg.sender,
      Resolution.Redeem
    );

    _reportExecution(message, msg.sender, message.gas, Resolution.Redeem);
  }

  function _execute(Message calldata message, Resolution resolution) private returns (uint256 gasSpent) {
    uint256 gas = gasleft();

    bool success;
    bytes memory returndata = new bytes(Const.MAX_RETURNDATA);

    uint256 gasLimit = message.gas;
    address target = message.to;
    bytes memory data = abi.encodePacked(message.data, message.from);

    /// @solidity memory-safe-assembly
    assembly {
      success := call(gasLimit, target, 0, add(data, 0x20), mload(data), 0, 0)

      let length := returndatasize()
      if lt(length, mload(returndata)) {
        mstore(returndata, length)
      }

      returndatacopy(add(returndata, 0x20), 0, mload(returndata))
    }

    gasSpent = gas - gasleft();

    emit Execution(
      message.from,
      message.nonce,
      message.order,
      success,
      returndata,
      block.timestamp,
      msg.sender,
      resolution
    );
  }

  function _reportExecution(
    Message calldata /* message */,
    address /* fulfiller */,
    uint256 /* gasSpent */,
    Resolution /* resolution*/
  ) internal virtual {}
}
