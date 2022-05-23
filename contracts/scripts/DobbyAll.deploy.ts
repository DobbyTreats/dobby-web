import { ethers } from "hardhat"
import common from "../common/index"
import { deployDobbyDEX, deployDobbyToken, deployDobbyTreats } from "./_deployments"

async function main() {
  const dobbyTokenAddress: string = await deployDobbyToken(ethers.utils.parseEther(common.totalSupplyEthers))
  await deployDobbyDEX(dobbyTokenAddress)
  await deployDobbyTreats(dobbyTokenAddress, common.treatsSupply)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
