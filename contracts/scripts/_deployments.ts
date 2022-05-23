import { BaseContract, BigNumber } from "ethers"
import { ethers } from "hardhat"
import { DobbyDEX__factory, DobbyToken__factory, DobbyTreats__factory } from "../../frontend/types/typechain"

/**
 * Deploys a contract, waits for its deployment to be complete and returns the address.
 * @param {BaseContract} contract contract to be deployed
 * @returns {string} contract address
 */
async function deploy(contract: BaseContract): Promise<string> {
  console.log(`\tDeploying... (tx: ${contract.deployTransaction.hash})`)
  await contract.deployed()
  process.stdout.moveCursor(0, -1)
  process.stdout.clearLine(1)
  console.log(`\tContract is deployed at ${contract.address}`)

  return contract.address
}

export async function deployDobbyDEX(dobbyTokenAddress: string): Promise<string> {
  console.log(`\n[DobbyDEX Contract]`)
  const factory = (await ethers.getContractFactory("DobbyDEX")) as DobbyDEX__factory
  let contract = await factory.deploy(dobbyTokenAddress)
  return await deploy(contract)
}

export async function deployDobbyToken(totalSupply: BigNumber): Promise<string> {
  console.log(`\n[DobbyToken Contract]`)
  const factory = (await ethers.getContractFactory("DobbyToken")) as DobbyToken__factory
  let contract = await factory.deploy(totalSupply)
  return await deploy(contract)
}

export async function deployDobbyTreats(dobbyTokenAddress: string, totalSupply: number): Promise<string> {
  console.log(`\n[DobbyTreats Contract]`)
  const factory = (await ethers.getContractFactory("DobbyTreats")) as DobbyTreats__factory
  let contract = await factory.deploy(dobbyTokenAddress, totalSupply)
  return await deploy(contract)
}
