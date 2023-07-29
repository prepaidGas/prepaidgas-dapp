// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address last, address recovered);
error UnderThreshold(uint256 threshold, uint256 number);

error NonceExhausted(address signer, uint256 nonce);
error DeadlineNotMet(uint256 timestamp, uint256 deadline);

error OverhighFee(uint256 value, uint256 max);

error NotPaymentMethod(address token);
error OrderExecutorExhausted(uint256 id);
error Unauthorized(address received, address expected);
error DeadlineExpired(uint256 timestamp, uint256 deadline);
