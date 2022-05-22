import { LoadingOverlay, Title } from "@mantine/core"
import { BigNumber } from "ethers"
import { NextPage } from "next"
import { useEffect, useMemo, useState } from "react"
import Layout from "../components/layout"
import getNetwork from "../constants/networks"
import { useWeb3Context } from "../context/web3.context"
import { DobbyToken as DobbyTokenType, DobbyToken__factory } from "../types/typechain"
import notify from "../utils/notify"

// Contract deployment address(es)
const CONTRACT_ADDRESS: Readonly<{ [network: string]: string }> = {
  localhost: "", // @todo
}

const Token: NextPage = () => {
  // wallet and contract
  const { wallet } = useWeb3Context()
  const [dobbytoken, setDobbytoken] = useState<DobbyTokenType>()
  // contract view states
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

  // on wallet load
  useEffect(() => {
    if (wallet) {
      const network = getNetwork(wallet.chainId)
      if (!(network.chainName in CONTRACT_ADDRESS)) {
        notify("Contract Not Found", "This contract is not in the network: " + network.chainName, "error")
      } else {
        if (dobbytoken) setDobbytoken(undefined)
        setDobbytoken(
          DobbyToken__factory.connect(CONTRACT_ADDRESS[network.chainName], wallet.library.getSigner(wallet.address))
        )
        notify("Contract Connected", "Connected to " + CONTRACT_ADDRESS[network.chainName], "success")
      }
    } else {
      if (dobbytoken) setDobbytoken(undefined)
    }
  }, [wallet])

  // on contract load
  useEffect(() => {
    if (dobbytoken) {
      // initial gets
      dobbytoken.balanceOf(wallet!.address).then(
        (bal) => setBalance(bal),
        (err) => notify("balanceOf", err.message, "error")
      )
    }
  }, [dobbytoken])

  return (
    <Layout>
      {dobbytoken ? (
        <>
          <Title>Your DobbyToken balance: {balance.toString()} DOBBY</Title>
          <hr />
          <Title>Swap DobbyToken with Ether</Title>
        </>
      ) : (
        <LoadingOverlay visible />
      )}
    </Layout>
  )
}

export default Token
