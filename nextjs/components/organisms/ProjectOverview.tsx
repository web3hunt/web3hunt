import { PROJECTS } from '../../constants/placeholders';
import { Title } from '../atoms/Typography';
import { ProjectCard } from '../molecules/ProjectCard';
import { Container } from '../templates/Container';
import { FilterButton } from '../atoms/Buttons';
import { Categories, selectCategory } from '../filter';
import { useQuery } from 'urql';
import { QUERY } from '../../queries';

export const ProjectOverview = () => {
  const [result, reexecuteQuery] = useQuery({
    query: QUERY,
  });

  if (!result.data) {
    return <div></div>;
  }
  console.log(result.data.websites[0].projects[0].project);

  return (
    <section id="service" className="body-font ">
      <div className="mb-5 text-center">
        <Title>
          <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </span>
        </Title>
        <hr className="mx-auto h-1 w-14 rounded-full border-0 bg-gradient-to-r from-primary to-secondary" />
      </div>

      <div className="relative bg-[url('/assets/images/slope-bg.svg')] bg-cover bg-top">
        <img
          className="absolute -top-10 left-0 -z-10 w-full opacity-80 blur-[60px]"
          src="/assets/images/wwd-blur.svg"
          alt=""
        />
        <Container className="pb-24">
          <div
            className="h-16 grid grid-cols-4 gap-4 content-center "
            role="group"
          >
            <FilterButton onClick={() => selectCategory(Categories.DEFI)}>
              {Categories.DEFI}
            </FilterButton>
            <FilterButton onClick={() => selectCategory(Categories.NFT)}>
              {Categories.NFT}
            </FilterButton>
            <FilterButton onClick={() => selectCategory(Categories.HOT)}>
              {Categories.HOT}
            </FilterButton>
            <FilterButton
              onClick={() => selectCategory(Categories.YOURPROJECTS)}
            >
              {Categories.YOURPROJECTS}
            </FilterButton>
          </div>

          <div className="mb-5 ..."></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.data.websites[0].projects.map(({ project }: any) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                desc={project.short_description}
                image={project.imagePreview}
                votes={project.supportersCount}
                tags={project.tags}
              ></ProjectCard>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};
