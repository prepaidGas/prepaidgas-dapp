// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {Validators} from "./tools/Validators.sol";
import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {ExecutionMessage, MessageConfig} from "./base/ExecutionMessage.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;
//@todo remove
import "hardhat/console.sol";

contract Executor is ExecutionMessage, Validators {
  using ECDSA for bytes32;

  address public immutable gasOrder;

  // @dev signer => nonce => isUsed
  mapping(address => mapping(uint256 => bool)) public nonces;

  event Execution(
    address indexed signer,
    uint256 nonce,
    uint256 indexed gasOrder,
    address indexed onBehalf,
    bool status,
    bytes result,
    uint256 timestamp,
    address executor,
    bool isLiquidation
  );

  modifier validNonce(address signer, uint256 nonce) {
    if (nonces[signer][nonce]) revert Error.NonceExhausted(signer, nonce);
    _;
  }

  modifier deadlineMet(uint256 deadline) {
    if (deadline > block.timestamp) revert Error.DeadlineNotMet(block.timestamp, deadline);
    _;
  }

  constructor(address ordersManager, string memory name, string memory version) ExecutionMessage(name, version) {
    gasOrder = ordersManager;
  }

  // @todo rethink msg struct for comapitibilty with EIP-712
  // @todo it is possible to spend gas from any order
  function execute(
    MessageConfig calldata messageConfig,
    bytes calldata messageData,
    bytes calldata signature
  ) external validNonce(messageConfig.signer, messageConfig.nonce) {
    uint256 gasSpent = _execute(messageConfig, messageData, signature, false);

    /// @dev address(0) means registered executor should be rewarded
    _reportExecution(messageConfig, address(0), gasSpent, Const.INFR_GAS_EXECUTE);
  }

  function liquidate(
    MessageConfig calldata messageConfig,
    bytes calldata messageData,
    bytes calldata signature,
    bytes[] calldata validations
  ) external deadlineMet(messageConfig.deadline) validNonce(messageConfig.signer, messageConfig.nonce) {
    _checkValidations(messageConfig, messageData, validations);

    uint256 gasSpent = _execute(messageConfig, messageData, signature, true);

    uint256 infrastructureGas = Const.INFR_GAS_LIQUIDATE + Const.INFR_GAS_RECOVER_SIGNER * validatorThreshold();
    _reportExecution(messageConfig, msg.sender, gasSpent, infrastructureGas);
  }

  function _checkValidations(
    MessageConfig calldata messageConfig,
    bytes calldata messageData,
    bytes[] calldata validations
  ) private view enoughValidations(validations.length) {
    bytes32 digest = messageHash(messageConfig, messageData);

    address last;
    for (uint256 i = 0; i < validatorThreshold(); i++) {
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert Error.IncorrectSignatureOrder(last, recovered);
      if (!isValidator(recovered)) revert Error.UnknownRecovered(recovered);
    }
  }

  function _execute(
    MessageConfig calldata messageConfig,
    bytes calldata messageData,
    bytes calldata signature,
    bool isLiquidation
  ) private returns (uint256 gasSpent) {
    bytes32 digest = messageHash(messageConfig, messageData);
    address recovered = digest.recover(signature);
    if (recovered != messageConfig.signer) revert Error.UnexpectedRecovered(recovered, messageConfig.signer);

    nonces[messageConfig.signer][messageConfig.nonce] = true;

    uint256 gas = gasleft();
    (bool success, bytes memory result) = address(messageConfig.endpoint).call{gas: messageConfig.gas}(messageData);
    gasSpent = gas - gasleft() - Const.INFR_GAS_GET_GAS_SPENT;

    emit Execution(
      messageConfig.signer,
      messageConfig.nonce,
      messageConfig.gasOrder,
      messageConfig.onBehalf,
      success,
      result,
      block.timestamp,
      msg.sender,
      isLiquidation
    );
  }

  function _reportExecution(
    MessageConfig calldata messageConfig,
    address fulfiller,
    uint256 gasSpent,
    uint256 infrastructureGas
  ) private {
    IGasOrder(gasOrder).reportExecution(
      messageConfig.gasOrder,
      messageConfig.signer,
      messageConfig.onBehalf,
      messageConfig.gas + infrastructureGas,
      fulfiller,
      gasSpent + infrastructureGas
    );
  }
}
