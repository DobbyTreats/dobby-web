import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { DobbyTreats__factory, DobbyTreats } from "../../frontend/types/typechain/index"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"

chai.use(chaiAsPromised)
const { expect } = chai

describe("[DobbyTreats Contract]", function () {
  let dobbytreats: DobbyTreats

  // Treat data
  const _name = "DobbyTreats"
  const _symbol = "DOBBY"

  // Toy signers
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addrs: SignerWithAddress[]

  beforeEach(async function () {
    const dobbytreatsFactory = ((await ethers.getContractFactory("DobbyTreats")) as unknown) as DobbyTreats__factory
    ;[owner, addr1, ...addrs] = await ethers.getSigners()
    dobbytreats = await dobbytreatsFactory.deploy()
    await dobbytreats.deployed()
  })

  describe("deployment", function () {
    it("should have the correct name and symbol ", async function () {
      expect(await dobbytreats.name()).to.equal(_name)
      expect(await dobbytreats.symbol()).to.equal(_symbol)
    })

    it("should have the correct total supply", async function () {
      expect(await dobbytreats.totalSupply()).to.equal(BigNumber.from(10000))
    })
  })

  describe("minting", function () {
    it("should mint a token with token ids 1 and 2 to account1", async function () {
      const address1 = addr1.address
      await dobbytreats.mintNFT(address1)
      expect(await dobbytreats.ownerOf(1)).to.equal(address1)

      await dobbytreats.mintNFT(address1)
      expect(await dobbytreats.ownerOf(2)).to.equal(address1)

      expect(await dobbytreats.balanceOf(address1)).to.equal(2)
    })
  })
})
