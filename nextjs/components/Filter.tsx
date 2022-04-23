type Project = {
    title: string;
    desc: string;
    image: string;
    votes: number,
    tags: Array<string>
  }

export enum Categories {
    DEFI = 'Defi',
    NFT = 'Nft',
    HOT = 'Hot',
    YOURPROJECTS = 'Your projects'
  }

function getAllProjects() {
    return []
}

export function selectCategory(category: Categories){
    var projectsInCategory: Array<Project> = [];
    var AllProjects: Array<Project> = getAllProjects()
    AllProjects.forEach( (project) => {
        if (project.tags.includes(category)){
            projectsInCategory.push(project);
        }
    })
    return projectsInCategory
}

