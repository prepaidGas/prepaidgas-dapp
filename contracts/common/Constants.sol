// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

uint256 constant DENOM = 10000;
uint256 constant MIN_THRESHOLD = 1;

uint256 constant MAX_FEE = 1200;
address constant TREASURY = address(bytes20(keccak256("TREASURY")));

/// @dev execution gas limit should not be greater then liquidation one
uint256 constant INFR_GAS_EXECUTE = 0;
uint256 constant INFR_GAS_LIQUIDATE = 0;
uint256 constant INFR_GAS_RECOVER_SIGNER = 0;
uint256 constant INFR_GAS_GET_GAS_SPENT = 0;
