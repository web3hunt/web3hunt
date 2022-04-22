import {BigInt, Bytes} from "@graphprotocol/graph-ts";
import {StateChange} from "../../../generated/Web3HuntContentManager/Web3HuntContentManager";

export function buildEntityIdFromEvent(event: StateChange) : string {
  const noun = event.params.data.toHex().slice(3, 4)
  let txHash = event.transaction.hash.slice(0);
  const bigEndianTxHash = txHash.reverse()
  const txHashAsBigInt = BigInt.fromUnsignedBytes(Bytes.fromUint8Array(bigEndianTxHash))
  const entityIdAsBigInt = txHashAsBigInt.plus(event.logIndex)
  return noun + entityIdAsBigInt.toHex().slice(2).padStart(65, '0')
}

export function buildMappingTableId(leftId: string, rightId: string) : string {
  return leftId + rightId;
}


export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
