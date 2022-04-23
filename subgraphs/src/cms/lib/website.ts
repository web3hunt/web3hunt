import {StateChange} from "../../../generated/Web3HuntContentManager/Web3HuntContentManager";
import {User, Website} from "../../../generated/schema";


export function initWebsite(owner: string, id: string, event : StateChange) : void {
  let space = Website.load(id)
  if (space != null) return
  space = new Website(id)

  // get or create owner
  let user = User.load(owner)
  if (user == null) {
    user = new User(owner)
    user.save()
  }

  space.owner = owner
  space.deployBlock = event.block.number
  space.deployTimestamp = event.block.timestamp
  space.txHash = event.transaction.hash
  space.save()
}