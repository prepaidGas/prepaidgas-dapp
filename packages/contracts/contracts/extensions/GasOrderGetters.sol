// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import { GasOrder } from "../base/GasOrder.sol";
import { Order, OrderStatus } from "../common/Order.sol";

struct TokenDetails {
  address token;
  string name;
  string symbol;
  uint8 decimals;
  uint8 broken;
}

struct FilteredOrder {
  uint256 id;
  Order order;
  OrderStatus status;
  uint256 gasLeft;
  address executor;
}

contract GasOrderGetters is GasOrder {
  /// @notice over high tokens array length may cause function call failure
  function getTokensDetails(address[] calldata tokens) external view returns (TokenDetails[] memory) {
    uint256 length = tokens.length;

    TokenDetails[] memory result = new TokenDetails[](length);

    for (uint256 i; i < length; i++) {
      result[i] = getTokenDetails(tokens[i]);
    }

    return result;
  }

  function getTokenDetails(address token) public view returns (TokenDetails memory) {
    TokenDetails memory details = TokenDetails(token, "", "", 0, 0);
    IERC20Metadata meta = IERC20Metadata(token);

    try meta.name() returns (string memory name) {
      details.name = name;
    } catch {
      details.broken += 1;
    }
    try meta.symbol() returns (string memory symbol) {
      details.symbol = symbol;
    } catch {
      details.broken += 2;
    }
    try meta.decimals() returns (uint8 decimals) {
      details.decimals = decimals;
    } catch {
      details.broken += 4;
    }

    return details;
  }

  /// @notice over high amount of orders may lead to the function call failure
  /// @notice over high users array length may cause function call failure
  function getTotalBalances(address[] calldata users) external view returns (uint256[] memory) {
    uint256 length = users.length;
    uint256[] memory balances = new uint256[](users.length);

    uint256 all = orders;
    for (uint256 id = 0; id < all; id++) {
      uint256 left = gasLeft[id];

      for (uint256 i = 0; i < length; i++) {
        if (_order[id].manager == users[i] && status(id) == OrderStatus.Active) {
          balances[i] += left;
          break;
        }
      }
    }

    return balances;
  }

  /// @notice over high amount of orders may lead to the function call failure
  function getTotalBalance(address user) external view returns (uint256) {
    uint256 balance;

    uint256 all = orders;
    for (uint256 id = 0; id < all; id++) {
      if (_order[id].manager == user) balance += gasLeft[id];
    }

    return balance;
  }

  /// @notice over high amount of orders may lead to the function call failure
  /// @notice zero manager address means any manager
  /// @notice none order status means any status
  function getManagerOrdersCount(address manager, OrderStatus state) external view returns (uint256) {
    uint256 matching = 0;

    bool anyManager = manager == address(0);
    bool anyStatus = state == OrderStatus.None;

    uint256 all = orders;
    for (uint256 id = 0; id < all; id++) {
      if ((anyManager || _order[id].manager == manager) && (anyStatus || status(id) == state)) {
        matching++;
      }
    }

    return matching;
  }

  /// @notice over high limit value may cause function call failure
  /// @notice zero manager address means any manager
  /// @notice none order status means any status
  function getManagerOrders(
    address manager,
    OrderStatus state,
    uint256 limit,
    uint256 offset
  ) external view returns (FilteredOrder[] memory) {
    FilteredOrder[] memory filtered = new FilteredOrder[](limit);

    bool anyManager = manager == address(0);
    bool anyStatus = state == OrderStatus.None;

    uint256 length = 0;
    uint256 all = orders;

    for (uint256 id = 0; id < all && length < limit; id++) {
      if ((anyManager || _order[id].manager == manager) && (anyStatus || status(id) == state)) {
        if (offset > 0) {
          offset--;
          continue;
        }

        filtered[length] = FilteredOrder(id, _order[id], status(id), gasLeft[id], executor[id]);
        length++;
      }
    }

    if (length < limit) {
      /// @solidity memory-safe-assembly
      assembly {
        mstore(filtered, length)
      }
    }

    return filtered;
  }

  /// @notice over high limit value may cause function call failure
  /// @notice zero promisor address means any executor
  /// @notice true only live parameter means pending or active order status
  function getExecutorOrders(
    address promisor,
    bool onlyLive,
    uint256 limit,
    uint256 offset
  ) external view returns (FilteredOrder[] memory) {
    FilteredOrder[] memory filtered = new FilteredOrder[](limit);

    bool anyPromisor = promisor == address(0);

    uint256 length = 0;
    uint256 all = orders;

    for (uint256 id = 0; id < all && length < limit; id++) {
      OrderStatus state = status(id);
      if (
        (anyPromisor || executor[id] == promisor) &&
        (!onlyLive || state == OrderStatus.Accepted || state == OrderStatus.Active)
      ) {
        if (offset > 0) {
          offset--;
          continue;
        }

        filtered[length] = FilteredOrder(id, _order[id], state, gasLeft[id], executor[id]);
        length++;
      }
    }

    if (length < limit) {
      /// @solidity memory-safe-assembly
      assembly {
        mstore(filtered, length)
      }
    }

    return filtered;
  }

  /// @notice over high ids array length may cause function call failure
  function getOrdersByIds(uint256[] calldata ids) external view returns (FilteredOrder[] memory) {
    uint256 length = ids.length;
    FilteredOrder[] memory filtered = new FilteredOrder[](length);

    for (uint256 i = 0; i < length; i++) {
      uint256 id = ids[i];

      filtered[i] = FilteredOrder(id, _order[id], status(id), gasLeft[id], executor[id]);
    }

    return filtered;
  }
}
