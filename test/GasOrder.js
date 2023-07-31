const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

//@todo setup pretifier

describe("GasOrder", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  // @todo move init setup to helpers
  // @todo make it test/deployment agnostic
  async function initialSetup() {
    const [admin, ...accounts] = await ethers.getSigners();

    const ExecutorFactory = await ethers.getContractFactory(
        "Executor"
    );
    const GasOrderFactory = await ethers.getContractFactory(
      "GasOrder"
    );
    // @todo precalculate it automaticaly
    const GAS_ORDER_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    // @todo move to constants file
    const PROJECT_NAME = "Prepaid Gas";
    const VERSION = "0.0.1";
    const TOKEN_LINK = "";

    const ExecutorContract = await ExecutorFactory.deploy(GAS_ORDER_ADDRESS, PROJECT_NAME, VERSION);
    await ExecutorContract.deploymentTransaction().wait();
    // @todo add deploy error handling
    console.log(`Executor contract deployed: ${ExecutorContract.target}`);

    
    const GasOrderContract = await GasOrderFactory.deploy(ExecutorContract.target, TOKEN_LINK);
    await GasOrderContract.deploymentTransaction().wait();
    console.log(`GasOrder contract deployed: ${GasOrderContract.target}`);

    const TokenFactory = await ethers.getContractFactory(
      "MockToken"
    );
    const TokenContract = await TokenFactory.deploy("MockUSD", "MUSD", "1000000000"); // @todo use ethers function to specify token amount
    await TokenContract.deploymentTransaction().wait();
    

    await GasOrderContract.setPaymentMethodStatus(TokenContract.target, true);
    await GasOrderContract.setFee(1000);

    return {admin, ExecutorContract, GasOrderContract, TokenContract};
  }

  describe("Order operations", function () {
    it("Should create a new order", async function () {
      const {admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      // @todo move to helper
      await TokenContract.approve(GasOrderContract.target, 30000)

      await GasOrderContract.createOrder(
        100,
        Math.floor(Date.now() / 1000) + 864000,
        [TokenContract.target, 10000],
        [TokenContract.target, 100],
        [TokenContract.target, 10000]
      )
      // @todo add more asserts statements
      const gasTokensBalance = await GasOrderContract.balanceOf(admin.address, 0)
      expect(
        gasTokensBalance
      ).to.equal("100");
    });

    it("Should close order and send back prepaid fund for unspent Gas", async function () {
      const {admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      // @todo move to helper
      await TokenContract.approve(GasOrderContract.target, 30000)

      await GasOrderContract.createOrder(
        100,
        Math.floor(Date.now() / 1000) + 864000,
        [TokenContract.target, 10000],
        [TokenContract.target, 100],
        [TokenContract.target, 10000]
      )
      // @todo add more asserts statements
      await GasOrderContract.retrievePrepay(admin.address, 0, 100)
      const gasTokensBalance = await GasOrderContract.balanceOf(admin.address, 0)
      expect(
        gasTokensBalance
      ).to.equal("0");
    });
  });
});