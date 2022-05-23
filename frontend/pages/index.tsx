import type { NextPage } from "next"
import Layout from "../components/layout"
import { Center, Text, Title, Anchor, Button, Group, Badge, Box, useMantineTheme } from "@mantine/core"
import Hero from "../components/hero"
import { Code, Rocket } from "tabler-icons-react"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <Layout>
      <Box>
        <Link href="/token">Token</Link>
      </Box>
    </Layout>
  )
}

export default Home
