import { ethers } from "hardhat"
import { DobbyToken } from "../../frontend/types/typechain"
import common from "../common/index"
import { deployDobbyDEX, deployDobbyToken, deployDobbyTreats } from "./_deployments"

async function main() {
  const dobbyTokenAddress: string = await deployDobbyToken(ethers.utils.parseEther(common.totalSupplyEthers))
  const dobbyDEXAddress: string = await deployDobbyDEX(dobbyTokenAddress)
  await deployDobbyTreats(dobbyTokenAddress, common.treatsSupply)

  console.log("\nTransferring tokens to DobbyToken...")
  let [owner, ...addrs] = await ethers.getSigners()
  const dobbytoken = (await ethers.getContractAt("DobbyToken", dobbyTokenAddress)) as DobbyToken
  await dobbytoken.connect(owner).transfer(dobbyDEXAddress, ethers.utils.parseEther(common.totalSupplyEthers))
  console.log("\nDone.")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
