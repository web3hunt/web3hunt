import pinataSDK from '@pinata/sdk'
import {PINATA_API_KEY, PINATA_API_SECRET} from "../constants/api.const";

export const pinata = pinataSDK(
  PINATA_API_KEY,
  PINATA_API_SECRET
)
