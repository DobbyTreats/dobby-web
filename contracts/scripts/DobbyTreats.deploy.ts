import { ethers } from "hardhat"
import common from "../common"
import { deployDobbyTreats, deployDobbyToken } from "./deployments"

async function main() {
  const dobbyTokenAddress: string = await deployDobbyToken(ethers.utils.parseEther(common.totalSupplyEthers))
  await deployDobbyTreats(dobbyTokenAddress, common.treatsSupply)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
