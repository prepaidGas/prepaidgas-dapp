import { ethers } from "hardhat"
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"

import { TryToken, PrepaidGas, Treasury } from "../../typechain-types"

import { getDeployAddress } from "../helpers/deploy"
import { randNum, randOpt } from "../helpers/math"
import { MAX_PENDING, NAME, VERSION, START_ASAP, MAX_REDEEM_WINDOW, MIN_TX_WINDOW } from "../common/constants"
import { Message, MessageTypedFields, Order } from "../common/types"
import { domain } from "../helpers/eip712"

async function deploy(admin: HardhatEthersSigner) {
  const Treasury = await ethers.getContractFactory("Treasury")
  const PrepaidGas = await ethers.getContractFactory("PrepaidGas")

  const [treasuryExpected, pgasExpected] = [
    await getDeployAddress(admin.address, 0),
    await getDeployAddress(admin.address, 1),
  ]

  const treasury = await Treasury.deploy(pgasExpected)
  const pgas = await PrepaidGas.deploy(treasuryExpected, admin.address, NAME, VERSION)

  console.log("Treasury deployed", treasury.target)
  console.log("PrepaidGas deployed", pgas.target)

  if (treasury.target != treasuryExpected || pgas.target != pgasExpected) throw "Deploy Consistency Break"

  return { treasury, pgas }
}

async function mockTokens(testers: HardhatEthersSigner[]) {
  const TryToken = await ethers.getContractFactory("TryToken")

  const guaranteeT = await TryToken.deploy("Gas Guarantee Token", "GGT")
  const priceT = await TryToken.deploy("Gas Price Token", "GPT")

  for (const tester of testers) {
    await priceT.connect(tester).mint()
    await guaranteeT.connect(tester).mint()
  }

  return { priceT, guaranteeT }
}

async function mockOrders(
  treasury: Treasury,
  pgas: PrepaidGas,
  priceT: TryToken,
  guaranteeT: TryToken,
  client: HardhatEthersSigner,
  executor: HardhatEthersSigner,
) {
  await priceT.connect(client).approve(treasury.target, 1000n * 10n ** 18n)
  await guaranteeT.connect(executor).approve(treasury.target, 1000n * 10n ** 18n)

  for (let i = 0; i < 72; i++) {
    const latest = await time.latest()
    const order: Order = {
      manager: client.address,
      gas: randNum(1000000, 1000000000),
      expire: randNum(latest + 100, latest + MAX_PENDING / 3),
      start: randOpt() ? START_ASAP : randNum(latest + 100, latest + MAX_PENDING / 3),
      end: randNum(latest + MAX_PENDING / 3 + 1, latest + MAX_PENDING),
      txWindow: randNum(MIN_TX_WINDOW, MIN_TX_WINDOW + 1000),
      redeemWindow: randNum(0, MAX_REDEEM_WINDOW),
      gasPrice: { token: priceT.target.toString(), perUnit: randNum(0, 1000) },
      gasGuarantee: { token: guaranteeT.target.toString(), perUnit: randNum(0, 1000) },
    }

    treasury.connect(client).orderCreate(order)

    if (randOpt(-0.1)) {
      await treasury.connect(executor).orderAccept(i)

      if (order.start == START_ASAP && randOpt(-0.1)) {
        const latest = await time.latest()
        const message: Message = {
          from: client.address,
          nonce: i,
          order: i,
          start: latest,
          to: "0x0000000000000000000000000000000000000000",
          gas: randNum(0, Number(order.gas)),
          data: "0x",
        }

        const signature = await client.signTypedData(await domain(pgas), { Message: MessageTypedFields }, message)
        await pgas.connect(executor).execute(message, signature)
      }
    }
  }
}

async function main() {
  const [admin, ...testers] = await ethers.getSigners()

  const { treasury, pgas } = await deploy(admin)

  const { priceT, guaranteeT } = await mockTokens(testers)
  await mockOrders(treasury, pgas, priceT, guaranteeT, testers[0], testers[1])
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
