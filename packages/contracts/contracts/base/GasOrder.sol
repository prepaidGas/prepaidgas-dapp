// SPDX-License-Identifier: GPL-3.0-only

pragma solidity 0.8.25;

import { GasPayment, Payment, Order, OrderStatus } from "../common/Order.sol";
import { Message } from "../common/Message.sol";

import "../common/Constants.sol" as Const;

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

    if (real != expected) revert();
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

    if (order.end <= block.timestamp) return OrderStatus.Inactive;
    if (order.start <= block.timestamp) return OrderStatus.Active;

    return OrderStatus.Accepted;
  }

  function orderCreate(Order calldata order) public virtual returns (uint256 id) {
    if (order.gas == 0) revert();

    if (order.end <= order.start) revert();
    if (order.end <= order.expire) revert();

    if (order.expire <= block.timestamp) revert();
    if (order.expire - block.timestamp > Const.MAX_PENDING) revert();

    if (order.start <= block.timestamp && order.start != 0) revert();

    if (order.txWindow < Const.MIN_TX_WINDOW) revert();
    if (order.redeemWindow > Const.MAX_REDEEM_WINDOW) revert();

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
    Order storage order = _order[id];

    if (order.end + order.redeemWindow >= block.timestamp) revert();

    _closed[id] = true;

    emit OrderClose(id, gasLeft[id]);
  }

  function _reportExecution(
    Message calldata message,
    address /* fulfiller */,
    uint256 gasSpent
  ) internal virtual specificStatus(message.order, OrderStatus.Active) {
    uint256 id = message.order;
    Order storage order = _order[id];
    uint256 left = gasLeft[id];

    if (order.manager != message.from) revert();
    if (message.gas > left) revert();

    gasLeft[id] -= gasSpent;
  }
}
