// TODO: Switch to "import" style
const ethers = require("ethers")

async function listener() {
  console.log("Executor script start")

  // TODO: Make link to be script flag
  let httpProvider = new ethers.getDefaultProvider("http://localhost:8545/")

  // TODO: Get from file | 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 accounts[6]
  let privateKey = "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356"
  let wallet = new ethers.Wallet(privateKey, httpProvider)

  // TODO: Get from file
  const message_type =
    "tuple(address from, uint256 nonce, uint256 gasOrder, address onBehalf, uint256 deadline, address to, uint256 gas, uint256 tips, bytes data)"
  let abi = [
    "event OrderCreate(uint256 indexed id, uint256 executionWindow)",
    "event TransactionAdded(" + message_type + " message, bytes indexed signature)",
    "function acceptOrder(uint256 id, uint256 guaranteeTransfer)",
    "function execute(" + message_type + " calldata message, bytes calldata signature)",
    "function order(uint256 id) view returns (tuple(address, uint256 maxGas, uint256, uint256, uint256 executionWindow))",
    "function guarantee(uint256 id) view returns (tuple(address, uint256 gasPrice))",
    "function executor(uint256 id) view returns (address)",
  ]

  let address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  let contract = new ethers.Contract(address, abi, httpProvider)

  // TODO: Setup listeners
  // NOTICE: it will react on the previous event (1) as well
  contract.on(contract.filters.OrderCreate, async (id: any) => {
    const executor = await contract.executor(id)
    console.log("Executor have seen create event:", id, executor)
    if (executor != "0x0000000000000000000000000000000000000000") return

    const order = await contract.order(id)
    const guarantee = await contract.guarantee(id)
    await contract.connect(wallet).acceptOrder(id, guarantee.gasPrice * order.maxGas)

    console.log("Executor accepted order:", id, await contract.executor(id))
  })

  contract.on(contract.filters.TransactionAdded, async (message: any, signature: any) => {
    console.log("Executor have seen tx register event:", message.from, message.nonce)

    // message.deadline - executionWindow * 2 < block.timestamp &&
    // message.deadline - executionWindow > block.timestamp

    const order = await contract.order(message.gasOrder)
    const executionWindow = order.executionWindow

    const delay = message.deadline - executionWindow * 2 - new Date().getTime() / 100

    if (delay < executionWindow) return
    setTimeout(async () => {
      await contract.execute(message, signature)
    }, delay)
  })
}

listener()

// Plan:
// + Migrate to main repo
// + Add "accept" listener
// - Add "execute" listener for immidiate execution
// - Create a text db for long-executions and load them on start
// - Add to db list of accepted orders and executed transactions
