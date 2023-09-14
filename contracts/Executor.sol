// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {ExecutionMessage, Message} from "./base/ExecutionMessage.sol";

import {Validators} from "./tools/Validators.sol";

import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {IExecutor} from "./interfaces/IExecutor.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;

contract Executor is IExecutor, ExecutionMessage, Validators {
  using ECDSA for bytes32;

  address public immutable gasOrder;

  /// @dev from => nonce => exhausted
  mapping(address => mapping(uint256 => bool)) public nonces;

  event Execution(
    address indexed from,
    uint256 nonce,
    uint256 indexed gasOrder,
    address indexed onBehalf,
    bool status,
    bytes result,
    uint256 timestamp,
    address fulfiller,
    bool liquidation
  );

  modifier validNonce(address from, uint256 nonce) {
    if (nonces[from][nonce]) revert Error.NonceExhausted(from, nonce);
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
  ) external validNonce(message.from, message.nonce) {
    uint256 gasSpent = _execute(message, signature, false);

    /// @dev address(0) means registered executor should be rewarded
    _reportExecution(message, address(0), gasSpent, Const.INFR_GAS_EXECUTE);
  }

  // @todo think about liquidation by the `from` without transaction execute with guarantee withdrawal
  function liquidate(
    Message calldata message,
    bytes calldata signature,
    bytes[] calldata validations
  ) external deadlineMet(message.deadline) validNonce(message.from, message.nonce) {
    _checkValidations(message, validations);

    uint256 gasSpent = _execute(message, signature, true);

    uint256 infrastructureGas = Const.INFR_GAS_LIQUIDATE + Const.INFR_GAS_RECOVER_SIGNER * validatorThreshold();
    _reportExecution(message, msg.sender, gasSpent, infrastructureGas);
  }

  function _checkValidations(
    Message calldata message,
    bytes[] calldata validations
  ) private view enoughValidations(validations.length) {
    bytes32 digest = messageHash(message);

    address last;
    for (uint256 i = 0; i < validatorThreshold(); i++) {
      address recovered = digest.recover(validations[i]);
      if (last >= recovered) revert Error.IncorrectSignatureOrder(last, recovered);
      if (!isValidator(recovered)) revert Error.UnknownRecovered(recovered);
    }
  }

  function _execute(
    Message calldata message,
    bytes calldata signature,
    bool liquidation
  ) private returns (uint256 gasSpent) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);
    if (recovered != message.from) revert Error.UnexpectedRecovered(recovered, message.from);

    nonces[message.from][message.nonce] = true;

    uint256 gas = gasleft();
    (bool success, bytes memory returndata) = message.to.call{gas: message.gas}(
      /// @dev to support meta transactions the last parameter should be `from` and will be convered to `_msgSender()`
      abi.encodePacked(message.data, message.from)
    );

    gasSpent = gas - gasleft() - Const.INFR_GAS_GET_GAS_SPENT;

    emit Execution(
      message.from,
      message.nonce,
      message.gasOrder,
      message.onBehalf,
      success,
      returndata,
      block.timestamp,
      msg.sender,
      liquidation
    );
  }

  function _reportExecution(
    Message calldata message,
    address fulfiller,
    uint256 gasSpent,
    uint256 infrastructureGas
  ) private {
    IGasOrder(gasOrder).reportExecution(
      message.gasOrder,
      message.from,
      message.onBehalf,
      message.gas + infrastructureGas,
      fulfiller,
      gasSpent + infrastructureGas
    );
  }
}
