# prepaidGas DApp

Buy Gas now and use it later — First ETH Gas futures market

## Overview

TBD Explain main idea and actors

We support meta transactions `constructor(..) .. ERC2771Context(address(0x...)) {..}`

## Order Life Cycle

TBD Add statuses explanation

```mermaid
graph TB;

None -- orderCreate
[gas: 0 => some] --> Pending
Pending -- orderAccept
[executor: 0x0 => some] --> Accepted
Accepted -- start <= time --> Active
Active -- end + redeeem <= time --> Inactive
Inactive -- orderClose
[closed: false => true] --> Closed

Pending -- expire <= time --> Untaken
Untaken -- orderWithdraw
[closed: false => true] --> Closed

Active -- all gas used
[used: 0 => gas] --> Closed
```

## Transaction Life Cycle

TBD Add statuses explanation

```mermaid
graph TB;

None -- tx formation and sign --> Formed
Formed -- validators accept tx --> Validated
Formed -- invalid tx execution time --> Rejected
Validated -- deadline - 2*window <= time <= deadline - window --> Execute
Validated -- deadline - window < time <= deadline --> Liquidate
Validated -- deadline < time <= deadline + redeem --> Redeem
Execute -- guarantee taken back by executor
prepayment claimed by executor ----> Fulfilled
Liquidate -- guarantee claimed by liquidator
prepayment claimed by liquidator ---> Fulfilled
Redeem -- guarantee taken back by purchaser
prepayment claimed by purchaser --> Fulfilled
```

## Getting Started

TBD Explain repo structure, more details for setup

```sh
# Install dependencies
npm i


# Run frontend locally, any code changes causes immidiate effects
npm run fe-dev
# Run local hardhat node with mock-up setup
npm run sc-dev

# Execute both `fe-dev` and `sc-dev`
npm run dev


# Build Docker environment
npm run docker-build

# Run `dev` script in Docker
npm run docker-dev
# Run `dev` script in Docker (adapted for PowerShell)
npm run docker-dev-windows
```

Note: `-dev` instructions are affected by the [`dev` script](packages/contracts/package.json) contains `sleep 12` instuction which may need to be reconfigured in case of node start takes more than 10 seconds
