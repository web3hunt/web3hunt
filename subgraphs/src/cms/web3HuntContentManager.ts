import {Bytes, log} from "@graphprotocol/graph-ts"
import {createProject, upvoteProject} from "./lib/project"
import {initWebsite} from "./lib/website"
import {buildEntityIdFromEvent} from "./lib/utils"
import {StateChange} from "../../generated/Web3HuntContentManager/Web3HuntContentManager";
import { encode } from "as-base58"

export function handleStateChange(event: StateChange): void {

  // event.params.data has starting 0x and then header and body.
  // first 4 characters are header, rest is body
  const header = event.params.data.toHex().slice(2, 6)
  // header byte 1 is the noun (space, project, platform, content) byte 2 is the verb (create, assign, unassign, approve, revoke)
  const noun = header.slice(0, 2)
  const verb = header.slice(2, 4)
  const eventAuthor = event.params.author.toHexString()
  log.info("noun: {}, verb: {} author: {}", [noun.toString(), verb.toString(), eventAuthor])

  // init website with sender as owner
  if (noun.toString() == "00" && verb.toString() == "00") {
    const websiteId = buildEntityIdFromEvent(event)
    initWebsite(eventAuthor, websiteId, event)
  }
  // project create
  if (noun.toString() == "01" && verb.toString() == "00") {
    const body = event.params.data.toHex().slice(6)
    const websiteId = body.slice(0, 66)
    const metadata = body.slice(66)
    const bytes = Bytes.fromHexString("0x1220" + metadata)
    const metadataHash = encode(bytes)
    const projectId = buildEntityIdFromEvent(event)
    log.debug("Creating project on websiteId: {}, with ipfs metadata: {}", [metadataHash.toString(), websiteId.toString()])
    createProject(eventAuthor, websiteId, projectId, metadataHash, event)
  }
  // project upvote
  if (noun.toString() == "01" && verb.toString() == "01") {
    const body = event.params.data.toHex().slice(6)
    const projectId = body.slice(0, 66)
    upvoteProject(eventAuthor, projectId, event)
  }
}
