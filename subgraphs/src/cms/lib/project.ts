import {Project, SupporterProject, User, Website, WebsiteProject} from "../../../generated/schema";
import {buildMappingTableId} from "./utils";
import {StateChange} from "../../../generated/Web3HuntContentManager/Web3HuntContentManager";
import {log, store, ipfs, json} from "@graphprotocol/graph-ts";
import { ZERO_BI, ONE_BI } from './utils'
/**
 * Creates project entity
 * @param owner
 * @param projectId
 * @param websiteId
 * @param ipfsMetadata
 * @param event
 */
export function createProject(owner : string, websiteId: string, projectId: string, ipfsMetadata: string, event : StateChange): void {
  log.debug("inside create project, {} {} {} {}", [owner, websiteId, projectId, ipfsMetadata]);
  let website =  Website.load(websiteId);
  if (website == null) {
    log.debug("Website not found, {}", [websiteId] );
    return
  }
  let project = Project.load(projectId)
  if (project != null) {
    log.debug("Project already exists, {}", [projectId] );
    return
  }
  project = new Project(projectId)
  project.owner = owner
  project.metadata = ipfsMetadata
  // TODO parse metadata from ipfs and assign fields:
  log.debug("Getting metadata from ipfs {}", [ipfsMetadata])
  let data = ipfs.cat(ipfsMetadata)
  if (data === null) {
    log.warning("metadata {} not found on IPFS", [ipfsMetadata])
    return
  }
  log.debug("metadata found on IPFS {}", [ipfsMetadata])

  if (data.toString().slice(data.toString().length - 1, data.toString().length) != "}") {
    log.debug("skip parsing - metadata {} is not a JSON object", [ipfsMetadata])
    return;
  }

  log.debug("parsing metadata {}", [data.toString()])
  let valueWrapped = json.try_fromString(data.toString())

  if (valueWrapped.isError) {
    log.debug("metadata not valid JSON (string) {}", [ipfsMetadata])
    log.warning("metadata not valid JSON (string) {}", [ipfsMetadata])
    return
  }

  log.debug("metadata valid JSON", [])
  let value = valueWrapped.value

  let jsonObject = value.toObject()

  let short_description = jsonObject.get("short_description")
  if (short_description != null) {
    log.debug("short_description {}", [short_description.toString()])
    project.short_description = short_description.toString()
  }

  let name = jsonObject.get("name")
  if (name != null) {
    log.debug("name {}", [name.toString()])
    project.name = name.toString()
  }

  let category = jsonObject.get("category")
  if (category != null) {
    log.debug("category {}", [category.toString()])
    project.category = category.toString()
  } else {
    log.debug("category not found, defaulting to 'other'", [])
    project.category = "other"
  }

  project.deployBlock = event.block.number
  project.deployTimestamp = event.block.timestamp
  project.txHash = event.transaction.hash
  project.updateBlock = event.block.number
  project.updateTimestamp = event.block.timestamp
  project.supportersCount = ZERO_BI

  // create projectWebsite entity
  let websiteProject = new WebsiteProject(buildMappingTableId(websiteId, projectId))
  websiteProject.project = projectId
  websiteProject.website = websiteId

  project.save()
  websiteProject.save()

}

export function upvoteProject(eventAuthor : string, projectId : string, event: StateChange): void {
  let project = Project.load(projectId)
  if (project == null) return
  let user = User.load(eventAuthor)
  if (user == null) {
    // create new user entity
    user = new User(eventAuthor)
    user.deployTimestamp = event.block.timestamp
    user.deployBlock = event.block.number
    user.save()
  }
  // find ProjectSupporter entity
  let projectSupporter = SupporterProject.load(buildMappingTableId(eventAuthor, projectId))
  if (projectSupporter == null) {
    // create new ProjectSupporter entity
    projectSupporter = new SupporterProject(buildMappingTableId(eventAuthor, projectId))
    projectSupporter.project = projectId
    projectSupporter.user = eventAuthor
    projectSupporter.deployTimestamp = event.block.timestamp
    projectSupporter.deployBlock = event.block.number
  }
  project.supportersCount = project.supportersCount.plus(ONE_BI)
  project.save()
  projectSupporter.save()
}