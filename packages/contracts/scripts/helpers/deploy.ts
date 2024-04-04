import { ethers } from "hardhat"

export async function getDeployAddress(account: string, mod = 0) {
  const count = (await ethers.provider.getTransactionCount(account)) + mod
  const precalculated = await ethers.getCreateAddress({
    from: account,
    nonce: count,
  })

  return precalculated
}
