import type { AppProps } from 'next/app';
import { CreateProject } from '../components/organisms/CreateProject';
import { Hero } from '../components/organisms/Hero';
import { Projects } from '../components/organisms/Projects';
import Layout from '../components/templates/Layout';

function Home({ pageProps }: AppProps) {
  return (
    <Layout title="Home">
      <Hero {...pageProps}></Hero>
      <CreateProject></CreateProject>
      <Projects></Projects>
    </Layout>
  );
};

export default Home;
