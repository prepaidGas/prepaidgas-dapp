const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { TOKEN_BASE: VAL, DENOM } = require("../../scripts/constants/index.js")
const { TREASURY } = require("../../scripts/constants/gasOrder.js")

describe("FeeProcessor", function () {
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    const FeeProcessorFactory = await ethers.getContractFactory("MockFeeProcessor")

    const FeeProcessorContract = await FeeProcessorFactory.deploy()
    await FeeProcessorContract.deploymentTransaction().wait()

    const TokenFactory = await ethers.getContractFactory("MockToken")
    const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", 100 * VAL)
    await TokenContract.deploymentTransaction().wait()

    await TokenContract.transfer(accounts[1].address, 1 * VAL)
    await TokenContract.connect(accounts[1]).approve(FeeProcessorContract.target, 10 * VAL)
    await TokenContract.transfer(FeeProcessorContract.target, 10 * VAL)

    return { accounts, admin, FeeProcessorContract, TokenContract }
  }

  describe("Fee set/get", function () {
    it("check initial", async function () {
      const { accounts, admin, FeeProcessorContract } = await loadFixture(initialSetup)

      expect(await FeeProcessorContract.fee(0)).to.equal(0)
      expect(await FeeProcessorContract.fee(1)).to.equal(0)
      expect(await FeeProcessorContract.fee(2)).to.equal(0)
      await expect(FeeProcessorContract.fee(3)).to.be.reverted
    })

    it("update", async function () {
      const { accounts, admin, FeeProcessorContract } = await loadFixture(initialSetup)

      await FeeProcessorContract.setFee(1, 50)
      await FeeProcessorContract.setFee(1, 100)
      await FeeProcessorContract.setFee(2, 200)

      expect(await FeeProcessorContract.fee(0)).to.equal(0)
      expect(await FeeProcessorContract.fee(1)).to.equal(100)
      expect(await FeeProcessorContract.fee(2)).to.equal(200)
    })

    it("update overhigh", async function () {
      const { accounts, admin, FeeProcessorContract } = await loadFixture(initialSetup)

      await expect(FeeProcessorContract.setFee(0, 25000)).to.be.revertedWithCustomError(
        FeeProcessorContract,
        "OverhighValue",
      )
    })

    it("update by someone", async function () {
      const { accounts, admin, FeeProcessorContract } = await loadFixture(initialSetup)

      await expect(FeeProcessorContract.connect(accounts[0]).setFee(0, 200)).to.be.reverted
    })
  })

  describe("Take fee", function () {
    it("zero fee", async function () {
      const { accounts, admin, FeeProcessorContract, TokenContract } = await loadFixture(initialSetup)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(1 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0)

      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(1 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0)
    })

    it("different fees", async function () {
      const { accounts, admin, FeeProcessorContract, TokenContract } = await loadFixture(initialSetup)

      await FeeProcessorContract.setFee(0, DENOM / 20)
      await FeeProcessorContract.setFee(1, DENOM / 40)
      await FeeProcessorContract.setFee(2, DENOM / 10)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(1 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0)

      await FeeProcessorContract.connect(accounts[1]).takeFee(2, TokenContract.target, 0.1 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal((1 - 0.01) * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.01 * VAL)

      await FeeProcessorContract.connect(accounts[1]).takeFee(0, TokenContract.target, 0.2 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal((1 - 0.02) * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.02 * VAL)

      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.4 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal((1 - 0.03) * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.03 * VAL)
    })
  })

  describe("Withdraw treasury", function () {
    it("take away", async function () {
      const { accounts, admin, FeeProcessorContract, TokenContract } = await loadFixture(initialSetup)

      await FeeProcessorContract.setFee(1, DENOM / 10)

      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(0.8 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.2 * VAL)

      await FeeProcessorContract.takeAway(
        [accounts[0], accounts[2]],
        [TokenContract.target, TokenContract.target],
        [0.05 * VAL, 0.1 * VAL],
      )

      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.05 * VAL)
      expect(await TokenContract.balanceOf(accounts[0].address)).to.equal(0.05 * VAL)
      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0.1 * VAL)
    })

    it("take away inproper length", async function () {
      const { accounts, admin, FeeProcessorContract, TokenContract } = await loadFixture(initialSetup)

      await FeeProcessorContract.setFee(1, DENOM / 10)

      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(0.8 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.2 * VAL)

      await FeeProcessorContract.takeAway(
        [accounts[0], accounts[2], accounts[4]],
        [TokenContract.target, TokenContract.target],
        [0.05 * VAL],
      )

      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.15 * VAL)
      expect(await TokenContract.balanceOf(accounts[0].address)).to.equal(0.05 * VAL)
    })

    it("take away by someone", async function () {
      const { accounts, admin, FeeProcessorContract, TokenContract } = await loadFixture(initialSetup)

      await FeeProcessorContract.setFee(1, DENOM / 10)

      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)
      await FeeProcessorContract.connect(accounts[1]).takeFee(1, TokenContract.target, 0.5 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(0.8 * VAL)
      expect(await FeeProcessorContract.claimable(TREASURY, TokenContract.target)).to.equal(0.2 * VAL)

      await expect(
        FeeProcessorContract.connect(accounts[3]).takeAway([accounts[0]], [TokenContract.target], [0.05 * VAL]),
      ).to.be.reverted
    })
  })
})
