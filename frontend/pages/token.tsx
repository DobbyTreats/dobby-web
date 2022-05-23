import { Button, LoadingOverlay, NumberInput, Space, Title } from "@mantine/core"
import { BigNumber } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import getNetwork from "../constants/networks"
import { useWeb3Context } from "../context/web3.context"
import {
  DobbyToken as DobbyTokenType,
  DobbyToken__factory,
  DobbyDEX as DobbyDEXType,
  DobbyDEX__factory,
} from "../types/typechain"
import notify from "../utils/notify"

// Contract deployment address(es)
const DOBBY_TOKEN_ADDRESS: Readonly<{ [network: string]: string }> = {
  localhost: "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1",
}
const DOBBY_DEX_ADDRESS: Readonly<{ [network: string]: string }> = {
  localhost: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
}

const Token: NextPage = () => {
  // wallet and contract
  const { wallet } = useWeb3Context()
  const [dobbytoken, setDobbytoken] = useState<DobbyTokenType>()
  const [dobbydex, setDobbydex] = useState<DobbyDEXType>()
  // contract view states
  const [balance, setBalance] = useState<string>("0")
  const [amountToSell, setAmountToSell] = useState<BigNumber>(BigNumber.from(0))
  const [amountToBuy, setAmountToBuy] = useState<BigNumber>(BigNumber.from(0))

  // on wallet load
  useEffect(() => {
    if (wallet) {
      const network = getNetwork(wallet.chainId)
      if (!(network.chainName in DOBBY_TOKEN_ADDRESS) || !(network.chainName in DOBBY_DEX_ADDRESS)) {
        notify("Contract Not Found", "This contract is not in the network: " + network.chainName, "error")
      } else {
        if (dobbytoken) setDobbytoken(undefined)
        if (dobbydex) setDobbydex(undefined)
        setDobbytoken(
          DobbyToken__factory.connect(DOBBY_TOKEN_ADDRESS[network.chainName], wallet.library.getSigner(wallet.address))
        )
        setDobbydex(
          DobbyDEX__factory.connect(DOBBY_DEX_ADDRESS[network.chainName], wallet.library.getSigner(wallet.address))
        )
        notify("Contract Connected", "Connected to " + DOBBY_TOKEN_ADDRESS[network.chainName], "success")
        notify("Contract Connected", "Connected to " + DOBBY_DEX_ADDRESS[network.chainName], "success")
      }
    } else {
      if (dobbytoken) setDobbytoken(undefined)
      if (dobbydex) setDobbydex(undefined)
    }
  }, [wallet])

  // on contract load
  useEffect(() => {
    if (dobbytoken && wallet) {
      // initial gets
      dobbytoken.balanceOf(wallet.address).then(
        (bal) => setBalance(bal.toString()),
        (err) => notify("balanceOf", err.message, "error")
      )
    }
  }, [dobbytoken])

  const handleBuy = async () => {
    if (dobbydex) {
      const price = await dobbydex.price()
      const etherValue = amountToBuy.mul(price).toString()
      await dobbydex.buy({ value: etherValue })
      notify("Dobby Token", `You have bought ${amountToBuy} DobbyToken's for ${etherValue}.`, "success")
    }
  }

  const handleSell = async () => {}
  return (
    <Layout>
      {dobbytoken ? (
        <>
          <Title>Balance:</Title>
          <Title> {balance.toString()} DOBBI</Title>

          <Space h="lg" />
          <NumberInput
            label={<Title>Sell DobbyToken</Title>}
            value={amountToSell.toNumber()}
            onChange={(v) => setAmountToSell(BigNumber.from(v))}
            rightSection={<Button onClick={handleSell}>Sell</Button>}
          />
          <Space h="lg" />
          <NumberInput
            label={<Title>Buy DobbyToken</Title>}
            value={amountToBuy.toNumber()}
            onChange={(v) => setAmountToBuy(BigNumber.from(v))}
            rightSection={<Button onClick={handleBuy}>Buy</Button>}
          />
        </>
      ) : (
        <Title>Your wallet is not connected.</Title>
      )}
    </Layout>
  )
}

export default Token
