// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {ERC1155ish} from "./ERC1155ish.sol";

import {GasPayment, Order, OrderStatus, Payment} from "../interfaces/IGasOrder.sol";

import "./../common/Errors.sol";
import "./../common/Constants.sol";

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
  uint256 gasBalance;
  Payment reward;
  GasPayment gasCost;
  GasPayment guarantee;
}

abstract contract GasOrderGetters is ERC1155ish {
  /// @dev modifiers
  // @todo move events to a separate file, probably to interface
  modifier executionCallback() {
    if (execution() != msg.sender) revert Unauthorized(msg.sender, execution());
    _;
  }

  modifier deadlineNotMet(uint256 deadline) {
    if (deadline <= block.timestamp) revert DeadlineExpired(block.timestamp, deadline);
    _;
  }

  modifier possibleExecutionWindow(uint256 window) {
    if (window < MIN_EXEC_WINDOW) revert UnderflowValue(window, MIN_EXEC_WINDOW);
    _;
  }

  modifier specificStatus(uint256 id, OrderStatus expected) {
    OrderStatus real = status(id);

    if (real != expected) revert WrongOrderStatus(real, expected);
    _;
  }

  /// @dev The functions are required to be presented in the extended contract

  /// @notice ERC1155 custom
  //function usable(address, uint256, address) public view virtual returns (uint256);

  /// @notice gasOrder data
  function ordersCount() public view virtual returns (uint256);

  function order(uint256) public view virtual returns (Order memory);

  function reward(uint256) public view virtual returns (Payment memory);

  function gasCost(uint256) public view virtual returns (GasPayment memory);

  function guarantee(uint256) public view virtual returns (GasPayment memory);

  function executor(uint256) public view virtual returns (address);

  function execution() public view virtual returns (address);

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
    if (order(id).manager == address(0)) return OrderStatus.None;
    else if (executor(id) != address(0)) {
      if (totalSupply(id) == 0) return OrderStatus.Closed;
      else if (order(id).executionPeriodDeadline <= block.timestamp) return OrderStatus.Inactive;
      else if (order(id).executionPeriodStart <= block.timestamp) return OrderStatus.Active;
      else return OrderStatus.Accepted;
    } else if (order(id).executionPeriodStart < block.timestamp) return OrderStatus.Untaken;
    else return OrderStatus.Pending;
  }

  /// @notice over high tokens array length may cause function call failure
  function getTokensDetails(address[] memory tokens) external view returns (TokenDetails[] memory) {
    uint256 length = tokens.length;
    TokenDetails[] memory result = new TokenDetails[](length);

    for (uint256 i; i < length; i++) {
      result[i] = getTokenDetails(tokens[i]);
    }

    return result;
  }

  function getTokenDetails(address token) public view returns (TokenDetails memory) {
    TokenDetails memory details = TokenDetails({
      token: token,
      name: "",
      symbol: "",
      decimals: 0,
      broken : 0
    });
    IERC20Metadata meta = IERC20Metadata(token);

    try meta.name() returns (string memory name)  {
      details.name = name;
    } catch { details.broken += 1; }
    try meta.symbol() returns (string memory symbol)  {
      details.symbol = symbol;
    } catch { details.broken += 2; }
    try meta.decimals() returns (uint8 decimals)  {
      details.decimals = decimals;
    } catch { details.broken += 4; }

    return details;
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
    uint256 orders = ordersCount();

    for (uint256 id = 0; id < orders; id++) {
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
      if ((anyManager || order(id).manager == manager) && (anyStatus || status(id) == state)) {
        if (offset > 0) {
          offset--;
          continue;
        }

        result[length] = FilteredOrder({
          id: id,
          order: order(id),
          status: status(id),
          gasBalance: noUser ? 0 : balanceOf(user, id),
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
        gasBalance: noUser ? 0 : balanceOf(user, id),
        reward: reward(id),
        gasCost: gasCost(id),
        guarantee: guarantee(id)
      });
    }

    return result;
  }
}
