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

export const GasPayment: TypedDataField[] = [
  { name: "token", type: "address" },
  { name: "perUnit", type: "uint256" },
]

export const Order: TypedDataField[] = [
  { name: "manager", type: "address" },
  { name: "gas", type: "uint256" },
  { name: "expire", type: "uint256" },
  { name: "start", type: "uint256" },
  { name: "end", type: "uint256" },
  { name: "txWindow", type: "uint256" },
  { name: "redeemWindow", type: "uint256" },
  { name: "gasPrice", type: "GasPayment" },
  { name: "gasGuarantee", type: "GasPayment" },
]
