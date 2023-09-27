const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { TOKEN_BASE: VAL, DENOM } = require("../../scripts/constants/index.js")

describe("Distributor", function () {
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners()

    const DistributorFactory = await ethers.getContractFactory("MockDistributor")

    const DistributorContract = await DistributorFactory.deploy()
    await DistributorContract.deploymentTransaction().wait()

    const TokenFactory = await ethers.getContractFactory("MockToken")
    const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", 100 * VAL)
    await TokenContract.deploymentTransaction().wait()

    await TokenContract.transfer(accounts[1].address, 1 * VAL)
    await TokenContract.connect(accounts[1]).approve(DistributorContract.target, 10 * VAL)
    await TokenContract.transfer(DistributorContract.target, 10 * VAL)

    return { accounts, admin, DistributorContract, TokenContract }
  }

  describe("Main logic", function () {
    it("distribute/claim", async function () {
      const { accounts, admin, DistributorContract, TokenContract } = await loadFixture(initialSetup)

      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0)
      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(0)

      await DistributorContract.distribute(accounts[2].address, TokenContract.target, 2 * VAL)

      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(2 * VAL)
      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0)

      await DistributorContract.connect(accounts[2]).claim(TokenContract.target, 1.5 * VAL)

      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(0.5 * VAL)
      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(1.5 * VAL)
    })

    it("distribute/claim zero", async function () {
      const { accounts, admin, DistributorContract, TokenContract } = await loadFixture(initialSetup)

      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0)
      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(0)

      await DistributorContract.distribute(accounts[2].address, TokenContract.target, 0)
      await DistributorContract.connect(accounts[2]).claim(TokenContract.target, 0)

      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0)
      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(0)
    })

    it("claim too much", async function () {
      const { accounts, admin, DistributorContract, TokenContract } = await loadFixture(initialSetup)

      expect(await TokenContract.balanceOf(accounts[2].address)).to.equal(0)
      expect(await DistributorContract.claimable(accounts[2].address, TokenContract.target)).to.equal(0)

      await DistributorContract.distribute(accounts[2].address, TokenContract.target, 1 * VAL)
      await expect(
        DistributorContract.connect(accounts[2]).claim(TokenContract.target, 2 * VAL),
      ).to.be.revertedWithCustomError(DistributorContract, "BalanceExhausted")
    })
  })

  describe("Fee on transfer", function () {
    it("accept incoming", async function () {
      const { accounts, admin, DistributorContract, TokenContract } = await loadFixture(initialSetup)

      TokenContract.setFee(DENOM / 2)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(1 * VAL)
      expect(await DistributorContract.claimable(accounts[1].address, TokenContract.target)).to.equal(0)

      await DistributorContract.acceptIncoming(TokenContract.target, accounts[1].address, 0.6 * VAL, 0.3 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(0.4 * VAL)
      expect(await DistributorContract.claimable(accounts[1].address, TokenContract.target)).to.equal(0)

      await DistributorContract.acceptIncoming(TokenContract.target, accounts[1].address, 0.4 * VAL, 0.15 * VAL)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(0)
      expect(await DistributorContract.claimable(accounts[1].address, TokenContract.target)).to.equal(0.05 * VAL)
    })

    it("bad incoming", async function () {
      const { accounts, admin, DistributorContract, TokenContract } = await loadFixture(initialSetup)

      expect(await TokenContract.balanceOf(accounts[1].address)).to.equal(1 * VAL)
      expect(await DistributorContract.claimable(accounts[1].address, TokenContract.target)).to.equal(0)

      await expect(DistributorContract.acceptIncoming(TokenContract.target, accounts[1].address, 2 * VAL, 0)).to.be
        .reverted

      await expect(
        DistributorContract.acceptIncoming(TokenContract.target, accounts[1].address, 1 * VAL, 2 * VAL),
      ).to.be.revertedWithCustomError(DistributorContract, "BadIncomeTransfer")
    })
  })
})
