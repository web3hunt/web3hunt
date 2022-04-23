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

function getAllProjects(result: any) {
    var allProjects: Array<Project> = [];
    if (!result.data) {
        return allProjects;
    }
    result.data.websites[0].projects.forEach( (project: any) => {
        let proj: Project = {
            title: project.project.name,
            tags: project.project.tags,
            desc: project.project.short_description,
            votes: project.project.supportersCount,
            image: project.project.imagePreview
        }
        allProjects.push(proj)
    })
    return allProjects
}

export function selectCategory(result: any, category: Categories) {
    var projectsInCategory: Array<Project> = [];
    var AllProjects: Array<Project> = getAllProjects(result)
    AllProjects.forEach( (project) => {
        if (project.tags.includes(category)){
            projectsInCategory.push(project);
        }
    })
    return projectsInCategory
}

