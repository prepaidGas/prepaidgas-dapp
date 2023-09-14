const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { config, ethers } = require("hardhat");


// @todo setup pretifier
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
    200000
];

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

    // Create and accept order

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

    await time.increase(36001);

    await TokenContract.transfer(accounts[0].address, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)
    await TokenContract.connect(accounts[0]).approve(GasOrderContract.target, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS)

    await GasOrderContract.connect(accounts[0]).acceptOrder(0, GAS_AMOUNT * LOCKED_GUARANTEE_PER_GAS);
    let withdrawableAmount = INITIAL_EXECUTOR_REWARD * (10000 - SYSTEM_FEE)/10000;
    await GasOrderContract.connect(accounts[0]).claim(TokenContract.target, withdrawableAmount);

    return {accounts, admin, ExecutorContract, GasOrderContract, TokenContract};
  }

  describe("Execution contract", function () {
    it("Transaction should be executed", async function () {
      const {accounts, admin, ExecutorContract, GasOrderContract, TokenContract} = await loadFixture(initialSetup);


      /*
      const verificationTest = ethers.verifyMessage(encodedMessage, signedMessage);
      console.log("verification ", verificationTest)
      console.log("v1: ", signedMessage)
      console.log("true executor: ", accounts[1].address)
      */
      // increase allowance
      const msgHash = await ExecutorContract.messageHash(
        [
            admin.address,
            1,
            0,
            admin.address,
            1630000000,
            "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
            200000,
            "0xabcdef"
        ],
      );


      const domain = {
        name: "Prepaid Gas",
        version: "0.0.1",
        chainId: 31337,
        verifyingContract: ExecutorContract.target
      };
      const types = {
        Message: [
          {name: "from", type: "address"},
          {name: "nonce", type: "uint256"},
          {name: "gasOrder", type: "uint256"},
          {name: "onBehalf", type: "address"},
          {name: "deadline", type: "uint256"},
          {name: "to", type: "address"},
          {name: "gas", type: "uint256"},
          {name: "data", type: "bytes"}
        ]
      };
      const dataObject = {
        from: admin.address,
        nonce: 1,
        gasOrder: 0,
        onBehalf: admin.address,
        deadline: 1630000000,
        to: "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
        gas: 200000,
        data: "0xabcdef"
      };

      const signedTypedData = await admin.signTypedData(domain, types, dataObject);
      console.log("signed typed data: ", signedTypedData)
      console.log("msg hash", msgHash)
      console.log("verify typed data: ", ethers.verifyTypedData(domain, types, dataObject, signedTypedData))
      console.log(ethers.recoverAddress(msgHash, signedTypedData))// @todo properly generate msg Hash to be able to verify it afterwards

      await ExecutorContract.connect(admin).execute([
        admin.address,
        1,
        0,
        admin.address,
        1630000000,
        "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
        200000,
        "0xabcdef",
      ], signedTypedData)


    });

    it("Transaction should revert due to executed nonce", async function () {
      const {admin, ExecutorContract, GasOrderContract, TokenContract} = await loadFixture(initialSetup);

      const domain = {
        name: "Prepaid Gas",
        version: "0.0.1",
        chainId: 31337,
        verifyingContract: ExecutorContract.target
      };
      const types = {
        Message: [
          {name: "from", type: "address"},
          {name: "nonce", type: "uint256"},
          {name: "gasOrder", type: "uint256"},
          {name: "onBehalf", type: "address"},
          {name: "deadline", type: "uint256"},
          {name: "to", type: "address"},
          {name: "gas", type: "uint256"},
          {name: "data", type: "bytes"}
        ]
      };
      const dataObject = {
        from: admin.address,
        nonce: 1,
        gasOrder: 0,
        onBehalf: admin.address,
        deadline: 1630000000,
        to: "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
        gas: 200000,
        data: "0xabcdef"
      };

      const signedTypedData = await admin.signTypedData(domain, types, dataObject);      

      await ExecutorContract.connect(admin).execute([
        admin.address,
        1,
        0,
        admin.address,
        1630000000,
        "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
        200000,
        "0xabcdef",
      ], signedTypedData)

      const txWithExhaustedNonce = ExecutorContract.connect(admin).execute([
        admin.address,
        1,
        0,
        admin.address,
        1630000000,
        "0x1ABC7154748D1CE5144478CDEB574AE244B939B5",
        200000,
        "0xabcdef",
      ], signedTypedData)

      await expect(txWithExhaustedNonce).to.be.revertedWithCustomError(ExecutorContract, "NonceExhausted");
    });
  });
});