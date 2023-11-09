const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")

const {
  SYSTEM_FEE,
  GAS_AMOUNT,
  GAS_COST,
  INITIAL_EXECUTOR_REWARD,
  LOCKED_GUARANTEE_PER_GAS,
  PROJECT_NAME,
  PROJECT_VERSION,
  TOKEN_LINK,
  VALIDATOR_THRESHOLD,
  VALIDATORS,
} = require("../scripts/constants/index.js")

const orderHelper = require("../scripts/helpers/orderHelper.js")
const { precalculateAddress } = require("../scripts/helpers/index.js")

describe("GasOrder", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    const ExecutorFactory = await ethers.getContractFactory("Executor")
    const GasOrderFactory = await ethers.getContractFactory("GasOrder")

    const GasOrderContractAddress = await precalculateAddress(admin, 1)

    const ExecutorContract = await ExecutorFactory.deploy(GasOrderContractAddress, PROJECT_NAME, PROJECT_VERSION)
    await ExecutorContract.deploymentTransaction().wait()
    // @todo add deploy error handling
    console.log(`Executor contract deployed: ${ExecutorContract.target}`)

    const GasOrderContract = await GasOrderFactory.deploy(ExecutorContract.target, TOKEN_LINK)
    await GasOrderContract.deploymentTransaction().wait()
    console.log(`GasOrder contract deployed: ${GasOrderContract.target}`)

    const TokenFactory = await ethers.getContractFactory("MockToken")
    const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", "1000000000000") // @todo use ethers function to specify token amount
    await TokenContract.transfer(accounts[1], 20000000)
    await TokenContract.transfer(accounts[2], 20000000)

    await TokenContract.transfer(accounts[10], 20000000)

    await TokenContract.transfer(accounts[10], 20000000)

    await TokenContract.deploymentTransaction().wait()

    await GasOrderContract.setFee(0, SYSTEM_FEE)
    await GasOrderContract.setFee(1, SYSTEM_FEE)
    await GasOrderContract.setFee(2, SYSTEM_FEE)

    return { accounts, admin, ExecutorContract, GasOrderContract, TokenContract }
  }

  describe("Order operations", function () {
    it("Should create a new order", async function () {
      const { admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      const tokensBalanceBefore = await TokenContract.balanceOf(admin.address)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)

      const tokensBalanceAfter = await TokenContract.balanceOf(admin.address)

      // @todo add more asserts statements
      expect(tokensBalanceBefore - tokensBalanceAfter).to.equal(INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT)
    })

    it("Should close order and send back prepaid fund for unspent Gas", async function () {
      const { admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      const tokensBalanceBefore = await TokenContract.balanceOf(admin.address)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 36000, 865000, 36001)

      const tokensBalanceAfter = await TokenContract.balanceOf(admin.address)

      await GasOrderContract.revokeOrder(0)

      const tokensBalanceAfterRepay = await TokenContract.balanceOf(admin.address)

      // @todo add more asserts statements
      expect(tokensBalanceBefore - tokensBalanceAfter).to.equal(INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT)

      expect(tokensBalanceBefore).to.equal(tokensBalanceAfterRepay)
    })

    it("Executor should accept a new order", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 36000, 865000)

      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      let withdrawableAmount = (INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)) / 10000
      await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount)

      const tokensBalanceAfter = await TokenContract.balanceOf(accounts[0].address)

      const amountOfERC1155GasTokens = await GasOrderContract.balanceOf(admin.address, 0)

      expect(tokensBalanceAfter).to.equal(withdrawableAmount)

      expect(amountOfERC1155GasTokens).to.equal(GAS_AMOUNT)
    })

    it("Should fail to retrive prepaid tokens from order if not enough ERC1155 Gas tokens on balance", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract, false, false, 36000, 865000)

      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      // Accepting order
      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      let withdrawableAmount = (INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)) / 10000
      await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount)

      await GasOrderContract.connect(admin).safeTransferFrom(admin.address, accounts[0].address, 0, GAS_AMOUNT, "0x")

      const txToBeReverted = GasOrderContract.connect(admin).retrieveGasCost(admin.address, 0, GAS_AMOUNT)

      await expect(txToBeReverted).to.be.reverted
    })
    it("Should transfer order management", async function () {
      const { admin, accounts, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)

      await GasOrderContract.transferOrderManagement(0, accounts[5].address)

      const orderData = await GasOrderContract.order(0)
      expect(orderData[0]).to.be.eq(accounts[5].address)
    })

    it("Should fail transfering order management due to the same manager", async function () {
      const { admin, accounts, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)

      await expect(GasOrderContract.transferOrderManagement(0, admin.address)).to.be.revertedWithCustomError(
        GasOrderContract,
        "IncorrectAddressArgument",
      )
    })

    it("Should fail transfering order management if access is unauthorized", async function () {
      const { admin, accounts, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)

      await expect(
        GasOrderContract.connect(accounts[2]).transferOrderManagement(0, admin.address),
      ).to.be.revertedWithCustomError(GasOrderContract, "Unauthorized")
    })
  })
  describe("Order getter", function () {
    it("Should get orders with spesific owner", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      // @notice orders mockups
      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)

      const totalAmountOfOrders = await GasOrderContract.getMatchingOrdersCount(
        ethers.ZeroAddress,
        0, // OrderStatus.None
      )

      expect(totalAmountOfOrders).to.be.eq(6)

      const ordersWithAccount2Owner = await GasOrderContract.getFilteredOrders(
        accounts[2].address,
        ethers.ZeroAddress, // `user` is not set
        0, // OrderStatus.None
        100,
        0,
      )
      expect(ordersWithAccount2Owner.length).to.be.eq(2)
      expect(ordersWithAccount2Owner[0][0]).to.be.eq(4) // order number
      expect(ordersWithAccount2Owner[0][1][1]).to.be.eq(2000) // order number

      const ordersWithRandomOwner = await GasOrderContract.getFilteredOrders(
        "0x0000000000000000000000000000000000000001",
        ethers.ZeroAddress, // `user` is not set
        0, // OrderStatus.None
        100,
        0,
      )
      expect(ordersWithRandomOwner.length).to.be.eq(0)

      const bigOffset = await GasOrderContract.getFilteredOrders(
        accounts[2].address,
        ethers.ZeroAddress, // `user` is not set
        0, // OrderStatus.None
        100,
        100,
      )

      expect(bigOffset.length).to.be.eq(0)

      const normalOffset = await GasOrderContract.getFilteredOrders(
        accounts[2].address,
        ethers.ZeroAddress, // `user` is not set
        0, // OrderStatus.None
        100,
        1,
      )

      expect(normalOffset.length).to.be.eq(1)
    })

    it("Should get user total gas holding", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      // @notice orders mockups
      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract, true, accounts[10])
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract, true, accounts[10])
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)

      const totalUserGasHoldings = await GasOrderContract.getTotalBalance(accounts[1], [])

      expect(totalUserGasHoldings).to.be.eq(4000)
    })

    it("Should get orders by ids", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      // @notice orders mockups
      await orderHelper.createOrder(admin, GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract, true, accounts[10])
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract, true, accounts[10])
      await orderHelper.createOrder(accounts[1], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)
      await orderHelper.createOrder(accounts[2], GasOrderContract, TokenContract)

      const totalUserGasHoldings = await GasOrderContract.getOrdersByIds([1, 2, 3], ethers.ZeroAddress)

      expect(totalUserGasHoldings.length).to.be.eq(3)
    })
  })
})
