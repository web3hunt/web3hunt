import { NextApiRequest, NextApiResponse } from 'next'
import {pinata} from "../../utils/pinata";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  const { method } = req;
  switch (method) {
    case 'POST': {
      const { projectBody } = req.body
      const ipfsJson = await pinata.pinJSONToIPFS(projectBody)
      res.status(200).json(ipfsJson)
      break
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
