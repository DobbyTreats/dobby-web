import type { NextPage } from "next"
import Layout from "../components/layout"
import { Center, Text, Title, Anchor, Button, Group, Badge, Box, useMantineTheme } from "@mantine/core"
import Hero from "../components/hero"
import { Code, Rocket } from "tabler-icons-react"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <Box>
          <Title>Your DobbyToken Balance</Title>
          <Text>01234</Text>
          <Text>Buy more!</Text>
        </Box>
        <Box>
          <Title>Your DobbyTreats Balance</Title>
        </Box>
      </>
    </Layout>
  )
}

export default Home
