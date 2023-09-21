const { time } = require("@nomicfoundation/hardhat-network-helpers");

const CONSTANTS = require("../constants/index.js");

async function createOrder(
    orderCreator,
    gasContract,
    tokenContract,
    possibleExecutionStart = 36000,
    possibleExecutionDeadline = 864000,
    increaseTime = 0
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
    
    if (increaseTime != 0) {
      await time.increase(increaseTime);
    }
}

module.exports = { createOrder };