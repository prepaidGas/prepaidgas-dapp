// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {Order, OrderStatus} from "../interfaces/IGasOrder.sol";

struct TokenDetails {
  address token;
  string name;
  string symbol;
  uint256 decimals;
}

struct FilteredOrder {
  uint256 id;
  Order order;
  OrderStatus status;
  uint256 gasBalance;
  Payment reward;
  GasPayment gasCost;
  GasPayment guarantee;
}

abstract contract GasOrderGetters {
  /// @dev The functions are required to be presented in the extended contract

  /// @notice gasOrder data
  function ordersCount() public returns (uint256);
  function order(uint256 id) public returns (Order);
  function reward(uint256 id) public returns (Payment);
  function gasCost(uint256 id) public returns (GasPayment);
  function guarantee(uint256 id) public returns (GasPayment);
  function executor(uint256 id) public returns (address);
  function status(uint256 id) public returns (OrderStatus);

  /// @notice ERC1155ish data
  function balanceOf(address account, uint256 id) public returns (address);
  function allowance(address holder, uint256 id, address spender) public returns (uint256);

  /// @notice over high tokens array length may cause function call failure
  function getTokensDetails(address[] memory tokens) external view returns (TokenDetails[] memory) {
    uint256 length = tokens.length;
    TokenDetails[] memory result = new TokenDetails[](length);

    for (uint256 i; i < length; i++) {
      // @todo utilise try functionality
      result[i] = TokenDetails({
        token: token,
        name: IERC20Metadata(token).name(),
        symbol: IERC20Metadata(token).symbol(),
        decimals: IERC20Metadata(token).decimals()
      });
    }

    return result;
  }

  /// @notice over high amount of orders may lead tot the function call failure
  /// @notice over high holders array length may cause function call failure
  /// @notice the holders array should not contain duplications or the user inside
  function getTotalBalance(address user, address[] memory holders) external view returns (uint256) {
    uint256 gasBalance = 0;
    uint256 allowances = holders.length;
    uint256 orders = ordersCount();

    for (uint256 id = 0; id < orders; id++) {
      uint256 allowed = 0;

      for (uint256 i = 0; i < allowances; i++) {
        allowed += allowance(holders[i], id, user);
      }

      gasBalance += balanceOf(user, id) + allowed;
    }

    return gasBalance;
  }

  /// @notice over high amount of orders may lead to the function call failure
  /// @notice zero manager address means any manager
  /// @notice none order status means any status
  function getMatchingOrdersCount(address manager, OrderStatus state) external view returns (uint256) {
    uint256 matching = 0;

    bool anyManager = manager == address(0);
    bool anyStatus = state == OrderStatus.None;

    for (uint256 id = 0; id < ordersCount; id++) {
      if ((anyManager || order(id).manager == manager) && (anyStatus || status(id) == state)) {
        matching++;
      }
    }

    return matching;
  }

  /// @notice over high limit value may cause function call failure
  /// @notice zero manager address means any manager
  /// @notice none order status means any status
  /// @notice zero user address means no user
  function getFilteredOrders(
    address manager,
    address user,
    OrderStatus state,
    uint256 limit,
    uint256 offset
  ) external view returns (FilteredOrder[] memory) {
    FilteredOrder[] memory result = new FilteredOrder[](limit);

    bool anyManager = manager == address(0);
    bool anyStatus = state == OrderStatus.None;
    bool noUser = user == address(0);

    uint256 length = 0;
    uint256 orders = ordersCount();

    for (uint256 id = 0; id < orders && length < limit; id++) {
      if ((anyManager || order(id).manager == _manager) && (anyStatus || status(id) == state)) {
        if (_offset > 0) {
          _offset--;
          continue;
        }

        result[length] = FilteredOrder({
          id: id,
          order: order(id),
          status: status(id),
          gasBalance: noUser ? 0 : balanceOf(user, orderId),
          reward: reward(id),
          gasCost: gasCost(id),
          guarantee: guarantee(id)
        });

        length++;
      }
    }

    if (length < limit) {
      /// @solidity memory-safe-assembly
      assembly {
        mstore(result, length)
      }
    }

    return result;
  }

  /// @notice over high ids array length may cause function call failure
  /// @notice zero user address means no user
  function getOrdersByIds(uint256[] calldata ids, address user) external view returns (FilteredOrder[] memory) {
    uint256 length = ids.length;
    FilteredOrder[] memory result = new FilteredOrder[](length);

    bool noUser = user == address(0);

    for (uint256 i = 0; i < length; i++) {
      uint256 id = ids[i];

      result[i] = FilteredOrder({
        id: id,
        order: order(id),
        status: status(id),
        gasBalance: noUser ? 0 : balanceOf(user, orderId),
        reward: reward(id),
        gasCost: gasCost(id),
        guarantee: guarantee(id)
      });
    }

    return result;
  }
}
