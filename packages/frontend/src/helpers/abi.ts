const Treasury = require("abi/Treasury.sol/Treasury.json")
const PrepaidGas = require("abi/PrepaidGas.sol/PrepaidGas.json")
const MockToken = require("abi/mock/MockToken.sol/MockToken.json")
const TryToken = require("abi/TryToken.sol/TryToken.json")

export interface FieldEntry {
  indexed?: boolean
  internalType: string
  name?: string
  type?: string
  components?: FieldEntry[]
}

export interface ABIEntry {
  inputs?: FieldEntry[]
  outputs?: FieldEntry[]
  anonymous?: boolean
  stateMutability?: string
  type: string
  name?: string // Optional if it's a function
}

const TreasuryABI: ABIEntry[] = Treasury.abi
const PrepaidGasABI: ABIEntry[] = PrepaidGas.abi
const MockTokenABI: ABIEntry[] = MockToken.abi
const TryTokenABI: ABIEntry[] = TryToken.abi

export { TreasuryABI, PrepaidGasABI, MockTokenABI, TryTokenABI }
