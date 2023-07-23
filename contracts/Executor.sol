// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

import "./Validators.sol";

contract Executor is EIP712, Validators {
  using ECDSA for bytes32;

  bytes32 private constant MESSAGE_TYPE_HASH =
    keccak256(
      "Message("
      "address signer,"
      "uint256 nonce,"
      "address gasPrepayer,"
      "uint256 gasOrder,"
      "uint256 deadline,"
      "address endpoint,"
      "uint256 gas,"
      "bytes data"
      ")"
    );

  struct Message {
    address signer;
    uint256 nonce;
    address gasPrepayer;
    uint256 gasOrder;
    uint256 deadline;
    address endpoint;
    uint256 gas;
    bytes data;
  }

  mapping(address user => mapping(uint256 nonce => bool used)) public nonces;

  event Executed(address signer, uint256 nonce, bool status, bytes result, uint256 timestamp);
  event Liquidated(address signer, uint256 nonce, address liquidator);

  constructor(string memory name, string memory version) EIP712(name, version) {}

  function execute(Message calldata message, bytes calldata signature) public {
    if (nonces[message.signer][message.nonce]) revert Error.NonceExhausted(message.signer, message.nonce);

    bytes32 digest = _hashTypedDataV4(messageHash(message));
    address recovered = digest.recover(signature);
    if (recovered != message.signer) revert Error.UnexpectedRecovered(recovered, message.signer);

    nonces[message.signer][message.nonce] = true;

    (bool success, bytes memory result) = address(message.endpoint).call{gas: message.gas}(message.data);

    emit Executed(message.signer, message.nonce, success, result, block.timestamp);
    // @todo callback
  }

  function liquidate(Message calldata message, bytes calldata signature, bytes[] calldata validations) external {
    if (nonces[message.signer][message.nonce]) revert Error.NonceExhausted(message.signer, message.nonce);
    if (message.deadline > block.timestamp) revert Error.DeadlineNotMet(block.timestamp, message.deadline);

    if (validatorThreshold() > validations.length)
      revert Error.UnderThreshold(validatorThreshold(), validations.length);

    address last;
    for (uint256 i = 0; i < validatorThreshold(); i++) {
      bytes32 digest = _hashTypedDataV4(messageHash(message));
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert Error.IncorrectSignatureOrder(last, recovered);
      if (!isValidator(recovered)) revert Error.UnknownRecovered(recovered);
    }

    execute(message, signature);
    emit Liquidated(message.signer, message.nonce, msg.sender);
    // @todo callback
  }

  function messageHash(Message calldata message) public pure returns (bytes32) {
    return keccak256(abi.encode(MESSAGE_TYPE_HASH, message));
  }
}
