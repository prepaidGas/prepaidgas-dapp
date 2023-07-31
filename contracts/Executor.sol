// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {Validators} from "./tools/Validators.sol";
import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {ExecutionMessage, Message} from "./base/ExecutionMessage.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;

contract Executor is ExecutionMessage, Validators {
  using ECDSA for bytes32;

  address public immutable gasOrder;

  mapping(address => mapping(uint256 => bool)) public nonces;

  event Executed(
    address signer,
    uint256 nonce,
    uint256 gasOrder,
    address onBehalf,
    bool status,
    bytes result,
    uint256 timestamp,
    address executor
  );
  event Liquidated(
    address signer,
    uint256 nonce,
    uint256 gasOrder,
    address onBehalf,
    bool status,
    bytes result,
    uint256 timestamp,
    address liquidator
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

  function execute(
    Message calldata message,
    bytes calldata signature
  ) external validNonce(message.signer, message.nonce) {
    (bool success, bytes memory result, uint256 gasSpent) = _execute(message, signature);
    emit Executed(
      message.signer,
      message.nonce,
      message.gasOrder,
      message.onBehalf,
      success,
      result,
      block.timestamp,
      msg.sender
    );

    /// @dev address(0) means registered executor should be rewarded
    IGasOrder(gasOrder).reportExecution(
      message.gasOrder,
      message.signer,
      message.onBehalf,
      message.gas + Const.INFR_GAS_EXECUTE,
      address(0),
      gasSpent + Const.INFR_GAS_EXECUTE
    );
  }

  function liquidate(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  )
    external
    enoughValidations(validations.length)
    deadlineMet(message.deadline)
    validNonce(message.signer, message.nonce)
  {
    // @todo review function
    _validateSignaturesAndValidators(message, validations);

    (bool success, bytes memory result, uint256 gasSpent) = _execute(message, signature);
    emit Liquidated(
      message.signer,
      message.nonce,
      message.gasOrder,
      message.onBehalf,
      success,
      result,
      block.timestamp,
      msg.sender
    );
    // @todo review function
    _reportGasExecution(message, gasSpent);
  }

  function _validateSignaturesAndValidators(Message calldata message, bytes[] calldata validations) private view {
    address last;
    for (uint256 i = 0; i < validatorThreshold(); i++) {
      bytes32 digest = messageHash(message);
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert Error.IncorrectSignatureOrder(last, recovered);
      if (!isValidator(recovered)) revert Error.UnknownRecovered(recovered);
    }
  }

  function _reportGasExecution(Message calldata message, uint256 gasSpent) private {
    uint256 infrastructureGas = Const.INFR_GAS_LIQUIDATE + Const.INFR_GAS_RECOVER_SIGNER * validatorThreshold();
    IGasOrder(gasOrder).reportExecution(
      message.gasOrder,
      message.signer,
      message.onBehalf,
      message.gas + infrastructureGas,
      msg.sender,
      gasSpent + infrastructureGas
    );
  }

  function _execute(
    Message calldata message,
    bytes calldata signature
  ) private returns (bool success, bytes memory result, uint256 gasSpent) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);
    if (recovered != message.signer) revert Error.UnexpectedRecovered(recovered, message.signer);

    nonces[message.signer][message.nonce] = true;

    uint256 gas = gasleft();
    (success, result) = address(message.endpoint).call{gas: message.gas}(message.data);
    gasSpent = gas - gasleft() - Const.INFR_GAS_GET_GAS_SPENT;
  }
}
