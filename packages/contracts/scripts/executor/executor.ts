import { ethers } from "ethers"

async function listener() {
  console.log("Executor script start")

  // TODO: Make link to be script flag
  let httpProvider = new ethers.getDefaultProvider("http://api.prepaidgas.io:7676/")

  // TODO: Get from file | 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 accounts[6]
  let privateKey = "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356"
  let wallet = new ethers.Wallet(privateKey, httpProvider)

  // TODO: Get from file
  let abi = ["event OrderCreate(uint256 indexed id, uint256 end)", "function orderAccept(uint256 id)"]

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
    await contract.connect(wallet).orderAccept(id)

    console.log("Executor accepted order:", id, await contract.executor(id))
  })
}

//listener()
