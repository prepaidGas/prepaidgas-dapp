// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

bytes32 constant MESSAGE_TYPE_HASH = keccak256(
  "Message("
  "address from,"
  "uint256 nonce,"
  "uint256 gasOrder,"
  "uint256 deadline,"
  "address to,"
  "uint256 gas,"
  "uint256 tips,"
  "bytes data"
  ")"
);

struct Message {
  address from;
  uint256 nonce;
  uint256 gasOrder;
  uint256 deadline;
  address to;
  uint256 gas;
  uint256 tips;
  bytes data;
}

abstract contract HashMessage {
  function _hashTypedDataV4(bytes32 structHash) internal view virtual returns (bytes32);

  function messageHash(Message memory message) public view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(
            MESSAGE_TYPE_HASH,
            message.from,
            message.nonce,
            message.gasOrder,
            message.deadline,
            message.to,
            message.gas,
            message.tips,
            /// @dev keccak dynamic field
            keccak256(message.data)
          )
        )
      );
  }
}

contract VerifierMessage is HashMessage, EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function domainSeparator() external view returns (bytes32) {
    return _domainSeparatorV4();
  }

  function _hashTypedDataV4(bytes32 structHash) internal view override(HashMessage, EIP712) returns (bytes32) {
    return super._hashTypedDataV4(structHash);
  }
}
