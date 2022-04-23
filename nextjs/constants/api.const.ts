export const IRON_OPTIONS = {
  cookieName: "siwe",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const WEB3_HUNT_CONTRACT=process.env.NEXT_PUBLIC_WEB3_HUNT_CONTRACT || "0x0";

export enum CMSAction {
  CREATE_WEBSITE = "0x0000",
  CREATE_PROJECT = "0x0100",
  UPVOTE_PROJECT = "0x0101",
  UPDATE_PROJECT = "0x0102",
}