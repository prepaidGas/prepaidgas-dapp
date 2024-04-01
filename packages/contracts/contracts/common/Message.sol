// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

struct Message {
  address from;
  uint256 nonce;
  uint256 order;
  uint256 deadline;
  address to;
  uint256 gas;
  bytes data;
}

bytes32 constant MESSAGE_TYPE_HASH = keccak256(
  "Message("
  "address from,"
  "uint256 nonce,"
  "uint256 order,"
  "uint256 deadline,"
  "address to,"
  "uint256 gas,"
  "bytes data"
  ")"
);

contract MessageHash is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function domainSeparator() external view returns (bytes32) {
    return _domainSeparatorV4();
  }

  function messageHash(Message memory message) public view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(
            MESSAGE_TYPE_HASH,
            message.from,
            message.nonce,
            message.order,
            message.deadline,
            message.to,
            message.gas,
            keccak256(message.data)
          )
        )
      );
  }
}
