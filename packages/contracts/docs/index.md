# Solidity API

## PrepaidGas

### treasury

```solidity
address treasury
```

### onlyTreasury

```solidity
modifier onlyTreasury()
```

### constructor

```solidity
constructor(address relayer, address admin, string name, string version) public
```

### orderCreate

```solidity
function orderCreate(struct Order order) public returns (uint256 id)
```

### orderWithdraw

```solidity
function orderWithdraw(uint256 id) public
```

### orderAccept

```solidity
function orderAccept(uint256 id, address promisor) public
```

### orderClose

```solidity
function orderClose(uint256 id) public
```

### claim

```solidity
function claim(address holder, address token, uint256 amount) external
```

### claimFee

```solidity
function claimFee(address[] receivers, address[] tokens, uint256[] amounts, address requestor) public
```

### _reportExecution

```solidity
function _reportExecution(struct Message message, address fulfiller, uint256 gasSpent, enum Resolution resolution) internal
```

### _takeFee

```solidity
function _takeFee(enum Fee id, address token, uint256 amount) internal returns (uint256)
```

## Treasury

### pgas

```solidity
contract PrepaidGas pgas
```

### constructor

```solidity
constructor(contract PrepaidGas target) public
```

### orderCreate

```solidity
function orderCreate(struct Order order) external returns (uint256 id)
```

### orderWithdraw

```solidity
function orderWithdraw(uint256 id) external
```

### orderAccept

```solidity
function orderAccept(uint256 id) external
```

### claim

```solidity
function claim(address token, uint256 amount) external
```

### claimFee

```solidity
function claimFee(address[] receivers, address[] tokens, uint256[] amounts) external
```

### _acceptIncoming

```solidity
function _acceptIncoming(address token, address from, uint256 amount) internal
```

## Executor

### nonce

```solidity
mapping(address => mapping(uint256 => bool)) nonce
```

### Execution

```solidity
event Execution(address signer, uint256 nonce, uint256 order, bool status, bytes result, uint256 timestamp, address executor, enum Resolution resolution)
```

### useNonce

```solidity
modifier useNonce(address signer, uint256 id)
```

### checkValidations

```solidity
modifier checkValidations(struct Message message, bytes[] validations)
```

### checkSignature

```solidity
modifier checkSignature(struct Message message, bytes signature)
```

### execute

```solidity
function execute(struct Message message, bytes signature) external
```

### liquidate

```solidity
function liquidate(struct Message message, bytes signature, bytes[] validations) external
```

### redeem

```solidity
function redeem(struct Message message, bytes signature, bytes[] validations) external
```

### _reportExecution

```solidity
function _reportExecution(struct Message, address, uint256, enum Resolution) internal virtual
```

## GasOrder

### orders

```solidity
uint256 orders
```

### _order

```solidity
mapping(uint256 => struct Order) _order
```

### executor

```solidity
mapping(uint256 => address) executor
```

### gasLeft

```solidity
mapping(uint256 => uint256) gasLeft
```

### OrderCreate

```solidity
event OrderCreate(uint256 id, uint256 end)
```

### OrderWithdraw

```solidity
event OrderWithdraw(uint256 id)
```

### OrderAccept

```solidity
event OrderAccept(uint256 id, address executor)
```

### OrderClose

```solidity
event OrderClose(uint256 id, uint256 gas)
```

### specificStatus

```solidity
modifier specificStatus(uint256 id, enum OrderStatus expected)
```

### gasOrder

```solidity
function gasOrder(uint256 id) external view returns (struct Order)
```

### status

```solidity
function status(uint256 id) public view returns (enum OrderStatus)
```

### orderCreate

```solidity
function orderCreate(struct Order order) public virtual returns (uint256 id)
```

### orderWithdraw

```solidity
function orderWithdraw(uint256 id) public virtual
```

### orderAccept

```solidity
function orderAccept(uint256 id, address promisor) public virtual
```

### orderClose

```solidity
function orderClose(uint256 id) public virtual
```

### _reportExecution

```solidity
function _reportExecution(struct Message message, address, uint256 gasSpent, enum Resolution resolution) internal virtual
```

## DENOM

```solidity
uint256 DENOM
```

## MAX_FEE

```solidity
uint256 MAX_FEE
```

## TREASURY

```solidity
address TREASURY
```

## MAX_RETURNDATA

```solidity
uint256 MAX_RETURNDATA
```

## INFRASTRUCTURE_GAS

```solidity
uint256 INFRASTRUCTURE_GAS
```

## MIN_VALIDATIONS

```solidity
uint256 MIN_VALIDATIONS
```

## MIN_TX_WINDOW

```solidity
uint256 MIN_TX_WINDOW
```

## MAX_REDEEM_WINDOW

```solidity
uint256 MAX_REDEEM_WINDOW
```

## MAX_PENDING

```solidity
uint256 MAX_PENDING
```

## MIN_GAS

```solidity
uint256 MIN_GAS
```

## Unauthorized

```solidity
error Unauthorized(address received, address expected)
```

## UnexpectedRecovered

```solidity
error UnexpectedRecovered(address recovered, address expected)
```

## UnknownRecovered

```solidity
error UnknownRecovered(address recovered)
```

## IncorrectSignatureOrder

```solidity
error IncorrectSignatureOrder(address lower, address higher)
```

## FewValidations

```solidity
error FewValidations(uint256 value, uint256 min)
```

## BelowMin

```solidity
error BelowMin(uint256 value, uint256 min)
```

## ExceedMax

```solidity
error ExceedMax(uint256 value, uint256 max)
```

## BadOrderNowExpire

```solidity
error BadOrderNowExpire(uint256 time, uint256 expire)
```

## BadOrderStartEnd

```solidity
error BadOrderStartEnd(uint256 start, uint256 end)
```

## BadOrderExpireEnd

```solidity
error BadOrderExpireEnd(uint256 expire, uint256 end)
```

## BadOrderNowStart

```solidity
error BadOrderNowStart(uint256 time, uint256 start)
```

## NonceExhausted

```solidity
error NonceExhausted(address signer, uint256 id)
```

## BalanceExhausted

```solidity
error BalanceExhausted(uint256 requested, uint256 allowed)
```

## WindowNotOpen

```solidity
error WindowNotOpen(uint256 time, uint256 start)
```

## WindowClosed

```solidity
error WindowClosed(uint256 time, uint256 end)
```

## WrongOrderStatus

```solidity
error WrongOrderStatus(enum OrderStatus received, enum OrderStatus expected)
```

## BadIncomeTransfer

```solidity
error BadIncomeTransfer(uint256 received, uint256 expected)
```

## Resolution

```solidity
enum Resolution {
  Execute,
  Liquidate,
  Redeem
}
```

## Message

```solidity
struct Message {
  address from;
  uint256 nonce;
  uint256 order;
  uint256 start;
  address to;
  uint256 gas;
  bytes data;
}
```

## MESSAGE_TYPE_HASH

```solidity
bytes32 MESSAGE_TYPE_HASH
```

## MessageHash

### domainSeparator

```solidity
function domainSeparator() external view returns (bytes32)
```

### messageHash

```solidity
function messageHash(struct Message message) public view returns (bytes32)
```

## GasPayment

```solidity
struct GasPayment {
  address token;
  uint256 perUnit;
}
```

## Order

```solidity
struct Order {
  address manager;
  uint256 gas;
  uint256 expire;
  uint256 start;
  uint256 end;
  uint256 txWindow;
  uint256 redeemWindow;
  struct GasPayment gasPrice;
  struct GasPayment gasGuarantee;
}
```

## OrderStatus

```solidity
enum OrderStatus {
  None,
  Pending,
  Accepted,
  Active,
  Inactive,
  Untaken,
  Closed
}
```

## TokenDetails

```solidity
struct TokenDetails {
  address token;
  string name;
  string symbol;
  uint8 decimals;
  uint8 broken;
}
```

## FilteredOrder

```solidity
struct FilteredOrder {
  uint256 id;
  struct Order order;
  enum OrderStatus status;
  uint256 gasLeft;
  address executor;
}
```

## GasOrderGetters

### getTokensDetails

```solidity
function getTokensDetails(address[] tokens) external view returns (struct TokenDetails[])
```

over high tokens array length may cause function call failure

### getTokenDetails

```solidity
function getTokenDetails(address token) public view returns (struct TokenDetails)
```

### getTotalBalances

```solidity
function getTotalBalances(address[] users) external view returns (uint256[])
```

over high amount of orders may lead to the function call failure
over high users array length may cause function call failure

### getTotalBalance

```solidity
function getTotalBalance(address user) external view returns (uint256)
```

over high amount of orders may lead to the function call failure

### getMatchingOrdersCount

```solidity
function getMatchingOrdersCount(address manager, enum OrderStatus state) external view returns (uint256)
```

over high amount of orders may lead to the function call failure
zero manager address means any manager
none order status means any status

### getFilteredOrders

```solidity
function getFilteredOrders(address manager, enum OrderStatus state, uint256 limit, uint256 offset) external view returns (struct FilteredOrder[])
```

over high limit value may cause function call failure
zero manager address means any manager
none order status means any status

### getOrdersByIds

```solidity
function getOrdersByIds(uint256[] ids) external view returns (struct FilteredOrder[])
```

over high ids array length may cause function call failure

## Validation

```solidity
enum Validation {
  None,
  StartInFuture,
  NonceExhaustion,
  OrderBalanceCompliance,
  OrderOwnerCompliance,
  OrderTimelineCompliance
}
```

## MessageValidations

### messageValidate

```solidity
function messageValidate(struct Message message) external view returns (enum Validation)
```

### _reportExecution

```solidity
function _reportExecution(struct Message message, address fulfiller, uint256 gasSpent, enum Resolution resolution) internal virtual
```

## MockEndpoint

### number

```solidity
uint256 number
```

### store

```solidity
function store(uint256 num) public
```

### retrieve

```solidity
function retrieve() public view returns (uint256)
```

## MockFallback

### fallback

```solidity
fallback() external
```

## MockToken

### fee

```solidity
uint256 fee
```

### constructor

```solidity
constructor(string mockName, string mockSymbol) public
```

### mint

```solidity
function mint(address recipient, uint256 value) external
```

### burn

```solidity
function burn(address target, uint256 value) external
```

### setFee

```solidity
function setFee(uint256 value) external
```

### _update

```solidity
function _update(address from, address to, uint256 value) internal
```

_Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`
(or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding
this function.

Emits a {Transfer} event._

## Distributor

### claimable

```solidity
mapping(address => mapping(address => uint256)) claimable
```

### Distribute

```solidity
event Distribute(address receiver, address token, uint256 amount)
```

### Claim

```solidity
event Claim(address holder, address token, uint256 amount)
```

### _claim

```solidity
function _claim(address holder, address token, uint256 amount) internal
```

### _distribute

```solidity
function _distribute(address holder, address token, uint256 amount) internal
```

## Fee

```solidity
enum Fee {
  LiquidateGuarantee,
  RedeemGuarantee,
  UnspentPrice
}
```

## FeeProcessor

### fee

```solidity
mapping(enum Fee => uint256) fee
```

### UpdateProtocolFee

```solidity
event UpdateProtocolFee(enum Fee fee, uint256 old, uint256 current)
```

### setFee

```solidity
function setFee(enum Fee id, uint256 value) public
```

### claimFee

```solidity
function claimFee(address[], address[], uint256[], address requestor) public virtual
```

### _takeFee

```solidity
function _takeFee(enum Fee id, address, uint256 amount) internal virtual returns (uint256)
```

## Validators

### validatorThreshold

```solidity
uint256 validatorThreshold
```

### isValidator

```solidity
mapping(address => bool) isValidator
```

### UpdateValidatorThreshold

```solidity
event UpdateValidatorThreshold(uint256 old, uint256 current)
```

### UpdateValidatorStatus

```solidity
event UpdateValidatorStatus(address validator, bool old, bool current)
```

### setValidatorThreshold

```solidity
function setValidatorThreshold(uint256 value) external
```

### setValidatorStatus

```solidity
function setValidatorStatus(address validator, bool status) external
```

## GasOrder

This contract manages the deposit for Gas orders

_It is recommended to deploy the contract to the cheep network_

### constructor

```solidity
constructor(string name, string version, string link) public
```

### createOrder

```solidity
function createOrder(uint256 maxGas, uint256 executionPeriodStart, uint256 executionPeriodDeadline, uint256 executionWindow, struct Payment rewardValue, struct GasPayment gasCostValue, struct GasPayment guaranteeValue, uint256 rewardTransfer, uint256 gasCostTransfer) external returns (uint256)
```

_Creates an order with specified parameters._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxGas | uint256 | The amount of Gas to book for future calls executions. |
| executionPeriodStart | uint256 | The start of the period when execution is possible. |
| executionPeriodDeadline | uint256 | The last possible timestamp for execution. |
| executionWindow | uint256 | The execution window duration specified as the number of blocks. |
| rewardValue | struct Payment | The reward payment details. |
| gasCostValue | struct GasPayment | The cost of one Gas uint. |
| guaranteeValue | struct GasPayment | The guarantee payment details. |
| rewardTransfer | uint256 | The the reward transfer amount, it is needed to verify the amount of tokens which should be transfered to the contract in order to support fee on transfer tokens. |
| gasCostTransfer | uint256 | The gas cost transfer amount, it is needed to verify the total amount of tokens which should be transfered to the contract in order to support fee on transfer tokens. This function creates an order with the specified parameters. It ensures the validity of the order parameters and initializes the order's details. |

### acceptOrder

```solidity
function acceptOrder(uint256 id, uint256 guaranteeTransfer) external
```

_Accepts an order by an executor._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | The ID of the order. |
| guaranteeTransfer | uint256 | The guarantee transfer amount, it is needed to verify the amount of tokens which should be transfered to the contract in order to support fee on transfer tokens. This function accepts an order by an executor, transferring the necessary guarantees and rewards to the contract and updating the order's status. |

### retrieveGasCost

```solidity
function retrieveGasCost(address holder, uint256 id, uint256 amount) external
```

_Retrieves prepaid tokens form the order._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| holder | address | The address of the Gas holder. |
| id | uint256 | The ID of the order. |
| amount | uint256 | The amount of gas tokens to retrieve. This function decreses the amout of Gas tokens in the order and repays the tokens ot the holder. |

### retrieveGuarantee

```solidity
function retrieveGuarantee(uint256 id) external
```

_Retrieves guarantees from an order._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | The ID of the order. This function retrieves guarantees from an order and distributes them to the executor after order is finally fulfilled. |

### revokeOrder

```solidity
function revokeOrder(uint256 id) external
```

_Revokes an order if it is pending or untaken._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | The ID of the order. This function allows the manager to revoke an order if it is not accepted by any Executor. It returns rewards to the order manager. |

### _reportExecution

```solidity
function _reportExecution(struct Message message, address fulfiller, uint256 gasSpent, uint256 infrastructureGas) internal
```

_Verifies the execution of the order and updates the balance._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | struct Message | The transaction message data. |
| fulfiller | address | The fulfiller's address (executor or liquidator). |
| gasSpent | uint256 | The amount of Gas spent during execution. |
| infrastructureGas | uint256 | The Gas expences for the infrastracture call. This function verifies the execution of an order and handles gas costs, rewards, and guarantees. |

### transferOrderManagement

```solidity
function transferOrderManagement(uint256 _orderId, address _newManager) external
```

_Order management transfer_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _orderId | uint256 | The ID of the order which management should be transfered. |
| _newManager | address | The addres to which order is trying to be transfered. |

### ordersCount

```solidity
function ordersCount() public view returns (uint256)
```

gasOrder data

### order

```solidity
function order(uint256 id) public view returns (struct Order)
```

### reward

```solidity
function reward(uint256 id) public view returns (struct Payment)
```

### gasCost

```solidity
function gasCost(uint256 id) public view returns (struct GasPayment)
```

### guarantee

```solidity
function guarantee(uint256 id) public view returns (struct GasPayment)
```

### executor

```solidity
function executor(uint256 id) public view returns (address)
```

### execute

```solidity
function execute(struct Message message, bytes signature) external
```

_Executes the actions specified in the message._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | struct Message | The message to execute with the platform metadata. |
| signature | bytes | The senders signature of the message. This function verifies the validity of executing the message and performs the actions. After execution the registered executor will be rewarded. |

### liquidate

```solidity
function liquidate(struct Message message, bytes signature) external
```

_Initiates the liquidation process._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | struct Message | The message to execute with the platform metadata. |
| signature | bytes | The senders signature of the message. This function verifies the validity of liquidation and performs the necessary actions. After execution the liquidator will be rewarded. |

### liquidateWithoutExecution

```solidity
function liquidateWithoutExecution(struct Message message) external
```

## ERC1155ish

### Approval

```solidity
event Approval(address holder, uint256 id, address spender, uint256 amount)
```

### UpdateLock

```solidity
event UpdateLock(address holder, uint256 id, uint256 amount)
```

### URI

```solidity
event URI(string value)
```

### constructor

```solidity
constructor(string link) internal
```

### setURI

```solidity
function setURI(string link) external
```

### increaseAllowance

```solidity
function increaseAllowance(uint256 id, address spender, uint256 addedValue) external
```

### decreaseAllowance

```solidity
function decreaseAllowance(uint256 id, address spender, uint256 subtractedValue) external
```

### approve

```solidity
function approve(uint256 id, address spender, uint256 amount) external
```

### usable

```solidity
function usable(address holder, uint256 id, address spender) public view returns (uint256)
```

### allowance

```solidity
function allowance(address holder, uint256 id, address spender) public view returns (uint256)
```

### isApprovedForAll

```solidity
function isApprovedForAll(address holder, address spender) public view returns (bool)
```

### _mint

```solidity
function _mint(address holder, uint256 id, uint256 amount) internal
```

### _utilizeAllowance

```solidity
function _utilizeAllowance(address holder, uint256 id, address spender, uint256 amount) internal
```

### _utilizeOperator

```solidity
function _utilizeOperator(address holder, uint256 id, address spender, uint256 amount) internal
```

### totalLock

```solidity
function totalLock(address holder, uint256 id) public view returns (uint256)
```

### _increaseLock

```solidity
function _increaseLock(address holder, uint256 id, uint256 value) internal
```

### _decreaseLock

```solidity
function _decreaseLock(address holder, uint256 id, uint256 value) internal
```

### balanceAvailable

```solidity
function balanceAvailable(address holder, uint256 id) public view returns (uint256)
```

### _update

```solidity
function _update(address holder, address receiver, uint256[] ids, uint256[] values) internal
```

## TokenDetails

```solidity
struct TokenDetails {
  address token;
  string name;
  string symbol;
  uint8 decimals;
  uint8 broken;
}
```

## FilteredOrder

```solidity
struct FilteredOrder {
  uint256 id;
  struct Order order;
  enum OrderStatus status;
  uint256 gasBalance;
  struct Payment reward;
  struct GasPayment gasCost;
  struct GasPayment guarantee;
}
```

## GasOrderGetters

### deadlineMet

```solidity
modifier deadlineMet(uint256 deadline)
```

_modifiers_

### deadlineNotMet

```solidity
modifier deadlineNotMet(uint256 deadline)
```

### possibleExecutionWindow

```solidity
modifier possibleExecutionWindow(uint256 window)
```

### specificStatus

```solidity
modifier specificStatus(uint256 id, enum OrderStatus expected)
```

### ordersCount

```solidity
function ordersCount() public view virtual returns (uint256)
```

gasOrder data

### order

```solidity
function order(uint256) public view virtual returns (struct Order)
```

### reward

```solidity
function reward(uint256) public view virtual returns (struct Payment)
```

### gasCost

```solidity
function gasCost(uint256) public view virtual returns (struct GasPayment)
```

### guarantee

```solidity
function guarantee(uint256) public view virtual returns (struct GasPayment)
```

### executor

```solidity
function executor(uint256) public view virtual returns (address)
```

### status

```solidity
function status(uint256 id) public view returns (enum OrderStatus)
```

_Gets the current status of an order with the given ID._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | uint256 | The ID of the order. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum OrderStatus | status The current status of the order. This function returns the current status of an order based on various conditions such as the executor, execution deadlines, and more. It provides insight into the state of the order. |

### getTokensDetails

```solidity
function getTokensDetails(address[] tokens) external view returns (struct TokenDetails[])
```

over high tokens array length may cause function call failure

### getTokenDetails

```solidity
function getTokenDetails(address token) public view returns (struct TokenDetails)
```

### getTotalBalance

```solidity
function getTotalBalance(address user, address[] holders) external view returns (uint256)
```

over high amount of orders may lead tot the function call failure
over high holders array length may cause function call failure
the holders array should not contain duplications or the user inside

### getMatchingOrdersCount

```solidity
function getMatchingOrdersCount(address manager, enum OrderStatus state) external view returns (uint256)
```

over high amount of orders may lead to the function call failure
zero manager address means any manager
none order status means any status

### getFilteredOrders

```solidity
function getFilteredOrders(address manager, address user, enum OrderStatus state, uint256 limit, uint256 offset) external view returns (struct FilteredOrder[])
```

over high limit value may cause function call failure
zero manager address means any manager
none order status means any status
zero user address means no user

### getOrdersByIds

```solidity
function getOrdersByIds(uint256[] ids, address user) external view returns (struct FilteredOrder[])
```

over high ids array length may cause function call failure
zero user address means no user

## MESSAGE_TYPE_HASH

```solidity
bytes32 MESSAGE_TYPE_HASH
```

## Message

```solidity
struct Message {
  address from;
  uint256 nonce;
  uint256 gasOrder;
  address onBehalf;
  uint256 deadline;
  address to;
  uint256 gas;
  uint256 tips;
  bytes data;
}
```

## HashMessage

### _hashTypedDataV4

```solidity
function _hashTypedDataV4(bytes32 structHash) internal view virtual returns (bytes32)
```

### messageHash

```solidity
function messageHash(struct Message message) public view returns (bytes32)
```

## VerifierMessage

### constructor

```solidity
constructor(string name, string version) public
```

### domainSeparator

```solidity
function domainSeparator() external view returns (bytes32)
```

### _hashTypedDataV4

```solidity
function _hashTypedDataV4(bytes32 structHash) internal view returns (bytes32)
```

## Order

```solidity
struct Order {
  address manager;
  uint256 maxGas;
  uint256 executionPeriodStart;
  uint256 executionPeriodDeadline;
  uint256 executionWindow;
}
```

## OrderStatus

```solidity
enum OrderStatus {
  None,
  Pending,
  Accepted,
  Active,
  Inactive,
  Untaken,
  Closed
}
```

## GasPayment

```solidity
struct GasPayment {
  address token;
  uint256 gasPrice;
}
```

## Payment

```solidity
struct Payment {
  address token;
  uint256 amount;
}
```

## IGasOrder

### Execution

```solidity
event Execution(address from, uint256 nonce, uint256 gasOrder, address onBehalf, bool status, bytes result, uint256 timestamp, address fulfiller, bool liquidation)
```

### OrderCreate

```solidity
event OrderCreate(uint256 id, uint256 executionWindow)
```

### OrderAccept

```solidity
event OrderAccept(uint256 id, address executor)
```

### OrderManagerChanged

```solidity
event OrderManagerChanged(uint256 id, address oldManager, address newManager)
```

## TxAccept

### NonceStatus

```solidity
enum NonceStatus {
  NONE,
  REQUESTED,
  EXECUTED
}
```

### nonce

```solidity
mapping(address => mapping(uint256 => enum TxAccept.NonceStatus)) nonce
```

### TransactionAdded

```solidity
event TransactionAdded(struct Message message, bytes signature)
```

### addTransaction

```solidity
function addTransaction(struct Message message, bytes signature) public
```

### isExecutable

```solidity
function isExecutable(struct Message message) public view returns (bool)
```

### isLiquidatable

```solidity
function isLiquidatable(struct Message message) public view returns (bool)
```

### isLiquidatableWithoutExecution

```solidity
function isLiquidatableWithoutExecution(struct Message message) public view returns (bool)
```

