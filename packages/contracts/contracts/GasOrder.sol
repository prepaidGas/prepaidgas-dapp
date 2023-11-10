// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./tools/TxAccept.sol";

import {Message} from "./base/ExecutionMessage.sol";
import {ERC1155ish} from "./base/ERC1155ish.sol";
import {FeeProcessor, Fee} from "./tools/FeeProcessor.sol";
import {Order, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recommended to deploy the contract to the cheep network
 * @author SteMak, web3skeptic (markfender)
 */

contract GasOrder is IGasOrder, FeeProcessor, TxAccept {
  using SafeERC20 for IERC20;

  uint256 private _ordersCount;
  mapping(uint256 => Order) private _order;

  mapping(uint256 => Payment) private _reward;
  mapping(uint256 => GasPayment) private _gasCost;
  mapping(uint256 => GasPayment) private _guarantee;

  mapping(uint256 => address) private _executor;

  address private immutable _execution;

  constructor(address executionEndpoint, string memory link) ERC1155ish(link) {
    _execution = executionEndpoint;
  }

  // @todo add support of our _msgSender
  // @todo gas optimization
  // - rewrite loops with an unchecked increment

  /**
   * @dev Creates an order with specified parameters.
   *
   * @param maxGas The amount of Gas to book for future calls executions.
   * @param executionPeriodStart The start of the period when execution is possible.
   * @param executionPeriodDeadline The last possible timestamp for execution.
   * @param executionWindow The execution window duration specified as the number of blocks.
   * @param rewardValue The reward payment details.
   * @param gasCostValue The cost of one Gas uint.
   * @param guaranteeValue The guarantee payment details.
   * @param rewardTransfer The the reward transfer amount, it is needed to verify the amount
   * of tokens which should be transfered to the contract in order to support fee on transfer tokens.
   * @param gasCostTransfer The gas cost transfer amount, it is needed to verify the total amount of tokens
   * which should be transfered to the contract in order to support fee on transfer tokens.
   *
   * This function creates an order with the specified parameters. It ensures the validity
   * of the order parameters and initializes the order's details.
   */
  function createOrder(
    uint256 maxGas,
    uint256 executionPeriodStart,
    uint256 executionPeriodDeadline,
    uint256 executionWindow,
    Payment calldata rewardValue,
    GasPayment calldata gasCostValue,
    GasPayment calldata guaranteeValue,
    uint256 rewardTransfer,
    uint256 gasCostTransfer
  )
    external
    deadlineNotMet(executionPeriodDeadline)
    deadlineNotMet(executionPeriodStart)
    possibleExecutionWindow(executionWindow)
    returns (uint256)
  {
    require(executionPeriodStart + executionWindow < executionPeriodDeadline); // @todo add error msg
    require(maxGas > 0); // @todo consider replacing `0` with the value which represents the minimum valuable value

    uint256 id = _ordersCount++;

    _order[id] = Order({
      manager: msg.sender, // @todo replace with `owner`, make transferable
      maxGas: maxGas,
      /// @dev it is removed for now, but one day we will implement it I swear
      // maxGasPrice: 1 ether,
      executionPeriodStart: executionPeriodStart,
      executionPeriodDeadline: executionPeriodDeadline,
      executionWindow: executionWindow
    });

    _reward[id] = rewardValue;
    _gasCost[id] = gasCostValue;
    _guarantee[id] = guaranteeValue;

    _acceptIncomingOrderCreate(maxGas, rewardValue, gasCostValue, rewardTransfer, gasCostTransfer);

    emit OrderCreate(id, executionWindow);

    return id;
  }

  /// @dev function to avoid stack too deep issue
  function _acceptIncomingOrderCreate(
    uint256 maxGas,
    Payment calldata rewardValue,
    GasPayment calldata gasCostValue,
    uint256 rewardTransfer,
    uint256 gasCostTransfer
  ) private {
    _acceptIncoming(rewardValue.token, msg.sender, rewardTransfer, rewardValue.amount);
    _acceptIncoming(gasCostValue.token, msg.sender, gasCostTransfer, gasCostValue.gasPrice * maxGas);
  }

  /**
   * @dev Accepts an order by an executor.
   *
   * @param id The ID of the order.
   * @param guaranteeTransfer The guarantee transfer amount, it is needed to verify the amount
   * of tokens which should be transfered to the contract in order to support fee on transfer tokens.
   *
   * This function accepts an order by an executor, transferring the necessary guarantees
   * and rewards to the contract and updating the order's status.
   */
  function acceptOrder(uint256 id, uint256 guaranteeTransfer) external specificStatus(id, OrderStatus.Pending) {
    _executor[id] = msg.sender;
    _mint(order(id).manager, id, order(id).maxGas);

    _distribute(msg.sender, reward(id).token, _takeFee(Fee.Reward, reward(id).token, reward(id).amount));
    _acceptIncoming(guarantee(id).token, msg.sender, guaranteeTransfer, totalSupply(id) * guarantee(id).gasPrice);

    emit OrderAccept(id, msg.sender);
  }

  /**
   * @dev Retrieves prepaid tokens form the order.
   *
   * @param holder The address of the Gas holder.
   * @param id The ID of the order.
   * @param amount The amount of gas tokens to retrieve.
   *
   * This function decreses the amout of Gas tokens in the order and repays the tokens ot the holder.
   */
  function retrieveGasCost(address holder, uint256 id, uint256 amount) external {
    _utilizeOperator(holder, id, msg.sender, amount);

    OrderStatus orderStatus = status(id);
    if (orderStatus == OrderStatus.Active || orderStatus == OrderStatus.Inactive)
      _distribute(executor(id), guarantee(id).token, guarantee(id).gasPrice * amount);

    IERC20(gasCost(id).token).safeTransfer(holder, gasCost(id).gasPrice * amount);
  }

  /**
   * @dev Retrieves guarantees from an order.
   *
   * @param id The ID of the order.
   *
   * This function retrieves guarantees from an order and distributes them to the executor after order is finally fulfilled.
   */
  function retrieveGuarantee(uint256 id) external specificStatus(id, OrderStatus.Inactive) {
    _distribute(executor(id), guarantee(id).token, guarantee(id).gasPrice * totalSupply(id));
    // @todo missing burn
  }

  /**
   * @dev Revokes an order if it is pending or untaken.
   *
   * @param id The ID of the order.
   *
   * This function allows the manager to revoke an order if it is not accepted by any Executor.
   * It returns rewards to the order manager.
   */
  function revokeOrder(uint256 id) external {
    Order memory currentOrder = order(id);
    if (msg.sender != currentOrder.manager) revert Unauthorized(msg.sender, currentOrder.manager);

    OrderStatus currentStatus = status(id);
    // @notice it throws an error which states that `Untaken` status is an expectable,
    // but it also expects a `Pending` status
    if (currentStatus != OrderStatus.Pending && currentStatus != OrderStatus.Untaken)
      revert WrongOrderStatus(currentStatus, OrderStatus.Untaken);

    _executor[id] = address(1);

    IERC20(reward(id).token).safeTransfer(order(id).manager, reward(id).amount);
    /// @notice gasCost also should be withdrawn back to the manager
    IERC20(gasCost(id).token).safeTransfer(order(id).manager, gasCost(id).gasPrice * order(id).maxGas);
  }

  /**
   * @dev Verifies the execution of the order and updates the balance.
   *
   * @param message The transaction message data.
   * @param fulfiller The fulfiller's address (executor or liquidator).
   * @param gasSpent The amount of Gas spent during execution.
   * @param infrastructureGas The Gas expences for the infrastracture call.
   *
   * This function verifies the execution of an order and handles gas costs, rewards, and guarantees.
   */
  function reportExecution(
    Message calldata message,
    address fulfiller,
    uint256 gasSpent,
    uint256 infrastructureGas
  ) external executionCallback specificStatus(message.gasOrder, OrderStatus.Active) {
    uint256 id = message.gasOrder;
    address from = message.from;
    address onBehalf = message.onBehalf;
    uint256 transactionNonce = message.nonce;
    uint256 deadline = message.deadline;
    uint256 balance = usable(onBehalf, id, from);
    // @todo verify correctness
    uint256 gasLimit = message.gas - infrastructureGas;
    if (gasLimit > balance) revert GasLimitExceedBalance(gasLimit, balance);

    /// @dev should not happen in ordinary situations
    if (gasSpent > balance) gasSpent = balance;
    _utilizeAllowance(onBehalf, id, from, gasSpent);

    if (fulfiller == address(0)) {
      if (!isExecutable(message)) revert ExecutionImpossible(from, transactionNonce, message.deadline, block.timestamp);
      // execution
      fulfiller = executor(id);
    } else {
      // liquidation
      if (!isLiquidatable(message)) revert LiquidationImpossible(from, transactionNonce, deadline);
    }
    _distribute(fulfiller, gasCost(id).token, gasCost(id).gasPrice * gasSpent);

    uint256 unlockAmount = guarantee(id).gasPrice * gasSpent;
    if (fulfiller == executor(id)) {
      _distribute(fulfiller, guarantee(id).token, unlockAmount);
    } else {
      address unlockToken = guarantee(id).token;
      _distribute(fulfiller, unlockToken, _takeFee(Fee.Guarantee, unlockToken, unlockAmount));
    }

    _unlockGasTokens(message);
  }

  /**
   * @dev Order management transfer
   *
   * @param _orderId The ID of the order which management should be transfered.
   * @param _newManager The addres to which order is trying to be transfered.
   *
   */
  function transferOrderManagement(uint256 _orderId, address _newManager) external {
    address oldManager = order(_orderId).manager;
    if (msg.sender != oldManager) revert Unauthorized(msg.sender, oldManager);
    // @dev disallow setting manager address to zero, zero manager address is used to detect that the order is not created
    // if it is needed to set empty manager, it is recomended to set another dead address
    if (oldManager == _newManager || _newManager == address(0)) revert IncorrectAddressArgument(_newManager);

    _order[_orderId].manager = _newManager;

    emit OrderManagerChanged(_orderId, oldManager, _newManager);
  }

  // @notice getter functions implementations
  function ordersCount() public view override returns (uint256) {
    return _ordersCount;
  }

  function order(uint256 id) public view override returns (Order memory) {
    return _order[id];
  }

  function reward(uint256 id) public view override returns (Payment memory) {
    return _reward[id];
  }

  function gasCost(uint256 id) public view override returns (GasPayment memory) {
    return _gasCost[id];
  }

  function guarantee(uint256 id) public view override returns (GasPayment memory) {
    return _guarantee[id];
  }

  function executor(uint256 id) public view override returns (address) {
    return _executor[id];
  }

  //function status(uint256) public returns (OrderStatus);

  function execution() public view override returns (address) {
    return _execution;
  }
}
