import { ethers } from "hardhat"
import common from "../common/index"

async function main() {
  console.log(`\n[DobbyDEX Contract]`)
  const factory = await ethers.getContractFactory("DobbyDEX")
  let contract = await factory.deploy(ethers.utils.parseEther(common.totalSupplyEthers))
  console.log(`\tDeploying... (tx: ${contract.deployTransaction.hash})`)
  await contract.deployed()
  // remove last line
  process.stdout.moveCursor(0, -1)
  process.stdout.clearLine(1)
  console.log(`\DobbyDEX Contract is deployed at ${contract.address}`)
  console.log(`\DobbyDEX Contract has deployed DobbyToken at ${await contract.dobbyTokenAddress()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
