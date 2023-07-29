// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;
// @todo refactor
import {OrderStatus} from "./interfaces/IGasOrder.sol";

error OverlowValue(uint256 value, uint256 min);
error OverhighValue(uint256 value, uint256 max);

error FewValidations(uint256 value, uint256 min);
error NotPaymentMethod(address token);

error NonceExhausted(address signer, uint256 nonce);
error DeadlineNotMet(uint256 timestamp, uint256 deadline);

error UnexpectedRecovered(address recovered, address expected);
error UnknownRecovered(address recovered);
error IncorrectSignatureOrder(address lower, address higher);
//
error WrongOrderStatus(OrderStatus status);
error OrderExecutorExhausted(uint256 id);
error Unauthorized(address received, address expected);
error DeadlineExpired(uint256 timestamp, uint256 deadline);

error OrderNotExhausted();
error OrderFulfilled();
error OrderClosed();
