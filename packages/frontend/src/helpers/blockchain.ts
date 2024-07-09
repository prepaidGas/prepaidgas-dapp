import {
  LOCAL_EVM_PREPAIDGAS_SMART_CONTRACT,
  LOCAL_EVM_TREASURY_SMART_CONTRACT,
  TESTNET_EVM_PREPAIDGAS_SMART_CONTRACT,
  TESTNET_EVM_TREASURY_SMART_CONTRACT,
  CONTRACTS_BY_CHAIN_ID,
} from "@/constants" // @todo improve path to the constants

const prepaidGasCoreContractAddress = (chainId: number) => {
  // if (process.env.NETWORK == "production") {
  //   return "0x" // @todo finalize
  // } else if (process.env.NETWORK == "testnet") {
  //   return "0x" // @todo finalize
  // } else {
  //   return LOCAL_EVM_PREPAIDGAS_SMART_CONTRACT
  // }
  console.log("CONTRACTS_BY_CHAIN_ID: ", CONTRACTS_BY_CHAIN_ID[chainId])
  return CONTRACTS_BY_CHAIN_ID[chainId].CORE
}

const prepaidGasTreasuryContractAddress = (chainId: number) => {
  // if (process.env.NETWORK == "production") {
  //   return "0x" // @todo finalize
  // } else if (process.env.NETWORK == "testnet") {
  //   return "0x" // @todo finalize
  // } else {
  //   return LOCAL_EVM_TREASURY_SMART_CONTRACT
  // }
  // return TESTNET_EVM_TREASURY_SMART_CONTRACT
  console.log("CONTRACTS_BY_CHAIN_ID: ", CONTRACTS_BY_CHAIN_ID[chainId])
  return CONTRACTS_BY_CHAIN_ID[chainId].TREASURY
}

export { prepaidGasCoreContractAddress, prepaidGasTreasuryContractAddress }
