import { ethers } from "hardhat"
import common from "../common/index"

// NOTE: this is just for testing; actual tokens are deployed by the DEX

async function main() {
  console.log(`\n[DobbyToken Contract]`)
  const factory = await ethers.getContractFactory("DobbyToken")
  let contract = await factory.deploy(ethers.utils.parseEther(common.totalSupplyEthers))
  console.log(`\tDeploying... (tx: ${contract.deployTransaction.hash})`)
  await contract.deployed()
  // remove last line
  process.stdout.moveCursor(0, -1)
  process.stdout.clearLine(1)
  console.log(`\tDobbyToken Contract is deployed at ${contract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
