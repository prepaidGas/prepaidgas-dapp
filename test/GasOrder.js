const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

//@todo setup pretifier

describe("GasOrder", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  // @todo move init setup to helpers
  // @todo make it test/deployment agnostic
  const SYSTEM_FEE = 1000; // 100 = 1%
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
    
    await GasOrderContract.setFee(SYSTEM_FEE);

    return {accounts, admin, ExecutorContract, GasOrderContract, TokenContract};
  }

  describe("Order operations", function () {
    // common constants declaration
    // @todo convert to bignumber
    // @todo move to separate file
    let [
      INITIAL_EXECUTOR_REWARD,
      GAS_COST,
      LOCKED_GUARANTEE_PER_GAS,
      GAS_AMOUNT
    ] = [
      200,
      100,
      100,
      2000
    ];
    
    it("Should create a new order", async function () {
      const {admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);
      // @todo move to helper
      await TokenContract.approve(GasOrderContract.target, INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT )

      const tokensBalanceBefore = await TokenContract.balanceOf(admin.address);

      const latestTime = await time.latest();

      await GasOrderContract.createOrder(
        GAS_AMOUNT,
        latestTime + 36000,
        latestTime + 864000,
        40,
        true,
        [TokenContract.target, INITIAL_EXECUTOR_REWARD],
        [TokenContract.target, GAS_COST],
        [TokenContract.target, LOCKED_GUARANTEE_PER_GAS],
        INITIAL_EXECUTOR_REWARD,
        GAS_COST * GAS_AMOUNT
      )
      const tokensBalanceAfter = await TokenContract.balanceOf(admin.address);

      // @todo add more asserts statements
      expect(
        tokensBalanceBefore - tokensBalanceAfter
      ).to.equal(INITIAL_EXECUTOR_REWARD + (GAS_COST * GAS_AMOUNT));
    });

    it("Should close order and send back prepaid fund for unspent Gas", async function () {
      const {admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      // @todo move to helper
      await TokenContract.approve(GasOrderContract.target, INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT)

      const tokensBalanceBefore = await TokenContract.balanceOf(admin.address);

      const latestTime = await time.latest();

      await GasOrderContract.createOrder(
        GAS_AMOUNT,
        latestTime + 36000,
        latestTime + 865000,
        40,
        true,
        [TokenContract.target, INITIAL_EXECUTOR_REWARD],
        [TokenContract.target, GAS_COST],
        [TokenContract.target, LOCKED_GUARANTEE_PER_GAS],
        INITIAL_EXECUTOR_REWARD,
        GAS_COST * GAS_AMOUNT
      )

      await time.increase(36001);
      
      const tokensBalanceAfter = await TokenContract.balanceOf(admin.address);

      await GasOrderContract.revokeOrder(0);

      const tokensBalanceAfterRepay = await TokenContract.balanceOf(admin.address);

      // @todo add more asserts statements
      expect(
        tokensBalanceBefore - tokensBalanceAfter
      ).to.equal(INITIAL_EXECUTOR_REWARD + (GAS_COST * GAS_AMOUNT));

      expect(
        tokensBalanceBefore
      ).to.equal(tokensBalanceAfterRepay);
    });

    it("Executor should accept a new order", async function () {
      const {accounts, admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      await TokenContract.approve(GasOrderContract.target, INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT)

      const latestTime = await time.latest();

      await GasOrderContract.createOrder(
        GAS_AMOUNT,
        latestTime + 36000,
        latestTime + 864000,
        40,
        true,
        [TokenContract.target, INITIAL_EXECUTOR_REWARD],
        [TokenContract.target, GAS_COST],
        [TokenContract.target, LOCKED_GUARANTEE_PER_GAS],
        INITIAL_EXECUTOR_REWARD,
        GAS_COST * GAS_AMOUNT
      )

      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS);
      let withdrawableAmount = INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)/10000;
      await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount);

      const tokensBalanceAfter = await TokenContract.balanceOf(accounts[0].address)
      
      const amountOfERC1155GasTokens = await GasOrderContract.balanceOf(admin.address, 0);
      
      expect(
        tokensBalanceAfter
      ).to.equal(withdrawableAmount);

      expect(
        amountOfERC1155GasTokens
      ).to.equal(GAS_AMOUNT);
    });

    it("Should fail to retrive prepaid tokens from order if not enough ERC1155 Gas tokens on balance", async function () {
      const {accounts, admin, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      await TokenContract.approve(GasOrderContract.target, INITIAL_EXECUTOR_REWARD + GAS_COST * GAS_AMOUNT)

      const latestTime = await time.latest();
      await GasOrderContract.createOrder(
        GAS_AMOUNT,
        latestTime + 36000,
        latestTime + 864000,
        40,
        true,
        [TokenContract.target, INITIAL_EXECUTOR_REWARD],
        [TokenContract.target, GAS_COST],
        [TokenContract.target, LOCKED_GUARANTEE_PER_GAS],
        INITIAL_EXECUTOR_REWARD,
        GAS_COST * GAS_AMOUNT
      )

      await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
      await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

      // Accepting order
      await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS);
      let withdrawableAmount = INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)/10000;
      await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount);

      await GasOrderContract.connect(admin).safeTransferFrom(admin.address, accounts[0].address, 0, GAS_AMOUNT, '0x');

      const txToBeReverted = GasOrderContract.connect(admin).retrieveGasCost(admin.address, 0, GAS_AMOUNT)

      await expect(
        txToBeReverted
      ).to.be.reverted;
    });
  });
});