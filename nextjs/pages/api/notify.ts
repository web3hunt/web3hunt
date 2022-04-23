import EpnsSDK from "@epnsproject/backend-sdk-staging";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { IRON_OPTIONS } from "../../constants/api.const";

const epnsSdk = new EpnsSDK(String(process.env.KOVAN_PRIVATE_KEY), {
  channelAddress: String(process.env.EPNS_CHANNEL_ID),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      console.log(req.body);
      const title = req.body.title;
      const message = req.body.message;
      const recipients = req.body.recipients;
      console.log({ title, message });

      try {
        await sendNotification(title, message, recipients);
        res.json({ ok: true });
      } catch (error) {
        console.log(error);
        res.json({ ok: false });
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, IRON_OPTIONS);

async function sendNotification(
  title: string,
  message: string,
  recipients?: string[]
) {
  const image = "";
  const cta = undefined;
  const channelId = String(process.env.EPNS_CHANNEL_ID);

  const recipientAddress = recipients ? recipients.join(",") : channelId;

  // eslint-disable-next-line id-length
  const tx = await epnsSdk.sendNotification(
    recipientAddress,
    title,
    message,
    title,
    message,
    3, //this is the notificationType
    cta, // a url for users to be redirected to
    image, // an image url, or an empty string
    null //this can be left as null
  );

  return tx;
}
