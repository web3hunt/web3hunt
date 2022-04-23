import { PROJECTS } from '../../constants/placeholders';
import { Title } from '../atoms/Typography';
import { ProjectCard } from '../molecules/ProjectCard';
import { Container } from '../templates/Container';

export const ProjectOverview = () => {
  return (
    <section id="service" className="body-font ">
      <div className="mb-20 text-center">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map(({ title, desc, image, votes, tags }) => (
              <ProjectCard
                key={title}
                title={title}
                desc={desc}
                image={image}
                votes={votes}
                tags={tags}
              ></ProjectCard>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};
