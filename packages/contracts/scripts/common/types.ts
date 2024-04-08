import { BigNumberish, TypedDataField } from "ethers"

export const MessageTypedFields: TypedDataField[] = [
  { name: "from", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "order", type: "uint256" },
  { name: "start", type: "uint256" },
  { name: "to", type: "address" },
  { name: "gas", type: "uint256" },
  { name: "data", type: "bytes" },
]

export type Message = {
  from: string
  nonce: BigNumberish
  order: BigNumberish
  start: BigNumberish
  to: string
  gas: BigNumberish
  data: string
}

export type GasPayment = {
  token: string
  perUnit: BigNumberish
}

export type Order = {
  manager: string
  gas: BigNumberish
  expire: BigNumberish
  start: BigNumberish
  end: BigNumberish
  txWindow: BigNumberish
  redeemWindow: BigNumberish
  gasPrice: GasPayment
  gasGuarantee: GasPayment
}

export enum OrderStatus {
  None,
  Pending,
  Accepted,
  Active,
  Inactive,
  Untaken,
  Closed,
}
