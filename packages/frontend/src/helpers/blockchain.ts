import { LOCAL_EVM_PREPAIDGAS_SMART_CONTRACT, LOCAL_EVM_TREASURY_SMART_CONTRACT } from "@/constants" // @todo improve path to the constants

const prepaidGasCoreContractAddress = () => {
  if (process.env.NETWORK == "production") {
    return "0x" // @todo finalize
  } else if (process.env.NETWORK == "testnet") {
    return "0x" // @todo finalize
  } else {
    return LOCAL_EVM_PREPAIDGAS_SMART_CONTRACT
  }
}

const prepaidGasTreasuryContractAddress = () => {
  if (process.env.NETWORK == "production") {
    return "0x" // @todo finalize
  } else if (process.env.NETWORK == "testnet") {
    return "0x" // @todo finalize
  } else {
    return LOCAL_EVM_TREASURY_SMART_CONTRACT
  }
}

export { prepaidGasCoreContractAddress, prepaidGasTreasuryContractAddress }
