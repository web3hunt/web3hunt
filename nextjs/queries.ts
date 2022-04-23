import { WEB3_HUNT_WEBSITE_RINKEBY } from './constants/api.const';

export const QUERY = `
{
  websites (where: {id: "${WEB3_HUNT_WEBSITE_RINKEBY}"}) {
    id
    projects {
      project {
        id
        owner {
          id
        }
        name
        short_description
        imagePreview
        metadata {
          id
          deployBlock
          deployTimestamp
        }
        supportersCount
        tags
        deployBlock
        deployTimestamp
        updateBlock
        updateTimestamp
      }
    }
  }
}
`;
