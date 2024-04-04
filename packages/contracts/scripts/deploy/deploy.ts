import { ethers } from "hardhat"

import { getDeployAddress } from "../helpers/deploy"
import { NAME, VERSION } from "../common/constants"

async function deploy() {
  const [admin] = await ethers.getSigners()
  const network = await ethers.getDefaultProvider().getNetwork()

  console.log("Network name", network.name)
  console.log("Network chain id", network.chainId)

  const Treasury = await ethers.getContractFactory("Treasury")
  const PrepaidGas = await ethers.getContractFactory("PrepaidGas")

  const [treasuryExpected, pgasExpected] = [
    await getDeployAddress(admin.address, 0),
    await getDeployAddress(admin.address, 1),
  ]

  const treasury = await Treasury.deploy(pgasExpected)
  const pgas = await PrepaidGas.deploy(treasuryExpected, admin.address, NAME, VERSION)

  console.log("Treasury deployed", treasury.target)
  console.log("PrepaidGas deployed", pgas.target)

  if (treasury.target != treasuryExpected || pgas.target != pgasExpected) throw "Deploy Consistency Break"
}

deploy().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
