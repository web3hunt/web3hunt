import type { AppProps } from 'next/app';
import { Hero } from '../components/organisms/Hero';
import { Projects } from '../components/organisms/Projects';
import Layout from '../components/templates/Layout';

function Home({ pageProps }: AppProps) {
  return (
    <Layout title="Home">
      <Hero {...pageProps}></Hero>
      <Projects></Projects>
    </Layout>
  );
};

export default Home;
