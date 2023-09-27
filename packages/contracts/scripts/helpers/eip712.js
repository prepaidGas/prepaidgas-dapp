function domain(name, version, chainId, contract) {
  return {
    name,
    version,
    chainId,
    verifyingContract: contract.target,
  }
}
const messageType = [
  { name: "from", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "gasOrder", type: "uint256" },
  { name: "onBehalf", type: "address" },
  { name: "deadline", type: "uint256" },
  { name: "to", type: "address" },
  { name: "gas", type: "uint256" },
  { name: "data", type: "bytes" },
]

module.exports = { domain, messageType }
