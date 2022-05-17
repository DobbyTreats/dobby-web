import { ethers } from "hardhat"

async function main() {
  console.log(`\n[DobbyTreats Contract]`)
  const factory = await ethers.getContractFactory("DobbyTreats")
  let contract = await factory.deploy()
  console.log(`\tDeploying... (tx: ${contract.deployTransaction.hash})`)
  await contract.deployed()
  // remove last line
  process.stdout.moveCursor(0, -1)
  process.stdout.clearLine(1)
  console.log(`\DobbyTreats Contract is deployed at ${contract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
