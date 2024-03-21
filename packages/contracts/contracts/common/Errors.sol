// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

import {OrderStatus} from "./../interfaces/IOrder.sol";

error Unauthorized(address received, address expected);

error BelowMin(uint256 value, uint256 min);
error ExceedsMax(uint256 value, uint256 max);

error NonceExhausted(address signer, uint256 nonce);
error BalanceExhausted(uint256 requested, uint256 allowed);

error DeadlineNotMet(uint256 timestamp, uint256 deadline);
error DeadlineExpired(uint256 timestamp, uint256 deadline);

error WrongOrderStatus(OrderStatus received, OrderStatus expected);
error BadIncomeTransfer(uint256 received, uint256 expected);
error UnexpectedRecovered(address recovered, address expected);
