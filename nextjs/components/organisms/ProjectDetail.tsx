import { PROJECTS } from '../../constants/placeholders';
import { PrimaryButton } from '../atoms/Buttons';
import { Paragraph, Title } from '../atoms/Typography';
import { Container } from '../templates/Container';

type Props = {
  id: string;
};

export const ProjectDetail = ({ id }: Props) => {
  const project = PROJECTS[0];

  return (
    <section id="project" className="mt-24">
      <Container>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={project.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Project Name
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {project.title}
            </h1>

            <Paragraph>{project.desc}</Paragraph>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-zinc-200 mb-5">
              <div className="flex items-center space-x-2">
                <span className="mr-3">Tags:</span>
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="py-2 px-4 bg-secondary text-zinc-50 rounded-full"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="title-font font-medium text-2xl text-gray-900">
                Owner:
              </span>
              <PrimaryButton className="ml-auto">Upvote</PrimaryButton>
              <div className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                {project.votes}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
