const Executor  = require("abi/Executor.sol/Executor.json");
const GasOrder  = require("abi/GasOrder.sol/GasOrder.json");

interface FieldEntry {
  indexed?: boolean;
  internalType: string;
  name?: string;
  type?: string;
  components?: FieldEntry[];
}

interface ABIEntry {
  inputs?: FieldEntry[];
  outputs?: FieldEntry[];
  anonymous?: boolean;
  stateMutability?: string;
  type: string;
  name?: string; // Optional if it's a function
}


const ExecutorABI: ABIEntry[] = Executor.abi;
const GasOrderABI: ABIEntry[] = GasOrder.abi;

export { ExecutorABI, GasOrderABI };