const Executor = require("abi/Executor.sol/Executor.json")
const GasOrder = require("abi/GasOrder.sol/GasOrder.json")
const MockToken = require("abi/mock/MockToken.sol/MockToken.json")

interface FieldEntry {
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

const ExecutorABI: ABIEntry[] = Executor.abi
const GasOrderABI: ABIEntry[] = GasOrder.abi
const MockTokenABI: ABIEntry[] = MockToken.abi

export { ExecutorABI, GasOrderABI, MockTokenABI }
