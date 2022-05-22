import { NextApiRequest, NextApiResponse } from "next"

// TODO: Dobby Treat metadata will be served from here
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" })
}
