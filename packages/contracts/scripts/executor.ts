// TODO: Switch to "import" style
const ethers = require("ethers")

async function listener() {
  // TODO: Make link to be script flag
  let httpProvider = new ethers.getDefaultProvider("http://localhost:8545/")

  // TODO: Get from file
  let privateKey = "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a"
  let wallet = new ethers.Wallet(privateKey, httpProvider)

  // TODO: Get from file
  let abi = [
    "event OrderCreate(uint256 indexed id, uint256 executionWindow)",
    "function acceptOrder(uint256 id, uint256 guaranteeTransfer)",
  ]

  let address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  let contract = new ethers.Contract(address, abi, httpProvider)

  // TODO: Setup listeners
  // NOTICE: it will react on the previous event (1) as well
  contract.on(contract.filters.OrderCreate, async (id: any) => {
    const order = await contract.order(id)
    const guarantee = await contract.guarantee(id)
    contract.connect(wallet).acceptOrder(id, guarantee.gasPrice * order.maxGas)
  })
}

listener()

// Plan:
// + Migrate to main repo
// + Add "accept" listener
// - Add "execute" listener for immidiate execution
// - Create a text db for long-executions and load them on start
// - Add to db list of accepted orders and executed transactions
