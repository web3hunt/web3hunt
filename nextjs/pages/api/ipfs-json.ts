import { NextApiRequest, NextApiResponse } from 'next'
import {pinata} from "../../utils/pinata";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    default:
    case 'POST': {
      const { ipfsHash } = req.body
      const ipfsJson = await pinata.pinJSONToIPFS(ipfsHash)
      res.status(200).json(ipfsJson)
      break
    }
  }
}
