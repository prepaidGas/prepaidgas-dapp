const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { VALIDATOR_THRESHOLD: THRESHOLD } = require("../../scripts/constants/executor.js")

describe("Validators", function () {
  async function initialSetup() {
    const [admin, alice, bob, george, ...accounts] = await ethers.getSigners()
    const validators = [alice, bob, george]

    const ValidatorsFactory = await ethers.getContractFactory("Validators")

    const ValidatorsContract = await ValidatorsFactory.deploy(THRESHOLD, validators)
    await ValidatorsContract.deploymentTransaction().wait()

    return { accounts, validators, admin, ValidatorsContract }
  }

  describe("Validator threshold", function () {
    it("check initial", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect(await ValidatorsContract.validatorThreshold()).to.equal(THRESHOLD)
    })

    it("update", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)
      const threshold = 5

      await ValidatorsContract.setValidatorThreshold(threshold)

      expect(await ValidatorsContract.validatorThreshold()).to.equal(threshold)
    })

    it("zero threshold", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      await expect(ValidatorsContract.setValidatorThreshold(0)).to.be.revertedWithCustomError(
        ValidatorsContract,
        "UnderflowValue",
      )
    })

    it("update by someone", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      await expect(ValidatorsContract.connect(accounts[1]).setValidatorThreshold(5)).to.be.reverted
    })
  })

  describe("Validator set", function () {
    it("check validators length", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect((await ValidatorsContract.validators(0, 3)).length).to.equal(3)
      expect((await ValidatorsContract.validators(2, 2)).length).to.equal(2)
      expect((await ValidatorsContract.validators(4, 1)).length).to.equal(1)
      expect((await ValidatorsContract.validators(5, 5)).length).to.equal(5)
    })

    it("check initial", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect(await ValidatorsContract.validatorSetLength()).to.equal(3)
      expect([...(await ValidatorsContract.validators(0, 3))]).to.have.members(validators.map((c) => c.address))
      expect([...(await ValidatorsContract.validators(2, 1))]).to.have.members([validators[2].address])
      expect([...(await ValidatorsContract.validators(4, 2))]).to.deep.equal(["0x0", "0x0"])
    })

    it("add/remove validator", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      await ValidatorsContract.setValidatorStatus(accounts[0], true)

      expect(await ValidatorsContract.validatorSetLength()).to.equal(4)
      expect([...(await ValidatorsContract.validators(0, 4))]).to.have.members([
        ...validators.map((c) => c.address),
        accounts[0].address,
      ])

      await ValidatorsContract.setValidatorStatus(validators[1], false)
      await ValidatorsContract.setValidatorStatus(validators[2], false)

      expect(await ValidatorsContract.validatorSetLength()).to.equal(2)
      expect([...(await ValidatorsContract.validators(0, 2))]).to.have.members([
        validators[0].address,
        accounts[0].address,
      ])

      await ValidatorsContract.setValidatorStatus(accounts[1], true)

      expect(await ValidatorsContract.validatorSetLength()).to.equal(3)
      expect([...(await ValidatorsContract.validators(0, 3))]).to.have.members([
        validators[0].address,
        accounts[0].address,
        accounts[1].address,
      ])

      await ValidatorsContract.setValidatorStatus(validators[0], false)

      expect(await ValidatorsContract.validatorSetLength()).to.equal(2)
      expect([...(await ValidatorsContract.validators(0, 2))]).to.have.members([
        accounts[0].address,
        accounts[1].address,
      ])
    })

    it("check if account is validator", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect(await ValidatorsContract.isValidator(accounts[0])).to.be.false
      await ValidatorsContract.setValidatorStatus(accounts[0], true)
      expect(await ValidatorsContract.isValidator(accounts[0])).to.be.true

      expect(await ValidatorsContract.isValidator(validators[1])).to.be.true
      expect(await ValidatorsContract.isValidator(validators[2])).to.be.true
      await ValidatorsContract.setValidatorStatus(validators[1], false)
      await ValidatorsContract.setValidatorStatus(validators[2], false)
      expect(await ValidatorsContract.isValidator(validators[1])).to.be.false
      expect(await ValidatorsContract.isValidator(validators[2])).to.be.false

      expect(await ValidatorsContract.isValidator(accounts[1])).to.be.false
      await ValidatorsContract.setValidatorStatus(accounts[1], true)
      expect(await ValidatorsContract.isValidator(accounts[1])).to.be.true

      expect(await ValidatorsContract.isValidator(validators[0])).to.be.true
      await ValidatorsContract.setValidatorStatus(validators[0], false)
      expect(await ValidatorsContract.isValidator(validators[0])).to.be.false
    })

    it("doubled update request", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect(await ValidatorsContract.isValidator(accounts[0])).to.be.false
      await ValidatorsContract.setValidatorStatus(accounts[0], true)
      await ValidatorsContract.setValidatorStatus(accounts[0], true)
      expect(await ValidatorsContract.isValidator(accounts[0])).to.be.true

      expect(await ValidatorsContract.validatorSetLength()).to.equal(4)
      expect(await ValidatorsContract.validators(0, 5)).to.deep.equal([
        ...validators.map((c) => c.address),
        accounts[0].address,
        "0x0",
      ])

      expect(await ValidatorsContract.isValidator(validators[0])).to.be.true
      await ValidatorsContract.setValidatorStatus(validators[0], false)
      await ValidatorsContract.setValidatorStatus(validators[0], false)
      expect(await ValidatorsContract.isValidator(validators[0])).to.be.false

      expect(await ValidatorsContract.validatorSetLength()).to.equal(3)
      expect([...(await ValidatorsContract.validators(0, 3))]).to.have.members([
        ...validators.map((c) => c.address).slice(1),
        accounts[0].address,
      ])
    })

    it("update by someone", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      await expect(ValidatorsContract.connect(accounts[1]).setValidatorStatus(accounts[0], true)).to.be.reverted
    })
  })

  describe("Validator URI", function () {
    it("set URI", async function () {
      const { accounts, validators, admin, ValidatorsContract } = await loadFixture(initialSetup)

      expect(await ValidatorsContract.validatorURI(accounts[0])).to.equal("")
      await ValidatorsContract.connect(accounts[0]).setValidatorLink("https://link.co")
      expect(await ValidatorsContract.validatorURI(accounts[0])).to.equal("https://link.co")

      expect(await ValidatorsContract.validatorURI(validators[0])).to.equal("")
      await ValidatorsContract.connect(validators[0]).setValidatorLink("https://link.co")
      expect(await ValidatorsContract.validatorURI(validators[0])).to.equal("https://link.co")
      await ValidatorsContract.connect(validators[0]).setValidatorLink("")
      expect(await ValidatorsContract.validatorURI(validators[0])).to.equal("")
    })
  })
})
