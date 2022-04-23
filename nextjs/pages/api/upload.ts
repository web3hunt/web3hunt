import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { IRON_OPTIONS } from "../../constants/api.const";
import { Web3Storage, File } from 'web3.storage';

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const { fileName, payload } = req.body;
      const payloadBuffer = Buffer.from(payload)
      const payloadFile = new File([payloadBuffer], fileName)
      const client = new Web3Storage({ token: `${getAccessToken()}` })
      try {
        var filecoinUpload = await client.put([payloadFile], {
          name: fileName,
          maxRetries: 3
        })
        res.setHeader("Content-Type", "text/plain");
        res.send(filecoinUpload);
      } catch {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, IRON_OPTIONS);
