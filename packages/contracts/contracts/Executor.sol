// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {ExecutionMessage, Message} from "./base/ExecutionMessage.sol";

import {IGasOrder} from "./interfaces/IGasOrder.sol";
import {IExecutor} from "./interfaces/IExecutor.sol";
import {ITxAccept} from "./interfaces/ITxAccept.sol";

import "./common/Errors.sol";
import "./common/Constants.sol";

contract Executor is IExecutor, ExecutionMessage {
  using ECDSA for bytes32;

  address public immutable gasOrder;

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

  modifier deadlineMet(uint256 deadline) {
    if (deadline > block.timestamp) revert DeadlineNotMet(block.timestamp, deadline);
    _;
  }

  constructor(address ordersManager, string memory name, string memory version) ExecutionMessage(name, version) {
    gasOrder = ordersManager;
  }

  /**
   * @dev Executes the actions specified in the message.
   *
   * @param message The message to execute with the platform metadata.
   * @param signature The senders signature of the message.
   *
   * This function verifies the validity of executing the message and performs the actions.
   * After execution the registered executor will be rewarded.
   */
  function execute(Message calldata message, bytes calldata signature) external {
    uint256 gasSpent = _execute(message, signature, false);

    /// @dev address(0) means registered executor should be rewarded
    _reportExecution(message, address(0), gasSpent, INFR_GAS_EXECUTE);
  }

  /**
   * @dev Initiates the liquidation process.
   *
   * @param message The message to execute with the platform metadata.
   * @param signature The senders signature of the message.
   *
   * This function verifies the validity of liquidation and performs the necessary actions.
   * After execution the liquidator will be rewarded.
   */
  function liquidate(Message calldata message, bytes calldata signature) external {
    uint256 gasSpent = _execute(message, signature, true);
    //@todo recheck the corectness of these operations
    uint256 infrastructureGas = INFR_GAS_LIQUIDATE + INFR_GAS_RECOVER_SIGNER;
    _reportExecution(message, msg.sender, gasSpent, infrastructureGas);
  }

  function liquidateWithoutExecution(Message calldata message, bytes calldata signature) external {
    _reportExecution(message, message.from, 0, 0);
  }

  /**
   * @dev Executes the actions specified in the message.
   *
   * @param message The message to execute with the platform metadata.
   * @param signature The senders signature of the message.
   * @param liquidation A flag indicating when the execution is called by liquidator.
   * @return gasSpent The amount of Gas used during execution.
   *
   * This function verifies the validity of executing the message and performs the actions
   * described in the message. It also updates nonce and emits an execution event.
   */
  function _execute(
    Message calldata message,
    bytes calldata signature,
    bool liquidation
  ) private returns (uint256 gasSpent) {
    bytes32 digest = messageHash(message);
    address recovered = digest.recover(signature);
    /// @dev recovered could not be 0x0 due to `ECDSA.recover` design
    if (recovered != message.from) revert UnexpectedRecovered(recovered, message.from);

    uint256 gas = gasleft();
    (bool success, bytes memory returndata) = message.to.call{gas: message.gas}(
      /// @dev to support meta transactions the last parameter should be `from` and will be convered to `_msgSender()`
      abi.encodePacked(message.data, message.from)
    );

    gasSpent = gas - gasleft() - INFR_GAS_GET_GAS_SPENT;

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

  /**
   * @dev Reports the execution of a message.
   *
   * @param message The message to execute with the platform metadata.
   * @param fulfiller The address of the fulfiller (executor of liquidator).
   * @param gasSpent The amount of Gas used for message execution.
   * @param infrastructureGas The amount of Gas used for the infrastructure needs.
   *
   * This function reports the execution of a message, including gas usage and gas order details.
   */
  function _reportExecution(
    Message calldata message,
    address fulfiller,
    uint256 gasSpent,
    uint256 infrastructureGas
  ) private {
    IGasOrder(gasOrder).reportExecution(message, fulfiller, gasSpent, infrastructureGas);
  }
}
