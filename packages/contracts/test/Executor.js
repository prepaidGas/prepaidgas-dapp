const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const {
  PROJECT_NAME,
  PROJECT_VERSION,
  CHAIN_ID,
  VALIDATOR_THRESHOLD,
  VALIDATORS,
} = require("../scripts/constants/executor.js")
const { randomBytes, randomNumber } = require("../scripts/helpers/random.js")
const { domain, messageType } = require("../scripts/helpers/eip712.js")

describe("Executor", function () {
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    const ExecutorFactory = await ethers.getContractFactory("Executor")
    const GasOrderFactory = await ethers.getContractFactory("MockFallback")

    const GasOrderContract = await GasOrderFactory.deploy()
    await GasOrderContract.deploymentTransaction().wait()

    const ExecutorContract = await ExecutorFactory.deploy(
      GasOrderContract.target,
      PROJECT_NAME,
      PROJECT_VERSION,
      VALIDATOR_THRESHOLD,
      VALIDATORS,
    )
    await ExecutorContract.deploymentTransaction().wait()

    return { accounts, admin, ExecutorContract, GasOrderContract }
  }

  describe("Validate message execution", function () {
    it("execute arbitrary message", async function () {
      for (let i = 0; i < 15; i++) {
        const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)

        const signer = accounts[randomNumber(7)],
          from = signer.address,
          nonce = randomNumber(100),
          gasOrder = randomNumber(100),
          onBehalf = randomBytes(20),
          deadline = randomNumber(1000000),
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
      }
    })

    it("execute empty message", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = 0,
        gasOrder = 0,
        onBehalf = "0x0000000000000000000000000000000000000000",
        deadline = 0,
        to = "0x0000000000000000000000000000000000000000",
        gas = 0,
        data = "0x"

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await ExecutorContract.execute(messageTuple, signedMessage)
    })

    it("message replay", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = 0,
        gasOrder = 0,
        onBehalf = "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        deadline = 0,
        to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
        gas = 0,
        data = "0xbe08ee9e57050c"

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
        { Message: messageType },
        messageStruct,
      )

      await ExecutorContract.execute(messageTuple, signedMessage)
      await expect(ExecutorContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
        ExecutorContract,
        "NonceExhausted",
      )
    })

    it("same nonce", async function () {
      const { accounts, admin, ExecutorContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(7)]
      {
        const from = signer.address,
          nonce = 555,
          gasOrder = 0,
          onBehalf = "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
          deadline = 0,
          to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
          gas = 0,
          data = "0xbe08ee9e57050c"

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        await ExecutorContract.execute(messageTuple, signedMessage)
      }
      {
        const from = signer.address,
          nonce = 555,
          gasOrder = 10,
          onBehalf = "0x00172290dd7278aa3ddd389cc1e1d165cc4bafff",
          deadline = 0,
          to = "0xfb07183ff28455c581f370704b225ac9eabdffff",
          gas = 110,
          data = "0x17181009be08ee9e57050c17181009be08ee9e57050c17181009be08ee9e57050c17181009be08ee9e57050c"

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutorContract),
          { Message: messageType },
          messageStruct,
        )

        await expect(ExecutorContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
          ExecutorContract,
          "NonceExhausted",
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
  })
})
