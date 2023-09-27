const CONSTANTS = require("../constants/index.js")
const orderHelper = require("../helpers/orderHelper.js")

async function initDeploymentSetup() {
  const [admin, ...accounts] = await ethers.getSigners()
  const network = await ethers.getDefaultProvider().getNetwork()
  console.log("Network name=", network.name)
  console.log("Network chain id=", network.chainId)
  console.log("Network data", network)

  const ExecutorFactory = await ethers.getContractFactory("Executor")
  const GasOrderFactory = await ethers.getContractFactory("GasOrder")
  // @todo precalculate it automaticaly
  const GAS_ORDER_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  // @todo move to constants file
  const PROJECT_NAME = "Prepaid Gas"
  const VERSION = "0.0.1"
  const TOKEN_LINK = ""
  const SYSTEM_FEE = 1000 // 100 = 1%

  const ExecutorContract = await ExecutorFactory.deploy(GAS_ORDER_ADDRESS, PROJECT_NAME, VERSION, 1, [])
  await ExecutorContract.deploymentTransaction().wait()
  // @todo add deploy error handling
  console.log(`Executor contract deployed: ${ExecutorContract.target}`)

  const GasOrderContract = await GasOrderFactory.deploy(ExecutorContract.target, TOKEN_LINK)
  await GasOrderContract.deploymentTransaction().wait()
  console.log(`GasOrder contract deployed: ${GasOrderContract.target}`)

  const TokenFactory = await ethers.getContractFactory("MockToken")
  const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", "1000000000") // @todo use ethers function to specify token amount
  await TokenContract.deploymentTransaction().wait()

  await GasOrderContract.setFee(0, SYSTEM_FEE)
  await GasOrderContract.setFee(1, SYSTEM_FEE)
  await GasOrderContract.setFee(2, SYSTEM_FEE)

  // Create and accept order

  await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 36000, 864000)
  await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 16000, 1264000)
  await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 26000, 464000)

  await TokenContract.transfer(accounts[0].address, CONSTANTS.GAS_AMOUNT * CONSTANTS.LOCKED_GUARANTEE_PER_GAS)
  await TokenContract.connect(accounts[0]).approve(
    GasOrderContract.target,
    CONSTANTS.GAS_AMOUNT * CONSTANTS.LOCKED_GUARANTEE_PER_GAS,
  )

  await GasOrderContract.connect(accounts[0]).acceptOrder(0, CONSTANTS.GAS_AMOUNT * CONSTANTS.LOCKED_GUARANTEE_PER_GAS)

  let withdrawableAmount = (CONSTANTS.INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)) / 10000
  await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount)

  return { accounts, admin, ExecutorContract, GasOrderContract, TokenContract }
}

initDeploymentSetup().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
