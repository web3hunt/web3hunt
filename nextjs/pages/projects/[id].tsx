import { useRouter } from 'next/router';
import { ProjectDetail } from '../../components/organisms/ProjectDetail';
import Layout from '../../components/templates/Layout';

function Project() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  let projectId = '';

  if (!id) {
    return <div></div>;
  } else if (Array.isArray(id)) {
    projectId = id[0];
  } else {
    projectId = id;
  }
  return (
    <Layout>
      <ProjectDetail id={projectId}></ProjectDetail>
    </Layout>
  );
}

export default Project;
