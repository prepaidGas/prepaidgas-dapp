import { ethers } from "hardhat"
import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"

import { getDeployAddress } from "../scripts/helpers/deploy"
import { domain } from "../scripts/helpers/eip712"
import { NAME, VERSION } from "../scripts/common/constants"
import { Message } from "../scripts/common/types"

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

    return { treasury, pgas, admin, users }
  }

  describe("Deployment", function () {
    it("Correct cross-init", async function () {
      const { treasury, pgas, admin, users } = await loadFixture(deployFixture)

      expect(await treasury.pgas()).to.be.equal(pgas.target)
      expect(await pgas.treasury()).to.be.equal(treasury.target)
    })

    it("Correct owner", async function () {
      const { treasury, pgas, admin, users } = await loadFixture(deployFixture)

      expect(await pgas.owner()).to.be.equal(admin.address)
    })

    it("Correct domain", async function () {
      const { treasury, pgas, admin, users } = await loadFixture(deployFixture)

      const sampleMessage = {
        from: "0x0000000000000000000000000000000000000000",
        nonce: "0x00",
        order: "0x00",
        deadline: "0x00",
        to: "0x0000000000000000000000000000000000000000",
        gas: "0x00",
        data: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }
      const sampleHashContract = await pgas.messageHash(sampleMessage)
      const sampleSignedLocal = await admin.signTypedData(await domain(pgas), { Message }, sampleMessage)

      expect(ethers.recoverAddress(sampleHashContract, sampleSignedLocal)).to.be.equal(admin.address)
    })
  })
})
