// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address last, address recovered);
error UnderThreshold(uint256 threshold, uint256 number);

error NonceExhausted(address signer, uint256 nonce);
error DeadlineNotMet(uint256 timestamp, uint256 deadline);
