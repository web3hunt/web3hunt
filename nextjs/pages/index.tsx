import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div data-theme="cyberpunk" className={styles.container}>
      <Head>
        <title>web3nao nextjs playground</title>
        <meta name="description" content="nextjs, tailwind, daisyUI, wagmi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/web3nao"
          target="_blank"
          rel="noopener noreferrer"
        >
          web3nao
        </a>
      </footer>
    </div>
  );
};

export default Home;
