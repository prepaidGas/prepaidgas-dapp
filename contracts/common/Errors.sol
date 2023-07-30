// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import {OrderStatus} from "./../interfaces/IGasOrder.sol";

error OverlowValue(uint256 value, uint256 min);
error OverhighValue(uint256 value, uint256 max);

error FewValidations(uint256 value, uint256 min);
error NotPaymentMethod(address token);

error NonceExhausted(address signer, uint256 nonce);
error DeadlineNotMet(uint256 timestamp, uint256 deadline);
error DeadlineExpired(uint256 timestamp, uint256 deadline);

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address lower, address higher);

error WrongOrderStatus(OrderStatus received, OrderStatus expected);
error Unauthorized(address received, address expected);
error GasLimitExceedBalance(uint256 limit, uint256 balance);

error BalanceExhausted(uint256 requested, uint256 allowed);
error NotOperator(address holder, address spender);
