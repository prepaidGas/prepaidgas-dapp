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

const { createOrder } = require("../scripts/helpers/order.js")
const { createSignedMsg, createAndAcceptOrder } = require("../scripts/helpers/common.helpers.js")

describe("Executor", function () {
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    //const ExecutorFactory = await ethers.getContractFactory("Executor")
    const GasOrderFactory = await ethers.getContractFactory("GasOrder")

    //const GasOrderContract = await ExecutorFactory.deploy(GasOrderContractAddress, PROJECT_NAME, PROJECT_VERSION)
    const GasOrderContract = await GasOrderFactory.deploy(PROJECT_NAME, PROJECT_VERSION, TOKEN_LINK)
    await GasOrderContract.deploymentTransaction().wait()
    // @todo add deploy error handling
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

    return { accounts, admin, GasOrderContract, TokenContract }
  }

  describe("Transaction request execution", function () {
    it("execute message", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)
      await createOrder(signer, GasOrderContract, TokenContract, true, admin, 36000, 865000)

      const customV1 = randomNumber(10)
      const customV2 = randomNumber(9) + 1

      const { messageTuple, signedMessage, EndpointContract } = await createSignedMsg(
        {
          signer,
          GasOrderContract,
        },
        { customV1, customV2 },
      )
      console.log(`
      Signed msg: ${signedMessage}
      Message tuple: ${messageTuple}
      `)

      await GasOrderContract.addTransaction(messageTuple, signedMessage)

      await GasOrderContract.execute(messageTuple, signedMessage)

      expect(await EndpointContract.retrieve()).to.equal(customV1 * 16 + customV2)
    })

    it("message replay", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)

      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)
      await createOrder(signer, GasOrderContract, TokenContract, true, admin, 36000, 865000)

      const { messageTuple, signedMessage } = await createSignedMsg({
        signer,
        GasOrderContract,
      })

      await GasOrderContract.addTransaction(messageTuple, signedMessage)

      await GasOrderContract.execute(messageTuple, signedMessage)

      await expect(GasOrderContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
        GasOrderContract,
        "ExecutionImpossible",
      )
    })

    it("add transaction with the same nonce", async function () {
      const { accounts, admin, GasOrderContract, TokenContract } = await loadFixture(initialSetup)
      const signer = accounts[randomNumber(5) + 1]
      await TokenContract.transfer(signer, 20000000000)
      await createOrder(signer, GasOrderContract, TokenContract, true, admin, 36000, 865000)

      const nonce = randomNumber(100)
      {
        const { messageTuple, signedMessage } = await createSignedMsg(
          {
            signer,
            GasOrderContract,
          },
          { customNonce: nonce },
        )

        await GasOrderContract.addTransaction(messageTuple, signedMessage)

        await GasOrderContract.execute(messageTuple, signedMessage)
      }
      {
        const { messageTuple, signedMessage } = await createSignedMsg(
          {
            signer,
            GasOrderContract,
          },
          { customNonce: nonce },
        )

        await expect(GasOrderContract.addTransaction(messageTuple, signedMessage)).to.be.revertedWithCustomError(
          GasOrderContract,
          "NonceExhausted",
        )
      }
    })

    it("signed by someone", async function () {
      const { accounts, admin, GasOrderContract } = await loadFixture(initialSetup)

      const signer = accounts[randomNumber(7)],
        from = signer.address,
        nonce = 0,
        gasOrder = 0,
        onBehalf = "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        deadline = 0,
        to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
        gas = 1000,
        tips = 0,
        data = "0xbe08ee9e57050c"

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, tips, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, tips, data }

      const signedMessage = await accounts[8].signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, GasOrderContract),
        { Message: messageType },
        messageStruct,
      )

      await expect(GasOrderContract.execute(messageTuple, signedMessage)).to.be.revertedWithCustomError(
        GasOrderContract,
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
})
