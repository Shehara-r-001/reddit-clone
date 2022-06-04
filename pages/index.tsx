import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import AddPost from '../components/AddPost';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-3">
      <Head>
        <title>strider - reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddPost />
      {/* <h1>hhhh</h1> */}
    </div>
  );
};

export default Home;
