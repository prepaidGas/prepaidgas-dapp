// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import {OrderStatus} from "./../interfaces/IGasOrder.sol";

error Unauthorized(address received, address expected);
error UnderflowValue(uint256 value, uint256 min);
error OverflowValue(uint256 value, uint256 max);
error BalanceExhausted(uint256 requested, uint256 allowed);

error DeadlineNotMet(uint256 timestamp, uint256 deadline);
error DeadlineExpired(uint256 timestamp, uint256 deadline);

error NonceExhausted(address signer, uint256 nonce);
error FewValidations(uint256 value, uint256 min);

/// @notice if `expected` is equal to `0x0` this means that the there are few possible order statuses to be accepted
error WrongOrderStatus(OrderStatus received, OrderStatus expected);
error GasLimitExceedBalance(uint256 limit, uint256 balance);

error BadIncomeTransfer(uint256 received, uint256 expected);
error NotOperator(address holder, address spender);

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error InvalidSignature(bytes signature);
error InvalidTransaction(bytes32 transactionMessageHash);
error IncorrectSignatureOrder(address lower, address higher);
error IncorrectAddressArgument(address received);
error InvalidTransactionDeadline(uint256 transactionDeadline, uint256 orderDeadline);

error LiquidationImpossible(address from, uint256 nonce, uint256 deadline);
error ExecutionImpossible(address from, uint256 nonce, uint256 deadline, uint256 currentTime);
// @todo insufficient tips
