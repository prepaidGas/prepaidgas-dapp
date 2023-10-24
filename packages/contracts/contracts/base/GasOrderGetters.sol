// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./ERC1155ish.sol";
import "./GasOrderStateVariables.sol";
import "../common/Constants.sol";

import {Order, FilteredOrder, OrderStatus, TokenAmountWithDetails} from "../interfaces/IGasOrder.sol";

abstract contract GasOrderGetters is GasOrderStateVariables, ERC1155ish {
  /// Getters function
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
  // @todo verify the function and all the possible states

  function status(uint256 id) public view returns (OrderStatus) {
    if (order[id].manager == address(0)) return OrderStatus.None;
    else if (executor[id] != address(0)) {
      if (totalSupply(id) == 0) return OrderStatus.Closed;
      else if (order[id].executionPeriodDeadline <= block.timestamp) return OrderStatus.Inactive;
      else if (order[id].executionPeriodStart <= block.timestamp) return OrderStatus.Active;
      else return OrderStatus.Accepted;
    } else if (order[id].executionPeriodStart < block.timestamp) return OrderStatus.Untaken;
    else return OrderStatus.Pending;
  }

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
    uint256 limit = (_limit > MAX_FILTERED_ORDERS) ? MAX_FILTERED_ORDERS : _limit;

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
            availableGasHoldings: _user != address(0) ? balanceOf(_user, orderId) : 0,
            reward: TokenAmountWithDetails(
              IERC20Metadata(reward[orderId].token).name(),
              IERC20Metadata(reward[orderId].token).symbol(),
              IERC20Metadata(reward[orderId].token).decimals(),
              reward[orderId].token,
              reward[orderId].amount
            ),
            gasCost: TokenAmountWithDetails(
              IERC20Metadata(gasCost[orderId].token).name(),
              IERC20Metadata(gasCost[orderId].token).symbol(),
              IERC20Metadata(gasCost[orderId].token).decimals(),
              gasCost[orderId].token,
              gasCost[orderId].gasPrice
            ),
            guarantee: TokenAmountWithDetails(
              IERC20Metadata(guarantee[orderId].token).name(),
              IERC20Metadata(guarantee[orderId].token).symbol(),
              IERC20Metadata(guarantee[orderId].token).decimals(),
              guarantee[orderId].token,
              guarantee[orderId].gasPrice
            )
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

  function getOrdersById(uint256[] calldata ids, address _user) public view returns (FilteredOrder[] memory) {
    FilteredOrder[] memory result = new FilteredOrder[](ids.length);
    for (uint256 resultIndex = 0; resultIndex < ids.length; resultIndex++) {
      uint256 orderId = ids[resultIndex];
      result[resultIndex] = FilteredOrder({
        id: orderId,
        manager: order[orderId].manager,
        status: status(orderId),
        maxGas: order[orderId].maxGas,
        executionPeriodStart: order[orderId].executionPeriodStart,
        executionPeriodDeadline: order[orderId].executionPeriodDeadline,
        executionWindow: order[orderId].executionWindow,
        availableGasHoldings: _user != address(0) ? balanceOf(_user, orderId) : 0,
        reward: TokenAmountWithDetails(
          IERC20Metadata(reward[orderId].token).name(),
          IERC20Metadata(reward[orderId].token).symbol(),
          IERC20Metadata(reward[orderId].token).decimals(),
          reward[orderId].token,
          reward[orderId].amount
        ),
        gasCost: TokenAmountWithDetails(
          IERC20Metadata(gasCost[orderId].token).name(),
          IERC20Metadata(gasCost[orderId].token).symbol(),
          IERC20Metadata(gasCost[orderId].token).decimals(),
          gasCost[orderId].token,
          gasCost[orderId].gasPrice
        ),
        guarantee: TokenAmountWithDetails(
          IERC20Metadata(guarantee[orderId].token).name(),
          IERC20Metadata(guarantee[orderId].token).symbol(),
          IERC20Metadata(guarantee[orderId].token).decimals(),
          guarantee[orderId].token,
          guarantee[orderId].gasPrice
        )
      });
    }
    return result;
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
}
