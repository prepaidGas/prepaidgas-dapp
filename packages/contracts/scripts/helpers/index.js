const { ethers } = require("hardhat")

async function precalculateAddress(account, mod = 0) {
  const transactionCount = (await ethers.provider.getTransactionCount(account.address)) + mod
  const precalculatedAddress = await ethers.getCreateAddress({
    from: account.address,
    nonce: transactionCount,
  })

  return precalculatedAddress
}

module.exports = { precalculateAddress }
