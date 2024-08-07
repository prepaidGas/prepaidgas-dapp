import { ethers } from "hardhat"
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"

import { getDeployAddress } from "../scripts/helpers/deploy"
import { domain } from "../scripts/helpers/eip712"
import {
  NO_ADDRESS,
  NAME,
  VERSION,
  DENOM,
  MIN_TX_WINDOW,
  MAX_REDEEM_WINDOW,
  MAX_PENDING,
  START_ASAP,
  MIN_VALIDATIONS,
} from "../scripts/common/constants"
import { MessageTypedFields, Order, Message, OrderStatus } from "../scripts/common/types"

describe("System", function () {
  async function deployFixture() {
    const [deployer, admin, ...users] = await ethers.getSigners()

    const Treasury = await ethers.getContractFactory("Treasury")
    const PrepaidGas = await ethers.getContractFactory("PrepaidGas")

    const [treasuryExpected, pgasExpected] = [
      await getDeployAddress(deployer.address, 0),
      await getDeployAddress(deployer.address, 1),
    ]

    const treasury = await Treasury.deploy(pgasExpected)
    const pgas = await PrepaidGas.deploy(treasuryExpected, admin.address, NAME, VERSION)

    await pgas.connect(admin).setValidatorStatus(admin.address, true)

    const MockToken = await ethers.getContractFactory("MockToken")

    const guaranteeT = await MockToken.deploy("Gas Guarantee Token", "GGT")
    const priceT = await MockToken.deploy("Gas Price Token", "GPT")

    for (const user of users) {
      await guaranteeT.mint(user.address, 1000n * 10n ** 18n)
      await guaranteeT.connect(user).approve(treasury.target, 1000n * 10n ** 18n)
      await priceT.mint(user.address, 1000n * 10n ** 18n)
      await priceT.connect(user).approve(treasury.target, 1000n * 10n ** 18n)
    }

    return { treasury, pgas, admin, users, guaranteeT, priceT }
  }

  describe("Deployment", function () {
    it("Correct cross-init", async function () {
      const { treasury, pgas, admin } = await loadFixture(deployFixture)

      expect(await treasury.pgas()).to.be.equal(pgas.target)
      expect(await pgas.treasury()).to.be.equal(treasury.target)
    })

    it("Correct owner", async function () {
      const { treasury, pgas, admin } = await loadFixture(deployFixture)

      expect(await pgas.owner()).to.be.equal(admin.address)
    })

    it("Correct validators", async function () {
      const { treasury, pgas, admin } = await loadFixture(deployFixture)

      expect(await pgas.validatorThreshold()).to.be.equal(MIN_VALIDATIONS)
      expect(await pgas.isValidator(admin.address)).to.be.equal(true)
    })

    it("Correct domain", async function () {
      const { treasury, pgas, admin } = await loadFixture(deployFixture)

      const message: Message = {
        from: NO_ADDRESS,
        nonce: "0x00",
        order: "0x00",
        start: "0x00",
        to: NO_ADDRESS,
        gas: "0x00",
        data: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }
      const messageHashContract = await pgas.messageHash(message)
      const messageSignedLocal = await admin.signTypedData(await domain(pgas), { Message: MessageTypedFields }, message)

      expect(ethers.recoverAddress(messageHashContract, messageSignedLocal)).to.be.equal(admin.address)
    })

    it("Correct fee tokens policy", async function () {
      const { treasury, pgas, admin } = await loadFixture(deployFixture)

      const MockToken = await ethers.getContractFactory("MockToken")
      const fakefeeT = await MockToken.deploy("Fake Fee Token", "FFT")

      const fee = BigInt(0.2 * DENOM)
      fakefeeT.setFee(fee)

      await fakefeeT.mint(admin.address, 1000n * 10n ** 18n)
      await fakefeeT.connect(admin).approve(treasury.target, 1000n * 10n ** 18n)

      const order: Order = {
        manager: NO_ADDRESS,
        gas: 1000000000,
        expire: (await time.latest()) + MAX_PENDING / 2,
        start: START_ASAP,
        end: (await time.latest()) + MAX_PENDING,
        txWindow: MIN_TX_WINDOW,
        redeemWindow: MAX_REDEEM_WINDOW,
        gasPrice: { token: fakefeeT.target.toString(), perUnit: "0x0f" },
        gasGuarantee: { token: NO_ADDRESS, perUnit: "0x00" },
      }

      await expect(treasury.connect(admin).orderCreate(order))
        .to.be.revertedWithCustomError(treasury, `BadIncomeTransfer`)
        .withArgs(
          (BigInt(order.gas) * BigInt(order.gasPrice.perUnit) * (BigInt(DENOM) - fee)) / BigInt(DENOM),
          BigInt(order.gas) * BigInt(order.gasPrice.perUnit),
        )
    })
  })

  describe("Getters", function () {
    it("Token details", async function () {
      const { treasury, pgas, admin, users, guaranteeT, priceT } = await loadFixture(deployFixture)

      expect(await pgas.getTokensDetails([guaranteeT, priceT, treasury])).to.be.deep.equal([
        [guaranteeT.target, "Gas Guarantee Token", "GGT", 18, 0],
        [priceT.target, "Gas Price Token", "GPT", 18, 0],
        [treasury.target, "", "", 0, 7],
      ])
    })

    it("Total balance", async function () {
      const { treasury, pgas, admin, users, guaranteeT, priceT } = await loadFixture(deployFixture)
      const client = users[0]
      const bot = users[1]
      const executor = users[2]

      const order: Order = {
        manager: client.address,
        gas: 1000000000,
        expire: (await time.latest()) + 100,
        start: (await time.latest()) + 10,
        end: (await time.latest()) + MAX_PENDING,
        txWindow: MIN_TX_WINDOW,
        redeemWindow: MAX_REDEEM_WINDOW,
        gasPrice: { token: priceT.target.toString(), perUnit: 8 },
        gasGuarantee: { token: guaranteeT.target.toString(), perUnit: 9 },
      }
      const orderDup: Order = { ...order, manager: bot.address, gas: 500000000 }

      await treasury.connect(client).orderCreate(order)
      await treasury.connect(bot).orderCreate(orderDup)

      expect(await pgas.getTotalBalances([client, bot, executor])).to.be.deep.equal([0, 0, 0])

      await treasury.connect(executor).orderAccept(0)
      await treasury.connect(executor).orderAccept(1)

      expect(await pgas.getTotalBalances([client, bot, executor])).to.be.deep.equal([0, 0, 0])

      await time.increase(10)

      expect(await pgas.getTotalBalances([client, bot, executor])).to.be.deep.equal([order.gas, orderDup.gas, 0])

      await time.increaseTo(BigInt(order.end) + BigInt(order.redeemWindow) + 1n)

      expect(await pgas.getTotalBalances([client, bot, executor])).to.be.deep.equal([0, 0, 0])
    })
  })

  describe("Flow Tests", function () {
    it("Withdraw expired", async function () {
      const { treasury, pgas, admin, users, guaranteeT, priceT } = await loadFixture(deployFixture)
      const client = users[0]

      const order: Order = {
        manager: client.address,
        gas: 1000000000,
        expire: (await time.latest()) + 100,
        start: START_ASAP,
        end: (await time.latest()) + MAX_PENDING,
        txWindow: MIN_TX_WINDOW,
        redeemWindow: MAX_REDEEM_WINDOW,
        gasPrice: { token: priceT.target.toString(), perUnit: 8 },
        gasGuarantee: { token: guaranteeT.target.toString(), perUnit: 9 },
      }

      const balance = await priceT.balanceOf(client.address)

      expect(await pgas.orders()).to.be.equal(0)
      expect(await pgas.status(0)).to.be.equal(OrderStatus.None)

      await treasury.connect(client).orderCreate(order)

      expect(await pgas.orders()).to.be.equal(1)
      expect(await pgas.status(0)).to.be.equal(OrderStatus.Pending)
      expect((await pgas.gasOrder(0)).manager).to.be.equal(client.address)
      expect(await priceT.balanceOf(client.address)).to.be.equal(
        balance - BigInt(order.gasPrice.perUnit) * BigInt(order.gas),
      )

      await time.increaseTo(order.expire)

      expect(await pgas.status(0)).to.be.equal(OrderStatus.Untaken)

      await treasury.connect(client).orderWithdraw(0)

      expect(await pgas.status(0)).to.be.equal(OrderStatus.Closed)
      expect(await priceT.balanceOf(client.address)).to.be.equal(balance)
    })
  })
})
