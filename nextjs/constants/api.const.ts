export const IRON_OPTIONS = {
  cookieName: 'siwe',
  password: 'voawefnvoyagfvnfgjossfiwbvny2aowe4qnvidfbfiso',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const WEB3_HUNT_CONTRACT=process.env.NEXT_PUBLIC_WEB3_HUNT_CONTRACT || "0x0";


export const WEB3_HUNT_WEBSITE_OPTIMISM_KOVAN=process.env.NEXT_PUBLIC_WEB3_HUNT_WEBSITE_OPTIMISM_KOVAN || "0x0";
export const WEB3_HUNT_WEBSITE_MUMBAI=process.env.NEXT_PUBLIC_WEB3_HUNT_WEBSITE_MUMBAI || "0x0";
export const WEB3_HUNT_WEBSITE_RINKEBY=process.env.NEXT_PUBLIC_WEB3_HUNT_WEBSITE_RINKEBY || "0x0";

export enum CMSAction {
  CREATE_WEBSITE = "0x0000",
  CREATE_PROJECT = "0x0100",
  UPVOTE_PROJECT = "0x0101",
  UPDATE_PROJECT = "0x0102",
}
export const SUBGRAPH_OPTIMISM_KOVAN=process.env.NEXT_PUBLIC_SUBGRAPH_OPTIMISM_KOVAN || "https://api.thegraph.com/subgraphs/name/subgraphs/web3-hunt-optimistic-kovan"
export const SUBGRAPH_MUMBAI=process.env.NEXT_PUBLIC_SUBGRAPH_MUMBAI || "https://api.thegraph.com/subgraphs/name/web3hunt/web3-hunt-polygon-mumbai"
export const SUBGRAPH_RINKEBY=process.env.NEXT_PUBLIC_SUBGRAPH_RINKEBY || "https://api.thegraph.com/subgraphs/name/web3hunt/web3hunt"


export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
export const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET || "";