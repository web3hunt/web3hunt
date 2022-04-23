import { useRouter } from 'next/router';
import { ProjectDetail } from '../../components/organisms/ProjectDetail';
import Layout from '../../components/templates/Layout';

function Project({ params }: any) {
  const router = useRouter();
  const { id } = router.query;
  let projectId = '';
  if (!id) {
    return <div></div>;
  }
  if (Array.isArray(id)) {
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
