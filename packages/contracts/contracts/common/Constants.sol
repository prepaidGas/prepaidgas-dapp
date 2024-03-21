// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.20;

uint256 constant DENOM = 10000;

uint256 constant MAX_FEE = 1200;
address constant TREASURY = address(bytes20(keccak256("TREASURY")));

uint256 constant MIN_TX_WINDOW = 20;

uint256 constant INFR_GAS_EXECUTE = 0;
uint256 constant INFR_GAS_LIQUIDATE = 0;

uint256 constant MAX_FILTERED_ORDERS = 100;
