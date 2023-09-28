const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { PROJECT_NAME, PROJECT_VERSION, CHAIN_ID } = require("../../scripts/constants/executor.js")
const { randomBytes, randomNumber } = require("../../scripts/helpers/random.js")
const { domain, messageType } = require("../../scripts/helpers/eip712.js")

describe("ExecutionMessage", function () {
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    const ExecutionMessageFactory = await ethers.getContractFactory("ExecutionMessage")

    const ExecutionMessageContract = await ExecutionMessageFactory.deploy(PROJECT_NAME, PROJECT_VERSION)
    await ExecutionMessageContract.deploymentTransaction().wait()

    return { accounts, admin, ExecutionMessageContract }
  }

  describe("Validate message hash", function () {
    it("static message", async function () {
      const { accounts, admin, ExecutionMessageContract } = await loadFixture(initialSetup)

      const from = "0x376a2a023a105bc2e19ce19ad275b9bbbcb23e1a",
        nonce = 70,
        gasOrder = 55,
        onBehalf = "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        deadline = 1400000000,
        to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
        gas = 2222222222,
        data = "0xbe08ee9e57050c",
        signer = accounts[3]

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const messageHash = await ExecutionMessageContract.messageHash(messageTuple)
      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutionMessageContract),
        { Message: messageType },
        messageStruct,
      )

      expect(ethers.recoverAddress(messageHash, signedMessage)).to.equal(signer.address)
    })

    it("empty message", async function () {
      const { accounts, admin, ExecutionMessageContract } = await loadFixture(initialSetup)

      const from = "0x376a2a023a105bc2e19ce19ad275b9bbbcb23e1a",
        nonce = 0,
        gasOrder = 0,
        onBehalf = "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
        deadline = 0,
        to = "0xfb071837728455c581f370704b225ac9eabdfa4a",
        gas = 0,
        data = "0x",
        signer = accounts[3]

      const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
      const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

      const messageHash = await ExecutionMessageContract.messageHash(messageTuple)
      const signedMessage = await signer.signTypedData(
        domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutionMessageContract),
        { Message: messageType },
        messageStruct,
      )

      expect(ethers.recoverAddress(messageHash, signedMessage)).to.equal(signer.address)
    })

    it("arbitrary message", async function () {
      for (let i = 0; i < 15; i++) {
        const { accounts, admin, ExecutionMessageContract } = await loadFixture(initialSetup)
        const from = randomBytes(20),
          nonce = randomNumber(100),
          gasOrder = randomNumber(100),
          onBehalf = randomBytes(20),
          deadline = randomNumber(1000000),
          to = randomBytes(20),
          gas = randomNumber(10000),
          data = randomBytes(randomNumber(200)),
          signer = accounts[randomNumber(7)]

        const messageTuple = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        const messageHash = await ExecutionMessageContract.messageHash(messageTuple)
        const signedMessage = await signer.signTypedData(
          domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutionMessageContract),
          { Message: messageType },
          messageStruct,
        )

        expect(ethers.recoverAddress(messageHash, signedMessage)).to.equal(signer.address)
      }
    })

    it("data mismatch", async function () {
      for (let i = 0; i < 15; i++) {
        const { accounts, admin, ExecutionMessageContract } = await loadFixture(initialSetup)
        const from = randomBytes(20),
          nonce = randomNumber(100),
          gasOrder = randomNumber(100),
          onBehalf = randomBytes(20),
          deadline = randomNumber(1000000),
          to = randomBytes(20),
          gas = randomNumber(10000),
          data = randomBytes(randomNumber(199) + 1),
          signer = accounts[randomNumber(7)]

        const messageTupleInitial = [from, nonce, gasOrder, onBehalf, deadline, to, gas, data]
        const messageStruct = { from, nonce, gasOrder, onBehalf, deadline, to, gas, data }

        for (let i = 0; i < messageTupleInitial.length; i++) {
          const field = messageTupleInitial[i].toString()
          const messageTuple = [
            ...messageTupleInitial.slice(0, i),
            field.slice(0, field.length - 1) + (field[field.length - 1] == "0" ? "1" : "0"),
            ...messageTupleInitial.slice(i + 1),
          ]

          const messageHash = await ExecutionMessageContract.messageHash(messageTuple)
          const signedMessage = await signer.signTypedData(
            domain(PROJECT_NAME, PROJECT_VERSION, CHAIN_ID, ExecutionMessageContract),
            { Message: messageType },
            messageStruct,
          )

          expect(ethers.recoverAddress(messageHash, signedMessage)).to.not.equal(signer.address)
        }
      }
    })
  })
})
