import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import AddPost from '../components/AddPost';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>strider - reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddPost />
    </div>
  );
};

export default Home;
