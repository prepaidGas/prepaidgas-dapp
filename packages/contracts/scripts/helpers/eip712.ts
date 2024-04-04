import { BaseContract, TypedDataDomain } from "ethers"

import { NAME, VERSION, HARDHAT_CHAIN_ID } from "../common/constants"

export async function domain(contract: BaseContract, chainId = HARDHAT_CHAIN_ID): Promise<TypedDataDomain> {
  return {
    name: NAME,
    version: VERSION,
    chainId,
    verifyingContract: contract.target.toString(),
  }
}
