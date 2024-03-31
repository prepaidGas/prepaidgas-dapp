# prepaidGas DApp

Buy Gas now and use it later — First ETH Gas futures market

## Overview

TBD Explain main idea and actors

## Order Life Cycle

TBD Add diagram with statuses explanation

```mermaid
graph TB;
Pending -- expire <= time --> Untaken
Untaken -- orderRefund --> Closed
Accepted -- unwrap all --> Closed
%% Main stream
None -- orderNew --> Pending
Pending -- orderAccept --> Accepted
Accepted -- start <= time --> Active
Active -- end <= time --> Inactive
Inactive -- orderClose --> Closed
Pending -- orderRevoke --> Closed
Active -- unwrap/use all --> Closed
```

## Transaction Life Cycle

TBD Add diagram with statuses explanation

## Getting Started

TBD Explain repo structure, more details for setup

```sh
# Install dependencies
npm i

# Run frontend locally, any code changes causes immidiate effects
npm run fe-dev
# Run linter on the fronend code
npm run fe-lint
# Run local hardhat node with mock-up setup
npm run sc-node-mock
# Run smart contract tests
npm run sc-test
# Run smart contract coverage tool
npm run sc-coverage

# Execute both `fe-dev` and `sc-node-mock`
npm run dev-setup
```

Note: `dev-setup` and `sc-node-mock` instructions are affected by [`node-mock` script](packages/contracts/package.json) contains `sleep 12` instuction which may need to be reconfigured in case of node start takes more than 10 seconds

TBD docker setup should be mentioned additionally
