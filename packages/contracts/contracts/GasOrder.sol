// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ERC1155ish} from "./base/ERC1155ish.sol";

import {FeeProcessor, Fee} from "./tools/FeeProcessor.sol";

import {Order, FilteredOrder, OrderStatus, GasPayment, Payment, IGasOrder} from "./interfaces/IGasOrder.sol";

import "./common/Errors.sol" as Error;
import "./common/Constants.sol" as Const;

import "hardhat/console.sol";

/**
 * @title GasOrder
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, web3skeptic (markfender)
 */

contract GasOrder is IGasOrder, FeeProcessor, ERC1155ish {
  using SafeERC20 for IERC20;

  address public immutable execution;

  uint256 public ordersCount;
  mapping(uint256 => Order) public order;

  mapping(uint256 => Payment) public reward;
  mapping(uint256 => GasPayment) public gasCost;
  mapping(uint256 => GasPayment) public guarantee;

  mapping(uint256 => address) public executor;

  // @todo move events to a separate file, probably to interface
  event OrderCreate(uint256 indexed id, uint256 executionWindow);
  event OrderAccept(uint256 indexed id, address indexed executor);
  event OrderManagerChanged(uint256 indexed id, address indexed oldManager, address indexed newManager);

  modifier executionCallback() {
    if (execution != msg.sender) revert Error.Unauthorized(msg.sender, execution);
    _;
  }
  /* @todo implement modifier of getter
  modifier orderExists(uint256 id) {
    
  }*/

  modifier deadlineNotMet(uint256 deadline) {
    if (deadline <= block.timestamp) revert Error.DeadlineExpired(block.timestamp, deadline);
    _;
  }

  modifier possibleExecutionWindow(uint256 window) {
    if (window < Const.MIN_EXEC_WINDOW) revert Error.OverlowValue(window, Const.MIN_EXEC_WINDOW);
    _;
  }

  modifier specificStatus(uint256 id, OrderStatus expected) {
    OrderStatus real = status(id);
    if (real != expected) revert Error.WrongOrderStatus(real, expected);
    _;
  }

  constructor(address executionEndpoint, string memory link) ERC1155ish(link) {
    execution = executionEndpoint;
  }

  // @todo add orderExist function
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
   * @param revokable A flag indicating if the order is revokable.
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
    // uint256 maxGasCost, // @todo add maxGasCost
    uint256 executionPeriodStart,
    uint256 executionPeriodDeadline,
    uint256 executionWindow,
    bool revokable,
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
  {
    require(executionPeriodStart + executionWindow < executionPeriodDeadline); // @todo add error msg
    require(maxGas > 0); // @todo consider replacing `0` with the value which represents the minimum valuable value

    uint256 id = ordersCount++;

    order[id] = Order({
      manager: msg.sender, // @todo replace with `owner`, make transferable
      maxGas: maxGas,
      /// @dev magic number, should be removed in the future
      maxGasPrice: 1 ether,
      executionPeriodStart: executionPeriodStart,
      executionPeriodDeadline: executionPeriodDeadline,
      executionWindow: executionWindow,
      isRevokable: revokable
    });

    reward[id] = rewardValue;
    gasCost[id] = gasCostValue;
    guarantee[id] = guaranteeValue;

    _acceptIncomingOrderCreate(maxGas, rewardValue, gasCostValue, rewardTransfer, gasCostTransfer);

    emit OrderCreate(id, executionWindow);
    // @todo return the created order id to handle the case when it is created from
    // the third party contract and it is needed to store it somewhere
    // return id;
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
    executor[id] = msg.sender;
    _mint(order[id].manager, id, order[id].maxGas);

    _distribute(msg.sender, reward[id].token, _takeFee(Fee.Reward, reward[id].token, reward[id].amount));
    _acceptIncoming(guarantee[id].token, msg.sender, guaranteeTransfer, totalSupply(id) * guarantee[id].gasPrice);

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
      _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * amount);

    IERC20(gasCost[id].token).safeTransfer(holder, gasCost[id].gasPrice * amount);
  }

  /**
   * @dev Retrieves guarantees from an order.
   *
   * @param id The ID of the order.
   *
   * This function retrieves guarantees from an order and distributes them to the executor after order is finally fulfilled.
   */
  function retrieveGuarantee(uint256 id) external specificStatus(id, OrderStatus.Inactive) {
    _guaranteeAndRewardDelivered(id); // @todo it might be already applied
    _distribute(executor[id], guarantee[id].token, guarantee[id].gasPrice * totalSupply(id));
  }

  /**
   * @dev Revokes an order.
   *
   * @param id The ID of the order.
   *
   * This function allows the manager to revoke an order if it is revokable
   * or if it is not accepted by any Executor yet. It returns guarantees and rewards to the order manager.
   */
  function revokeOrder(uint256 id) external {
    Order memory currentOrder = order[id];
    if (msg.sender != currentOrder.manager) revert Error.Unauthorized(msg.sender, currentOrder.manager);

    OrderStatus currentStatus = status(id);
    if (
      currentStatus == OrderStatus.Pending ||
      (currentOrder.isRevokable && (currentStatus == OrderStatus.Accepted || currentStatus == OrderStatus.Active))
    ) {
      _guaranteeAndRewardDelivered(id);
      IERC20(reward[id].token).safeTransfer(order[id].manager, reward[id].amount);
      /// @notice gasCost also should be withdrawn back to the manager
      IERC20(gasCost[id].token).safeTransfer(order[id].manager, gasCost[id].gasPrice * order[id].maxGas);
    } else {
      revert Error.RevokeNotAllowed(currentOrder.isRevokable, currentStatus);
    }
  }

  /**
   * @dev Verifies the execution of the order and updates the balance.
   *
   * @param id The ID of the order.
   * @param from The signer's address.
   * @param onBehalf The address on behalf of which the order is executed.
   * @param gasLimit The Gas restriction for the execution.
   * @param fulfiller The fulfiller's address (executor or liquidator).
   * @param gasSpent The amount of Gas spent during execution.
   *
   * This function verifies the execution of an order and handles gas costs, rewards, and guarantees.
   */
  function reportExecution(
    uint256 id,
    address from,
    address onBehalf,
    uint256 gasLimit,
    address fulfiller,
    uint256 gasSpent
  ) external executionCallback specificStatus(id, OrderStatus.Active) {
    uint256 balance = usable(onBehalf, id, from);
    if (gasLimit > balance) revert Error.GasLimitExceedBalance(gasLimit, balance);

    /// @dev should not happen in ordinary situations
    if (gasSpent > balance) gasSpent = balance;
    _utilizeAllowance(onBehalf, id, from, gasSpent);

    if (fulfiller == address(0)) fulfiller = executor[id];

    _distribute(fulfiller, gasCost[id].token, gasCost[id].gasPrice * gasSpent);

    uint256 unlockAmount = guarantee[id].gasPrice * gasSpent;
    if (fulfiller == executor[id]) {
      _distribute(fulfiller, guarantee[id].token, unlockAmount);
    } else {
      address unlockToken = guarantee[id].token;
      _distribute(fulfiller, unlockToken, _takeFee(Fee.Guarantee, unlockToken, unlockAmount));
    }
  }

  // @todo verify the function and all the possible states
  /**
   * @dev Gets the current status of an order with the given ID.
   *
   * @param id The ID of the order.
   * @return status The current status of the order.
   *
   * This function returns the current status of an order based on various conditions
   * such as the executor, execution deadlines, and more. It provides insight into the
   * state of the order.
   */
  function status(uint256 id) public view returns (OrderStatus) {
    if (order[id].manager == address(0)) return OrderStatus.None;
    if (executor[id] == address(1)) return OrderStatus.Closed;

    /// @notice if the order is published and not accepted by any Executor it is still in `Pending` status
    /// until the `block.timestamp` excceds the `Order.executionPeriodDeadline`
    if (executor[id] == address(0) && order[id].executionPeriodDeadline >= block.timestamp) {
      return OrderStatus.Pending;
    }

    if (executor[id] != address(0) && totalSupply(id) == 0) return OrderStatus.Inactive;

    if (order[id].executionPeriodStart > block.timestamp) return OrderStatus.Accepted;
    return OrderStatus.Active;
  }

  /**
   * @dev Marks an order as completed by setting the executor to address(1).
   *
   * @param id The ID of the order to be marked as completed.
   *
   */
  function _guaranteeAndRewardDelivered(uint256 id) private {
    executor[id] = address(1);
  }

  /**
   * @dev Order management transfer
   *
   * @param _orderId The ID of the order which management should be transfered.
   * @param _newManager The addres to which order is trying to be transfered.
   *
   */
  function transferOrderManagement(uint256 _orderId, address _newManager) external {
    address oldManager = order[_orderId].manager;
    if (msg.sender != oldManager) revert Error.Unauthorized(msg.sender, oldManager);
    if (oldManager == _newManager) revert Error.IncorrectAddressArgument(_newManager);

    order[_orderId].manager = _newManager;

    emit OrderManagerChanged(_orderId, oldManager, _newManager);
  }

  /// Getters function
  // Getter function to filter and paginate orders

  // @todo add user field
  function getFilteredOrders(
    address _manager,
    OrderStatus _status,
    uint256 _limit,
    uint256 _start
  ) external view returns (FilteredOrder[] memory) {
    return getFilteredOrders(_manager, address(0), _status, _limit, _start);
  }

  // @todo add comments
  function getFilteredOrders(
    address _manager,
    address _user,
    OrderStatus _status,
    uint256 _limit, // amount of items to get after start
    uint256 _offset
  ) public view returns (FilteredOrder[] memory) {
    // Ensure the limit does not exceed the maximum
    uint256 limit = (_limit > Const.MAX_FILTERED_ORDERS) ? Const.MAX_FILTERED_ORDERS : _limit;

    FilteredOrder[] memory result = new FilteredOrder[](limit);

    uint256 addedOrders = 0;
    for (uint256 orderId = 0; orderId < ordersCount && addedOrders < limit; orderId++) {
      if (
        (_manager == address(0) || order[orderId].manager == _manager) &&
        (_status == OrderStatus.None || status(orderId) == _status)
      ) {
        if (_offset > 0) _offset--;
        else {
          result[addedOrders] = FilteredOrder({
            id: orderId,
            manager: order[orderId].manager,
            status: status(orderId),
            maxGas: order[orderId].maxGas,
            executionPeriodStart: order[orderId].executionPeriodStart,
            executionPeriodDeadline: order[orderId].executionPeriodDeadline,
            executionWindow: order[orderId].executionWindow,
            isRevokable: order[orderId].isRevokable,
            reward: reward[orderId], // @dev type `Payment | GasPayment`
            gasCost: gasCost[orderId],
            guaranteeLocked: guarantee[orderId],
            availableGasHoldings: _user != address(0) ? balanceOf(_user, orderId) : 0
          });

          addedOrders++;
        }
      }
    }

    if (addedOrders < limit) {
      // @dev cut array size
      /// @solidity memory-safe-assembly
      assembly {
        mstore(result, addedOrders)
      }
    }

    return result;
  }

  // Function to calculate the total number of matching orders
  function totalMatchingOrdersCount(address _manager, OrderStatus _status) public view returns (uint256) {
    uint256 matchingCount = 0;
    for (uint256 orderId = 0; orderId < ordersCount; orderId++) {
      if (
        (_manager == address(0) || order[orderId].manager == _manager) &&
        (_status == OrderStatus.None || status(orderId) == _status)
      ) {
        matchingCount++;
      }
    }
    return matchingCount;
  }

  // @todo disallow approving gasTokens to yourself
  // @todo test what is the limit on the amount of orders to return value successfuly
  function getTotalBalance(address _user, address[] memory _holders) external view returns (uint256) {
    //@todo limit holders length
    uint256 totalGasBalance = 0;
    uint256 holdersAmount = _holders.length;
    for (uint256 orderId = 0; orderId < ordersCount; orderId++) {
      uint256 holdersAllowance = 0;

      for (uint256 i_holder = 0; i_holder < holdersAmount; i_holder++) {
        holdersAllowance += allowance(_holders[i_holder], orderId, _user);
      }
      totalGasBalance += balanceOf(_user, orderId) + holdersAllowance;
    }
    return totalGasBalance;
  }
}
