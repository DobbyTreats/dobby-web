import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { DobbyDEX__factory, DobbyDEX, DobbyToken } from "../../frontend/types/typechain/index"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import common from "../common/index"

chai.use(chaiAsPromised)
const { expect } = chai

describe("[DobbyDEX Contract]", function () {
  const totalSupply: string = ethers.utils.parseEther(common.totalSupplyEthers).toString() // 1 million
  let dobbydex: DobbyDEX
  let dobbytoken: DobbyToken

  // Toy signers
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress
  let addrs: SignerWithAddress[]

  beforeEach(async function () {
    const dobbydexFactory = ((await ethers.getContractFactory("DobbyDEX")) as unknown) as DobbyDEX__factory
    ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    dobbydex = await dobbydexFactory.deploy(totalSupply)
    await dobbydex.deployed()
    dobbytoken = (await ethers.getContractAt("DobbyToken", await dobbydex.dobbyTokenAddress())) as DobbyToken
  })

  describe("exchange", function () {
    it("should allow someone to sell", async function () {
      const price = await dobbydex.price()

      // buy some tokens
      await dobbydex.buy({ value: ethers.utils.formatEther(price.mul(50).mul(10 ** 18)) })

      // give addr1 some dobby tokens
      await dobbytoken.transfer(addr1.address, 50)
      expect(await dobbytoken.balanceOf(addr1.address)).to.equal(50)

      // sell half of it
      const initialBalanceEther: BigNumber = await addr1.getBalance()
      await dobbydex.connect(addr1).sell(25)
      expect(await dobbytoken.balanceOf(addr1.address)).to.equal(25)
      expect(await dobbytoken.balanceOf(dobbydex.address)).to.equal(25)
      const newBalanceEther: BigNumber = await addr1.getBalance()

      // addr1 should have more ether
      expect(initialBalanceEther < newBalanceEther)

      // the difference should equal to the price
      expect(price.mul(25).add(initialBalanceEther)).to.equal(newBalanceEther)
    })
  })
})
