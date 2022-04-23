import {Project, ProjectMetadata, SupporterProject, User, Website, WebsiteProject} from "../../../generated/schema";
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
  let user = User.load(owner)
  if (user == null) {
    // create new user entity
    user = new User(owner)
    user.deployTimestamp = event.block.timestamp
    user.deployBlock = event.block.number
    user.save()
  }
  project = new Project(projectId)
  project.owner = user.id

  log.debug("Getting metadata from ipfs {}", [ipfsMetadata])
  let data = ipfs.cat(ipfsMetadata)
  let counter = 0
  while (!data) {
    log.debug("Waiting for ipfs data {}", [counter.toString()])
    counter++
    data = ipfs.cat(ipfsMetadata)
    if (counter > 10) {
      log.debug("Failed to get metadata from ipfs {}", [ipfsMetadata])
      return
    }
  }
  if (data == null) {
    log.warning("metadata {} not found on IPFS", [ipfsMetadata])
    return
  }
  log.debug("metadata found on IPFS {} number of tries: {}", [ipfsMetadata, counter.toString()])
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

  let imagePreview = jsonObject.get("imagePreview")
  if (imagePreview != null) {
    log.debug("imagePreview {}", [imagePreview.toString()])
    project.imagePreview = imagePreview.toString()
  }

  let tags = jsonObject.get("tags")
  if (!tags) {
    log.debug("metadata is missing tags", [])
  } else {
    let tagsArray = new Array<string>()
    let tagsList = tags.toArray()
    for (let i = 0; i < tagsList.length ; i++){
      tagsArray.push(tagsList[i].toString())
    }
    log.debug("tags {}", [tagsArray.toString()])
    project.tags = tagsArray
  }

  log.debug("metadata parsed, {}", [project.imagePreview])
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

  // create projectMetadata entity
  let projectMetadata = ProjectMetadata.load(buildMappingTableId(projectId, ipfsMetadata))
  if (projectMetadata != null) {
    log.debug("ProjectMetadata already exists {}", [buildMappingTableId(projectId, ipfsMetadata)] );
    return
  }
  projectMetadata = new ProjectMetadata(buildMappingTableId(projectId, ipfsMetadata))
  projectMetadata.project = projectId
  projectMetadata.metadata = ipfsMetadata
  projectMetadata.deployTimestamp = event.block.timestamp
  projectMetadata.deployBlock = event.block.number

  log.debug("saving project {}", [project.id])
  project.save()
  websiteProject.save()
  projectMetadata.save()

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

export function updateProject(eventAuthor : string, projectId : string, metadata: string, event: StateChange): void {
  let project = Project.load(projectId)
  if (project == null) return

  // check if eventAuthor is owner of project
  if (project.owner != eventAuthor) {
    log.debug("eventAuthor {} is not owner of project {}", [eventAuthor, projectId])
    return
  }

  log.debug("Getting metadata from ipfs {}", [metadata])
  let data = ipfs.cat(metadata)
  if (data === null) {
    log.warning("metadata {} not found on IPFS", [metadata])
    return
  }
  log.debug("metadata found on IPFS {}", [metadata])
  if (data.toString().slice(data.toString().length - 1, data.toString().length) != "}") {
    log.debug("skip parsing - metadata {} is not a JSON object", [metadata])
    return;
  }
  log.debug("parsing metadata {}", [data.toString()])
  let valueWrapped = json.try_fromString(data.toString())
  if (valueWrapped.isError) {
    log.debug("metadata not valid JSON (string) {}", [metadata])
    log.warning("metadata not valid JSON (string) {}", [metadata])
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

  let imagePreview = jsonObject.get("imagePreview")
  if (imagePreview != null) {
    log.debug("imagePreview {}", [imagePreview.toString()])
    project.imagePreview = imagePreview.toString()
  }

  let tags = jsonObject.get("tags")
  if (!tags) {
    log.debug("metadata is missing tags", [])
  } else {
    let tagsArray = new Array<string>()
    let tagsList = tags.toArray()
    for (let i = 0; i < tagsList.length ; i++){
      tagsArray.push(tagsList[i].toString())
    }
    log.debug("tags {}", [tagsArray.toString()])
    project.tags = tagsArray
  }

  // create projectMetadata entity
  let projectMetadata = ProjectMetadata.load(buildMappingTableId(projectId, metadata))
  if (projectMetadata != null) {
    log.debug("ProjectMetadata already exists {}", [buildMappingTableId(projectId, metadata)] );
    return
  }
  projectMetadata = new ProjectMetadata(buildMappingTableId(projectId, metadata))
  projectMetadata.project = projectId
  projectMetadata.metadata = metadata
  projectMetadata.deployTimestamp = event.block.timestamp
  projectMetadata.deployBlock = event.block.number


  project.updateTimestamp = event.block.timestamp
  project.updateBlock = event.block.number

  project.save()
  projectMetadata.save()
}