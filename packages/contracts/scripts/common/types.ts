import { TypedDataField } from "ethers"

export const Message: TypedDataField[] = [
  { name: "from", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "order", type: "uint256" },
  { name: "deadline", type: "uint256" },
  { name: "to", type: "address" },
  { name: "gas", type: "uint256" },
  { name: "data", type: "bytes" },
]
