// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

bytes32 constant MESSAGE_TYPE_HASH = keccak256(
  "Message("
    "address from,"
    "uint256 nonce,"
    "uint256 gasOrder,"
    "address onBehalf,"
    "uint256 deadline,"
    "address to,"
    "uint256 gas,"
    "bytes data"
  ")"
);

struct Message {
  address from;
  uint256 nonce;
  uint256 gasOrder;
  address onBehalf;
  uint256 deadline;
  address to;
  uint256 gas;
  bytes data;
}

abstract contract HashMessage {
  function _hashTypedDataV4(bytes32 structHash) internal virtual view returns (bytes32);

  function messageHash(Message memory message) public view returns (bytes32) {
    return
      _hashTypedDataV4(
      keccak256(
        abi.encode(
          MESSAGE_TYPE_HASH,
          message.from,
          message.nonce,
          message.gasOrder,
          message.onBehalf,
          message.deadline,
          message.to,
          message.gas,
          /// @dev keccak dynamic field
          keccak256(message.data)
        )
      )
    );
  }
}

abstract contract ReproducerMessage is HashMessage {
  bytes32 public domain_separator;

  function verifier() public virtual returns (address);

  function updateDomainSeparator() external {
    domain_separator = VerifierMessage(verifier()).domainSeparator();
  }

  function _hashTypedDataV4(bytes32 structHash) internal view override returns (bytes32) {
    return MessageHashUtils.toTypedDataHash(domain_separator, structHash);
  }
}

contract VerifierMessage is HashMessage, EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function domainSeparator() view external returns (bytes32) {
    return _domainSeparatorV4();
  }

  function _hashTypedDataV4(bytes32 structHash) internal view override(HashMessage, EIP712) returns (bytes32) {
    return super._hashTypedDataV4(structHash);
  }
}
