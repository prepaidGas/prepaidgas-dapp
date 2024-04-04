// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import { Order, OrderStatus } from "../common/Order.sol";
import { Message, Resolution } from "../common/Message.sol";

import "../common/Constants.sol" as Const;
import "../common/Errors.sol" as Error;

contract GasOrder {
  uint256 public orders;

  mapping(uint256 id => Order config) internal _order;
  mapping(uint256 id => bool status) private _closed;

  mapping(uint256 id => address promisor) public executor;
  mapping(uint256 id => uint256 balance) public gasLeft;

  event OrderCreate(uint256 indexed id, uint256 end);
  event OrderWithdraw(uint256 indexed id);
  event OrderAccept(uint256 indexed id, address indexed executor);
  event OrderClose(uint256 indexed id, uint256 gas);

  modifier specificStatus(uint256 id, OrderStatus expected) {
    OrderStatus real = status(id);

    if (real != expected) revert Error.WrongOrderStatus(real, expected);
    _;
  }

  function gasOrder(uint256 id) external view returns (Order memory) {
    return _order[id];
  }

  function status(uint256 id) public view returns (OrderStatus) {
    if (_closed[id]) return OrderStatus.Closed;

    Order storage order = _order[id];

    if (order.gas == 0) return OrderStatus.None;

    if (executor[id] == address(0x0)) {
      if (order.expire <= block.timestamp) return OrderStatus.Untaken;
      return OrderStatus.Pending;
    }

    uint256 left = gasLeft[id];
    if (left == 0) return OrderStatus.Closed;

    if (order.end + order.redeemWindow < block.timestamp) return OrderStatus.Inactive;
    if (order.start <= block.timestamp) return OrderStatus.Active;

    return OrderStatus.Accepted;
  }

  function orderCreate(Order calldata order) public virtual returns (uint256 id) {
    if (order.gas < Const.MIN_GAS) revert Error.BelowMin(order.gas, Const.MIN_GAS);

    if (order.end <= order.start) revert Error.BadOrderStartEnd(order.start, order.end);
    if (order.end <= order.expire) revert Error.BadOrderExpireEnd(order.expire, order.end);

    if (order.expire <= block.timestamp) revert Error.BadOrderNowExpire(block.timestamp, order.expire);
    if (order.expire - block.timestamp > Const.MAX_PENDING)
      revert Error.BadOrderNowExpire(block.timestamp, order.expire);

    if (order.start <= block.timestamp && order.start != 0) revert Error.BadOrderNowStart(block.timestamp, order.start);

    if (order.txWindow < Const.MIN_TX_WINDOW) revert Error.BelowMin(order.txWindow, Const.MIN_TX_WINDOW);
    if (order.redeemWindow > Const.MAX_REDEEM_WINDOW)
      revert Error.ExceedMax(order.redeemWindow, Const.MAX_REDEEM_WINDOW);

    id = orders++;
    _order[id] = order;

    if (order.start == 0) _order[id].start = block.timestamp;

    emit OrderCreate(id, order.end);
  }

  function orderWithdraw(uint256 id) public virtual specificStatus(id, OrderStatus.Untaken) {
    _closed[id] = true;

    emit OrderWithdraw(id);
  }

  function orderAccept(uint256 id, address promisor) public virtual specificStatus(id, OrderStatus.Pending) {
    executor[id] = promisor;
    gasLeft[id] = _order[id].gas;

    emit OrderAccept(id, promisor);
  }

  function orderClose(uint256 id) public virtual specificStatus(id, OrderStatus.Inactive) {
    _closed[id] = true;

    emit OrderClose(id, gasLeft[id]);
  }

  function _reportExecution(
    Message calldata message,
    address /* fulfiller */,
    uint256 gasSpent,
    Resolution resolution
  ) internal virtual specificStatus(message.order, OrderStatus.Active) {
    uint256 id = message.order;
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    if (order.manager != message.from) revert Error.Unauthorized(message.from, order.manager);
    if (message.gas > left) revert Error.BalanceExhausted(message.gas, left);

    if (message.deadline > order.end) revert Error.ExceedMax(message.deadline, order.end);
    if (message.deadline - 2 * order.txWindow < order.start)
      revert Error.BelowMin(message.deadline - 2 * order.txWindow, order.start);

    if (resolution == Resolution.Execute) {
      uint256 start = message.deadline - 2 * order.txWindow;
      uint256 end = message.deadline - order.txWindow;
      if (start > block.timestamp) revert Error.WindowNotOpen(block.timestamp, start);
      if (end < block.timestamp) revert Error.WindowClosed(block.timestamp, end);
    } else if (resolution == Resolution.Liquidate) {
      uint256 start = message.deadline - order.txWindow;
      uint256 end = message.deadline;
      if (start >= block.timestamp) revert Error.WindowNotOpen(block.timestamp, start + 1);
      if (end < block.timestamp) revert Error.WindowClosed(block.timestamp, end);
    } else if (resolution == Resolution.Redeem) {
      uint256 start = message.deadline;
      uint256 end = message.deadline + order.redeemWindow;
      if (start >= block.timestamp) revert Error.WindowNotOpen(block.timestamp, start + 1);
      if (end < block.timestamp) revert Error.WindowClosed(block.timestamp, end);
    }

    gasLeft[id] -= gasSpent;
  }
}
