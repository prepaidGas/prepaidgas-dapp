// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

bytes32 constant MESSAGE_TYPE_HASH = keccak256(
  "Message("
  "address signer,"
  "uint256 nonce,"
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
  uint256 gasOrder;
  uint256 deadline;
  address endpoint;
  uint256 gas;
  bytes data;
}

contract ExecutionMessage is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  function messageHash(Message calldata message) public view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(MESSAGE_TYPE_HASH, message)));
  }
}
