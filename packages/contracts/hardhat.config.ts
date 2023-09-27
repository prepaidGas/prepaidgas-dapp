import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-ethers"
import "@nomicfoundation/hardhat-toolbox"
import "solidity-coverage"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: false,
  },
}

export default config
