// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import {OrderStatus} from "./../interfaces/IGasOrder.sol";

error Unauthorized(address received, address expected);
error OverlowValue(uint256 value, uint256 min);
error OverhighValue(uint256 value, uint256 max);
error BalanceExhausted(uint256 requested, uint256 allowed);

error DeadlineNotMet(uint256 timestamp, uint256 deadline);
error DeadlineExpired(uint256 timestamp, uint256 deadline);

error NonceExhausted(address signer, uint256 nonce);
error FewValidations(uint256 value, uint256 min);

// @notice if `expected` is equal to `0x0` this means that the there are few possible order statuses to be accepted
error WrongOrderStatus(OrderStatus received, OrderStatus expected);
error GasLimitExceedBalance(uint256 limit, uint256 balance);
error BadIncomeTransfer(uint256 received, uint256 expected);
error NotOperator(address holder, address spender);

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address lower, address higher);

// @todo recheck speling
error ImpossibleRevocation(OrderStatus currentStatus, bool isRevokable);
