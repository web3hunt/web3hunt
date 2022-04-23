export type Project = {
    id: string;
    title: string;
    desc: string;
    image: string;
    votes: number,
    tags: Array<string>
  }

export enum Categories {
    DEFI = 'ethglobal',
    NFT = 'Nft',
    ALLPROJECTS = 'All Projects'
  }

function sortVotesDesc(a: Project, b: Project){
    return b.votes - a.votes;
}

function sortFromHottest(allProjects: Array<Project>) {
    return allProjects.sort(sortVotesDesc)
}

function getAllProjects(result: any) {
    var allProjects: Array<Project> = [];
    if (!result.data) {
        return allProjects;
    }
    result.data.websites[0].projects.forEach( (project: any) => {
        let proj: Project = {
            id: project.project.id,
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

export function selectCategory(result: any, category: any) {
    var projectsInCategory: Array<Project> = [];
    var AllProjects: Array<Project> = getAllProjects(result)
    AllProjects = sortFromHottest(AllProjects)
    AllProjects.forEach( (project) => {
        if (category == null) {
            projectsInCategory.push(project)
        } else if (project.tags.includes(category)) {
            projectsInCategory.push(project);
        }
    })
    return projectsInCategory
}

