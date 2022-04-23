import type { AppProps } from 'next/app';
import { Hero } from '../components/organisms/Hero';
import { ProjectOverview } from '../components/organisms/ProjectOverview';
import Layout from '../components/templates/Layout';

function Home({ pageProps }: AppProps) {
  return (
    <Layout title="Home">
      <Hero {...pageProps}></Hero>
      <ProjectOverview></ProjectOverview>
    </Layout>
  );
}

export default Home;
