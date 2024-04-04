import { ethers } from "hardhat"
import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"

import { getDeployAddress } from "../scripts/helpers/deploy"
import { domain } from "../scripts/helpers/eip712"
import {
  NAME,
  VERSION,
  DENOM,
  MIN_TX_WINDOW,
  MAX_REDEEM_WINDOW,
  MAX_PENDING,
  START_ASAP,
  MIN_VALIDATIONS,
} from "../scripts/common/constants"
import { MessageTypedFields, Order, Message } from "../scripts/common/types"

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
        from: "0x0000000000000000000000000000000000000000",
        nonce: "0x00",
        order: "0x00",
        deadline: "0x00",
        to: "0x0000000000000000000000000000000000000000",
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
        manager: "0x0000000000000000000000000000000000000000",
        gas: 1000000000,
        expire: (await time.latest()) + MAX_PENDING / 2,
        start: START_ASAP,
        end: (await time.latest()) + MAX_PENDING,
        txWindow: MIN_TX_WINDOW,
        redeemWindow: MAX_REDEEM_WINDOW,
        gasPrice: { token: fakefeeT.target.toString(), perUnit: "0x0f" },
        gasGuarantee: { token: "0x0000000000000000000000000000000000000000", perUnit: "0x00" },
      }

      await expect(treasury.connect(admin).orderCreate(order))
        .to.be.revertedWithCustomError(treasury, `BadIncomeTransfer`)
        .withArgs(
          (BigInt(order.gas) * BigInt(order.gasPrice.perUnit) * (BigInt(DENOM) - fee)) / BigInt(DENOM),
          BigInt(order.gas) * BigInt(order.gasPrice.perUnit),
        )
    })
  })
})
