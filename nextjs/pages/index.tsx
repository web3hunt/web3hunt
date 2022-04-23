import type { NextPage } from 'next';
import { Hero } from '../components/organisms/Hero';
import { Projects } from '../components/organisms/Projects';
import Layout from '../components/templates/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Hero></Hero>
      <Projects></Projects>
    </Layout>
  );
};

export default Home;
