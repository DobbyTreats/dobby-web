import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { Counter__factory, Counter } from "../../frontend/types/typechain/index"

chai.use(chaiAsPromised)
const { expect } = chai

describe("[Counter Contract]", () => {
  let counter: Counter

  beforeEach(async () => {
    const signers = await ethers.getSigners()

    const counterFactory = ((await ethers.getContractFactory("Counter", signers[0])) as unknown) as Counter__factory
    counter = await counterFactory.deploy()
    await counter.deployed()
  })

  describe("deployment", function () {
    it("should have count 0", async function () {
      expect(await counter.getCount()).to.equal(0)
    })
  })

  describe("counting up", async () => {
    it("should count up", async () => {
      await counter.countUp()
      expect(await counter.getCount()).to.eq(1)
    })
  })

  describe("counting down", async () => {
    it("should fail due to underflow exception", () => {
      return expect(counter.countDown()).to.eventually.be.rejectedWith(
        Error,
        "VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)"
      )
    })

    it("should count down", async () => {
      await counter.countUp()
      await counter.countDown()
      expect(await counter.getCount()).to.eq(0)
    })
  })
})
