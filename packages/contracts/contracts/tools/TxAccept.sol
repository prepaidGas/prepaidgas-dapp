// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "../base/GasOrderGetters.sol";
import {VerifierMessage, Message} from "../base/VerifierMessage.sol";
import {OrderStatus} from "../interfaces/IGasOrder.sol";
import "hardhat/console.sol";
abstract contract TxAccept is VerifierMessage, GasOrderGetters {
  using ECDSA for bytes32;
  enum NonceStatus {NONE, REQUESTED, EXECUTED}
  mapping(address => mapping(uint256 => NonceStatus)) public nonce;


  event TransactionAdded(Message message, bytes indexed signature);

  function addTransaction(
    Message calldata message,
    bytes calldata signature
  ) public specificStatus(message.gasOrder, OrderStatus.Active) {
    uint256 orderDeadline = order(message.gasOrder).executionPeriodDeadline;
    uint256 executionWindow = order(message.gasOrder).executionWindow;
    // @dev the Exucutor should execute msg in the timespan from `deadline - 2 * executionWindow` to `deadline - executionWindow`
    // the liquidation is possible from `deadline - executionWindow` to `deadline`

    // @todo recheck time bounds check
    if (message.deadline > orderDeadline - 2 * executionWindow && message.deadline > block.timestamp)
      revert InvalidTransactionDeadline(message.deadline, orderDeadline);
    bytes32 hash = messageHash(message);

    address recovered = hash.recover(signature);
    if (recovered != message.from) revert UnknownRecovered(recovered);

    if (nonce[message.from][message.nonce] == NonceStatus.REQUESTED || nonce[message.from][message.nonce] == NonceStatus.EXECUTED) revert NonceExhausted(message.from, message.nonce);
    nonce[message.from][message.nonce] = NonceStatus.REQUESTED;

    // @todo add validation for the Gas amount, it should be bigger than infrastructure call gas costs
    uint256 balance = usable(message.onBehalf, message.gasOrder, message.from);
    if (message.gas >= balance) revert GasLimitExceedBalance(message.gas, balance);


    // @todo add validation and throw error on revert
    // @dev the recipient should be able to accept such tokens
    _safeTransferFrom(message.from, msg.sender, message.gasOrder, message.tips, "");

    emit TransactionAdded(message, signature);
  }

  function isExecutable(Message calldata message) public view returns (bool) {
    // @todo disallow locking zero gas during the tx
    uint256 executionWindow = order(message.gasOrder).executionWindow;
    
    if (
      message.deadline - executionWindow * 2 < block.timestamp &&
      message.deadline - executionWindow > block.timestamp &&
      nonce[message.from][message.nonce] == NonceStatus.REQUESTED
    ) return true;
    else {
            console.log(uint(nonce[message.from][message.nonce]));

      return false;

    }
  }

  function isLiquidatable(Message calldata message) public view returns (bool) {
    // @todo finish the function validations
    // @todo disallow locking zero gas during the tx
    if (
      message.deadline - order(message.gasOrder).executionWindow < block.timestamp &&
      message.deadline > block.timestamp &&
      nonce[message.from][message.nonce] == NonceStatus.REQUESTED
    ) return true;
    else return false;
  }

  function isLiquidatableWithoutExecution(Message calldata message) public view returns (bool) {
    // @todo finish the function validations
    // @todo disallow locking zero gas during the tx
    if (
      message.deadline < block.timestamp && nonce[message.from][message.nonce] == NonceStatus.REQUESTED
    ) return true;
    else return false;
  }
}
