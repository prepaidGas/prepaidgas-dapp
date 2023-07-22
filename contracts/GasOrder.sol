// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title GasOrders
 * @notice This contract manages the deposit for Gas orders
 * @dev It is recomended to deploy the contract to the cheep network
 * @author SteMak, markfender
 */

contract GasOrders {
    using SafeERC20 for IERC20;

    enum OrderStatus {
        None,
        Pending, // waiting to be accepted
        Active, // somebody taken
        Revoked, // client revoked the execution request
        Fulfilled,
        Liquidated
    }
    struct Deposit {
        uint256 amount;
        address token;
    }

    struct Order {
        // @todo pack values
        // @dev `gasBalance` subtracts on every execution
        uint256 gasBalance; // amount of gas to be spend
        uint256 maxExecutionDealy; // time to process execution, after the execution request
        uint256 excecutionDeadline; // the latest possible execution time
        uint256 maxGasCost; // maximum Gas cost during the execution
        uint256 callsAmount; // amount of calls which might be executed
        OrderStatus currentStatus;
        address executor;
        address creator;
    }
    mapping(address => bool) public validators;

    // order id => order data
    mapping(uint256 => Order) public orders;
    // order id => executionCost
    mapping(uint256 => Deposit) public executionCost;

    // executor address => executor locked deposit
    mapping(uint256 => Deposit) public lockedDeposit;

    uint256 totalOrders;

    modifier onlyValidator(address _account) {
        // @todo rework to a set of validators
        if (validators[_account]) _;
    }

    constructor(address[] memory _listOfValidators) {
        for (uint256 i = 0; i < _listOfValidators.length; i++) {
            validators[_listOfValidators[i]] = true;
        }
    }

    // None -> Pending
    function createOrder(
        uint256 _gasToBuy,
        uint256 _maxExecutionDealy,
        uint256 _excecutionDeadline,
        uint256 _maxGasCost,
        uint256 _callsAmount,
        Deposit memory _executionCost,
        Deposit memory _executorLock
    ) public {
        // @todo add validations
        orders[totalOrders] = Order({
            gasBalance: _gasToBuy,
            maxExecutionDealy: _maxExecutionDealy,
            excecutionDeadline: _excecutionDeadline,
            maxGasCost: _maxGasCost,
            callsAmount: _callsAmount,
            currentStatus: OrderStatus.Pending,
            executor: address(0),
            creator: msg.sender
        });

        executionCost[totalOrders] = Deposit({
            token: _executionCost.token,
            amount: _executionCost.amount
        });
        lockedDeposit[totalOrders] = Deposit({
            token: _executorLock.token,
            amount: _executorLock.amount
        });
        totalOrders++;

        IERC20(_executionCost.token).safeTransferFrom(
            msg.sender,
            address(this),
            _executionCost.amount
        );

        //@todo emit event
    }

    // Pending -> Revoked
    function revokeOrder(uint256 _orderId) public {
        // @todo update error condition
        Order storage currentOrder = orders[_orderId];
        require(currentOrder.creator == msg.sender);
        require(currentOrder.currentStatus == OrderStatus.Pending);

        currentOrder.currentStatus = OrderStatus.Revoked;

        IERC20(executionCost[_orderId].token).safeTransferFrom(
            address(this),
            currentOrder.creator,
            executionCost[_orderId].amount
        );
    }

    // Pending -> Active
    function acceptOrder(uint256 _orderId) public {
        Order storage currentOrder = orders[_orderId];
        require(currentOrder.currentStatus == OrderStatus.Pending);

        IERC20(lockedDeposit[_orderId].token).safeTransferFrom(
            msg.sender,
            currentOrder.executor,
            lockedDeposit[_orderId].amount
        );

        currentOrder.executor = msg.sender;
    }

    // CALLBACKS
    function executionCallback(
        uint256 _orderId,
        address _currentExecutor
    ) public {
        // Active => Fulfilled
        if (_currentExecutor != orders[_orderId].executor) {
            // unlock executor balance
        }
    }
}
