export const LOCAL_EVM_PREPAIDGAS_SMART_CONTRACT = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
export const LOCAL_EVM_TREASURY_SMART_CONTRACT = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const TESTNET_EVM_PREPAIDGAS_SMART_CONTRACT = "0x95De482B3e13580F191e20737D9245E7f9E6750A"
export const TESTNET_EVM_TREASURY_SMART_CONTRACT = "0x1795D9ca595587091E660C32B65A24332528cDFE"

const CHAIN_IDS = {
  SEPOLIA: 11155111,
  HARDHAT: 31337,
  MAINNET: 1,
}

export const CONTRACTS_BY_CHAIN_ID = {
  [CHAIN_IDS.SEPOLIA]: {
    CORE: "0x95De482B3e13580F191e20737D9245E7f9E6750A",
    TREASURY: "0x1795D9ca595587091E660C32B65A24332528cDFE",
  },
  [CHAIN_IDS.HARDHAT]: {
    CORE: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    TREASURY: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  [CHAIN_IDS.MAINNET]: {
    CORE: undefined,
    TREASURY: undefined,
  },
}
