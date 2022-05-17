import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { DobbyToken__factory, DobbyToken } from "../../frontend/types/typechain/index"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import common from "../common/index"

chai.use(chaiAsPromised)
const { expect } = chai

describe("[DobbyToken Contract]", function () {
  const totalSupply: string = ethers.utils.parseEther(common.totalSupplyEthers).toString() // 1 million
  let dobbytoken: DobbyToken

  // Toy signers
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let addrs: SignerWithAddress[]

  beforeEach(async function () {
    const dobbytokenFactory = ((await ethers.getContractFactory("DobbyToken")) as unknown) as DobbyToken__factory
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    dobbytoken = await dobbytokenFactory.deploy(totalSupply)
    await dobbytoken.deployed()
  })

  describe("deployment", function () {
    it("should assign the total supply of tokens to the owner", async function () {
      const ownerBalance: BigNumber = await dobbytoken.balanceOf(owner.address)
      expect(await dobbytoken.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe("transactions", function () {
    it("should transfer tokens between accounts", async function () {
      const ownerBalance: BigNumber = await dobbytoken.balanceOf(owner.address)

      // Transfer 50 tokens from owner to addr1
      await dobbytoken.transfer(addr1.address, 50)
      const addr1Balance: BigNumber = await dobbytoken.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(50)

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await dobbytoken.connect(addr1).transfer(addr2.address, 50)
      const addr2Balance: BigNumber = await dobbytoken.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(50)

      // Owner should have 50 tokens less now
      const ownerBalanceNew: BigNumber = await dobbytoken.balanceOf(owner.address)
      expect(ownerBalanceNew).to.equal(ownerBalance.sub(50))
    })

    it("should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance: BigNumber = await dobbytoken.balanceOf(owner.address)

      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(dobbytoken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      )

      // Owner balance shouldn't have changed.
      expect(await dobbytoken.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })
  })
})
