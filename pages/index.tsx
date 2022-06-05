import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import AddPost from '../components/AddPost';
import Feed from '../components/Feed';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-3">
      <Head>
        <title>strider - reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddPost />
      <div>
        <Feed />
      </div>
    </div>
  );
};

export default Home;
