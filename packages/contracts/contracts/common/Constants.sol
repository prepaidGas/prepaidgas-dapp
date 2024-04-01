// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

uint256 constant DENOM = 10_000;

uint256 constant MAX_FEE = 4_000;
address constant TREASURY = address(bytes20(keccak256("TREASURY")));

uint256 constant MAX_RETURNDATA = 32 * 10;
uint256 constant INFRASTRUCTURE_GAS = 50_000;

uint256 constant MIN_VALIDATIONS = 1;

uint256 constant MIN_TX_WINDOW = 60;
uint256 constant MAX_REDEEM_WINDOW = 60 * 60 * 24 * 7;
uint256 constant MAX_PENDING = 60 * 60 * 24 * 3;

uint256 constant MIN_GAS = 100_000;
