const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")
const { time } = require("@nomicfoundation/hardhat-network-helpers")

const {
  PROJECT_NAME,
  PROJECT_VERSION,
  CHAIN_ID,
  TOKEN_LINK,
  SYSTEM_FEE,
  GAS_AMOUNT,
  LOCKED_GUARANTEE_PER_GAS,
} = require("../scripts/constants/index.js")
const { precalculateAddress } = require("../scripts/helpers/index.js")
const { randomBytes, randomNumber } = require("../scripts/helpers/random.js")
const { domain, messageType } = require("../scripts/helpers/eip712.js")

const orderHelper = require("../scripts/helpers/orderHelper.js")

describe("Executor", function () {
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

  describe("Transaction request execution", function () {
    it("execute message", async function () {
      //@todo optimize code to reduce amount of reusable elements
      const { accounts, admin, ExecutorContract, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)

      await orderHelper.createOrder(signer, GasOrderContract, TokenContract, false, false, 36000, 865000)
      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await time.increase(36001)

      const EndpointFactory = await ethers.getContractFactory("MockEndpoint")
      const EndpointContract = await EndpointFactory.deploy()

      const v1 = randomNumber(10)
      const v2 = randomNumber(9) + 1

      const from = signer.address,
        nonce = randomNumber(100),
        gasOrder = 0,
        onBehalf = signer.address,
        deadline = (await time.latest()) + 80, // @todo replace with execution window automaticaly
        to = EndpointContract.target,
        gas = 10000000,
        data = "0x6057361d00000000000000000000000000000000000000000000000000000000000000" + v1 + v2

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await GasOrderContract.addTransaction(messageTuple, signedMessage)

      await ExecutorContract.execute(messageTuple, signedMessage)

      expect(await EndpointContract.retrieve()).to.equal(v1 * 16 + v2)
    })

    it("message replay", async function () {
      const { accounts, admin, ExecutorContract, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)

      await orderHelper.createOrder(signer, GasOrderContract, TokenContract, false, false, 36000, 865000)
      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await time.increase(36001)

      const EndpointFactory = await ethers.getContractFactory("MockEndpoint")
      const EndpointContract = await EndpointFactory.deploy()

      const v1 = randomNumber(10)
      const v2 = randomNumber(9) + 1

      const from = signer.address,
        nonce = randomNumber(100),
        gasOrder = 0,
        onBehalf = signer.address,
        deadline = (await time.latest()) + 80, // @todo replace with execution window automaticaly
        to = EndpointContract.target,
        gas = 10000000,
        data = "0x6057361d00000000000000000000000000000000000000000000000000000000000000" + v1 + v2

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await GasOrderContract.addTransaction(messageTuple, signedMessage)

      await ExecutorContract.execute(messageTuple, signedMessage)

      await expect(ExecutorContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
        GasOrderContract,
        "ExecutionImpossible",
      )
    })

    it("add transaction with the same nonce", async function () {
      const { accounts, admin, ExecutorContract, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)
      await orderHelper.createOrder(signer, GasOrderContract, TokenContract, false, false, 36000, 865000)
      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      const nonce = randomNumber(100)
      {
        await time.increase(36001)

        const EndpointFactory = await ethers.getContractFactory("MockEndpoint")
        const EndpointContract = await EndpointFactory.deploy()

        const v1 = randomNumber(10)
        const v2 = randomNumber(9) + 1

        const from = signer.address,
          gasOrder = 0,
          onBehalf = signer.address,
          deadline = (await time.latest()) + 80, // @todo replace with execution window automaticaly
          to = EndpointContract.target,
          gas = 10000000,
          data = "0x6057361d00000000000000000000000000000000000000000000000000000000000000" + v1 + v2

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        await GasOrderContract.addTransaction(messageTuple, signedMessage)

        await ExecutorContract.execute(messageTuple, signedMessage)
      }
      {
        await time.increase(36001)

        const EndpointFactory = await ethers.getContractFactory("MockEndpoint")
        const EndpointContract = await EndpointFactory.deploy()

        const v1 = randomNumber(10)
        const v2 = randomNumber(9) + 1

        const from = signer.address,
          gasOrder = 0,
          onBehalf = signer.address,
          deadline = (await time.latest()) + 80, // @todo replace with execution window automaticaly
          to = EndpointContract.target,
          gas = 10000000,
          data = "0x6057361d00000000000000000000000000000000000000000000000000000000000000" + v1 + v2

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        await expect(GasOrderContract.addTransaction(messageTuple, signedMessage)).to.be.revertedWithCustomError(
          GasOrderContract,
          "InvalidTransaction",
        )
      }
    })

    it("signed by someone", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = 0,
        gasOrder = 0,
        onBehalf = "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        deadline = 0,
        to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
        gas = 1000,
        data = "0xbe08ee9e57050c"

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await accounts[8].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(ExecutorContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
        ExecutorContract,
        "UnexpectedRecovered",
      )
    })
  })
  describe("Transaction request liquidation", function () {
    it("liquidate transaction", async function () {
      // @todo
    })
    it("liquidate transaction by signer without execution", async function () {
      // @todo
    })
  })

  /* @dev validators functionality is out of the first version scope
  describe("Validate message liquidation", function () {
    it("liquidate arbitrary message", async function () {
      for (let i = 0; i < 15; i++) {
        const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
        await ExecutorContract.setValidatorThreshold(1)
        await ExecutorContract.setValidatorStatus(accounts[0].address, true)

        const signer = accounts[randomNumber(7)],
          from = signer.address,
          nonce = randomNumber(100),
          gasOrder = randomNumber(100),
          onBehalf = randomBytes(20),
          deadline = randomNumber(Math.floor(new Date().getTime() / 1000)),
          to = randomBytes(20),
          gas = randomNumber(10000),
          data = randomBytes(randomNumber(200))

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        const validation = await accounts[0].signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        await ExecutorContract.liquidate(messageTuple, signedMessage, [validation])
      }
    })

    it("liquidate executed message", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(1)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = randomNumber(Math.floor(new Date().getTime() / 1000 - 1000)),
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await ExecutorContract.execute(messageTuple, signedMessage)

      const validation = await accounts[0].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(ExecutorContract.liquidate(messageTuple, signedMessage, [validation])).to.be.revertedWithCustomError(
        ExecutorContract,
        "NonceExhausted",
      )
    })
    it("liquidate before deadline", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(1)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = Math.floor(new Date().getTime() / 1000) + 1000,
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await ExecutorContract.execute(messageTuple, signedMessage)

      const validation = await accounts[0].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(ExecutorContract.liquidate(messageTuple, signedMessage, [validation])).to.be.revertedWithCustomError(
        ExecutorContract,
        "DeadlineNotMet",
      )
    })

    it("liquidate under threshold", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(3)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)
      await ExecutorContract.setValidatorStatus(accounts[1].address, true)
      await ExecutorContract.setValidatorStatus(accounts[2].address, true)
      await ExecutorContract.setValidatorStatus(accounts[3].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = Math.floor(new Date().getTime() / 1000) - 1000,
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      const validations = [
        await accounts[0].signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        ),
        await accounts[1].signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        ),
      ]

      await expect(ExecutorContract.liquidate(messageTuple, signedMessage, validations)).to.be.revertedWithCustomError(
        ExecutorContract,
        "FewValidations",
      )
    })

    it("liquidate same validation", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(2)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = Math.floor(new Date().getTime() / 1000) - 1000,
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      const validation = await accounts[0].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(
        ExecutorContract.liquidate(messageTuple, signedMessage, [validation, validation]),
      ).to.be.revertedWithCustomError(ExecutorContract, "IncorrectSignatureOrder")
    })

    it("liquidate validations order", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(2)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)
      await ExecutorContract.setValidatorStatus(accounts[1].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = Math.floor(new Date().getTime() / 1000) - 1000,
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      const validations = [accounts[0], accounts[1]]
        .sort((a, b) => (a.address > b.address ? -1 : a.address < b.address ? 1 : 0))
        .map(
          async (c) =>
            await c.signTypedData(
              domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
              { Message: messageType },
              messageStruct,
            ),
        )

      await expect(ExecutorContract.liquidate(messageTuple, signedMessage, validations)).to.be.revertedWithCustomError(
        ExecutorContract,
        "IncorrectSignatureOrder",
      )
    })

    it("liquidate wrong validation", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      await ExecutorContract.setValidatorThreshold(1)
      await ExecutorContract.setValidatorStatus(accounts[0].address, true)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = randomNumber(100),
        gasOrder = randomNumber(100),
        onBehalf = randomBytes(20),
        deadline = Math.floor(new Date().getTime() / 1000) - 1000,
        to = randomBytes(20),
        gas = randomNumber(10000),
        data = randomBytes(randomNumber(200))

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      const validation = await accounts[1].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(ExecutorContract.liquidate(messageTuple, signedMessage, [validation])).to.be.revertedWithCustomError(
        ExecutorContract,
        "UnknownRecovered",
      )
    })
  })*/
})
