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
} = require("../constants/index.js")
const { precalculateAddress } = require("./index.js")
const { randomBytes, randomNumber } = require("./random.js")
const { domain, messageType } = require("./eip712.js")

const orderHelper = require("./order.js")

/**
 *
 * @param {Object} essentialProps
 * @param {*} essentialProps.ExecutorContract
 * @param {*} essentialProps.signer
 * @param {Object} options
 * @param {*} options.customNonce - Specify custom nonce, otherwise will use random nonce
 * @param {*} options.customV1 - Specify custom v1 number, otherwise will use random number
 * @param {*} options.customV2 - Specify custom v1 number, otherwise will use random number
 *
 *
 * @returns
 */
async function createSignedMsg(essentialProps, options = {}) {
  const { signer, ExecutorContract } = essentialProps

  await time.increase(36001)

  const EndpointFactory = await ethers.getContractFactory("MockEndpoint")
  const EndpointContract = await EndpointFactory.deploy()

  const v1 = options.hasOwnProperty("customV1") ? options.customV1 : randomNumber(10)
  const v2 = options.hasOwnProperty("customV2") ? options.customV2 : randomNumber(9) + 1

  const from = signer.address,
    nonce = options.hasOwnProperty("customNonce") ? options.customNonce : randomNumber(100),
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

  return { messageTuple, messageStruct, signedMessage, EndpointContract }
}

module.exports = { createSignedMsg }
