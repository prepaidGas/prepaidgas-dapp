// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

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

contract ExecutionMessage is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

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
