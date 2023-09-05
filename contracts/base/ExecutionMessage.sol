// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

bytes32 constant MESSAGE_TYPE_HASH = keccak256(
  "Message(address signer,uint256 nonce,uint256 gasOrder,address onBehalf,uint256 deadline,address endpoint,uint256 gas,bytes data)"
);

struct MessageConfig {
  address signer;
  uint256 nonce;
  uint256 gasOrder;
  address onBehalf;
  uint256 deadline;
  address endpoint;
  uint256 gas;
  //bytes data; // @todo should be hashed according to eip-712
}

contract ExecutionMessage is EIP712 {
  constructor(string memory name, string memory version) EIP712(name, version) {}

  // @dev passing the `Message` struct ot the messageHash it is required to pass structure with the keccak hash of the `data` field
  function messageHash(MessageConfig memory messageConfig, bytes memory messsageData) public view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(MESSAGE_TYPE_HASH, messageConfig, keccak256(messsageData))));
  }
}
