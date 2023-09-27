const { time } = require("@nomicfoundation/hardhat-network-helpers");

const CONSTANTS = require("../constants/index.js");
// @notice `executor` should has tokens on the balance
async function createOrder(
    orderCreator,
    gasContract,
    tokenContract,
    isAccepted = false,
    executor,
    possibleExecutionStart = 36000,
    possibleExecutionDeadline = 864000,
    increaseTime = 0,
) {
    const latestTime = await time.latest();

    await tokenContract.connect(orderCreator).approve(gasContract.target, CONSTANTS.INITIAL_EXECUTOR_REWARD + CONSTANTS.GAS_COST * CONSTANTS.GAS_AMOUNT)
    await gasContract.connect(orderCreator).createOrder(
        CONSTANTS.GAS_AMOUNT,
        latestTime + possibleExecutionStart,
        latestTime + possibleExecutionDeadline,
        40,
        true,
        [tokenContract.target, CONSTANTS.INITIAL_EXECUTOR_REWARD],
        [tokenContract.target, CONSTANTS.GAS_COST],
        [tokenContract.target, CONSTANTS.LOCKED_GUARANTEE_PER_GAS],
        CONSTANTS.INITIAL_EXECUTOR_REWARD,
        CONSTANTS.GAS_COST * CONSTANTS.GAS_AMOUNT
    )

    if(isAccepted) {
        await tokenContract.connect(executor).approve(gasContract.target, CONSTANTS.GAS_AMOUNT * CONSTANTS.LOCKED_GUARANTEE_PER_GAS)
        // @notice the maximum value is `100`
        const ordersAmount = await gasContract.totalMatchingOrdersCount(
            ethers.ZeroAddress,
            0 // OrderStatus.None
        );

        // Accepting order
        await gasContract.connect(executor).acceptOrder(parseInt(ordersAmount) - 1, CONSTANTS.GAS_AMOUNT * CONSTANTS.LOCKED_GUARANTEE_PER_GAS);
    }
    
    if (increaseTime != 0) {
      await time.increase(increaseTime);
    }
}

module.exports = { createOrder };