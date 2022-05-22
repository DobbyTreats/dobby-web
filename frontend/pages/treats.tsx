import { Title } from "@mantine/core"
import { NextPage } from "next"
import Layout from "../components/layout"

const Treat: NextPage = () => {
  return (
    <Layout>
      <Title>Your DobbyTreat balance</Title>
      <hr />
      <Title>Convert DobbyTreat's to DobbyToken</Title>
    </Layout>
  )
}

export default Treat
