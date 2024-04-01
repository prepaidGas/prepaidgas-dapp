// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import { OrderStatus } from "./Order.sol";

error Unauthorized(address received, address expected);

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address lower, address higher);
error FewValidations(uint256 value, uint256 min);

error BelowMin(uint256 value, uint256 min);
error ExceedMax(uint256 value, uint256 max);

error BadOrderNowExpire(uint256 time, uint256 expire);
error BadOrderStartEnd(uint256 start, uint256 end);
error BadOrderExpireEnd(uint256 expire, uint256 end);
error BadOrderNowStart(uint256 time, uint256 start);

error NonceExhausted(address signer, uint256 id);
error BalanceExhausted(uint256 requested, uint256 allowed);

error WindowNotOpen(uint256 time, uint256 start);
error WindowClosed(uint256 time, uint256 end);

error WrongOrderStatus(OrderStatus received, OrderStatus expected);
error BadIncomeTransfer(uint256 received, uint256 expected);
