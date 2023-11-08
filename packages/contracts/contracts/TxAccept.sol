// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import {Message} from "./base/ExecutionMessage.sol";

contract TxAccept is ExecutionMessage {
    mapping(address => mapping(uint256 => bool)) public nonce;
    mapping(address => mapping(uint256 => uint256)) public lock;

    function addTransaction(
        bytes calldata signature,
        Message calldata message
    ) public specificStatus(transactionData.gasOrder, OrderStatus.Active) {
        bytes32 hash = messageHash(_transactionData);

        address recovered = hash.recover(signature);
        if (recovered != message.from) revert UnknownRecovered(recovered);

        // @todo update error to `InvalidSignature`
        if (nonce[message.from][message.nonce]) revert InvalidTransaction(hash);
        nonce[message.from][message.nonce] = true;

        lock[message.from][message.nonce] = message.gas;

        uint256 balance = usable(_transactionData.onBehalf, _transactionData.gasOrder, _transactionData.from);
        if (_transactionData.gas >= balance) revert GasLimitExceedBalance(_transactionData.gas, balance);

        _lockGasTokens(_transactionData.from, _transactionData.gasOrder, _transactionData.gas);

        // @todo time bounds check

        // @todo add event emmiting
    }

    function unlockGasTokens(
        Message calldata _transactionData
    ) public {
        // @todo finalize
        bytes32 hashedMsg = Executor(execution).messageHash(_transactionData);
        // @todo add error, no such tx
        if (!txMsgHashes[hashedMsg]) revert InvalidTransaction(hashedMsg);

        _unlockGasTokens(_transactionData.from, _transactionData.gasOrder, _transactionData.gas);
    }
}