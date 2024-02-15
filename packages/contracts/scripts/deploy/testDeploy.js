const {
  TOTAL_TEST_ORDERS_AMOUNT,
  SYSTEM_FEE,
  PROJECT_NAME,
  PROJECT_VERSION,
  TOKEN_LINK,
} = require("../constants/index.js")
const { createOrder } = require("../helpers/order.js")
const { precalculateAddress } = require("../helpers/index.js")

async function initDeploymentSetup() {
  const [admin, ...accounts] = await ethers.getSigners()
  const network = await ethers.getDefaultProvider().getNetwork()
  console.log("Network name=", network.name)
  console.log("Network chain id=", network.chainId)
  console.log("Network data", network)

  const GasOrderFactory = await ethers.getContractFactory("GasOrder")

  const GasOrderContract = await GasOrderFactory.deploy(PROJECT_NAME, PROJECT_VERSION, TOKEN_LINK)
  await GasOrderContract.deploymentTransaction().wait()
  console.log(`GasOrder contract deployed: ${GasOrderContract.target}`)

  const TokenFactory = await ethers.getContractFactory("MockToken")
  //@todo replace magic number with testing contracts
  const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", "1000000000000000000000000") // @todo use ethers function to specify token amount
  await TokenContract.deploymentTransaction().wait()

  await GasOrderContract.setFee(0, SYSTEM_FEE)
  await GasOrderContract.setFee(1, SYSTEM_FEE)
  await GasOrderContract.setFee(2, SYSTEM_FEE)
  console.log("Test token is deployed: ", TokenContract.target)

  // @dev send mock tokens to the tester hardhat address
  await TokenContract.transfer("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", "100000000000000000000000")

  // Create and accept order
  await TokenContract.transfer(accounts[10].address, "500000000000000")
  await TokenContract.transfer(accounts[7].address, "500000000000000")

  for (let i = 0; i < 3; i++) {
    let isAccepted = Math.random() < 0.5
    await createOrder(
      accounts[7],
      GasOrderContract,
      TokenContract,
      isAccepted,
      isAccepted ? accounts[10] : false,
      100,
      1801194545,
      0,
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    )
  }
  for (let i = 0; i < 10/*TOTAL_TEST_ORDERS_AMOUNT*/; i++) {
    let isAccepted = Math.random() < 0.5
    await createOrder(
      admin,
      GasOrderContract,
      TokenContract,
      isAccepted,
      isAccepted ? accounts[10] : false,
      36000,
      864000,
      0,
      "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    )
  }

  // fruitsToGet.map(fruit => getNumFruit(fruit))
  // const numFruits = await Promise.all(promises)

  return { accounts, admin, GasOrderContract, TokenContract }
}

initDeploymentSetup().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
