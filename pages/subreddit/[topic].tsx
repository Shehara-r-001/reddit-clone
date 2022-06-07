import { useRouter } from 'next/router';
import React from 'react';
import { FiBell } from 'react-icons/fi';
import AddPost from '../../components/AddPost';
import Avatar from '../../components/Avatar';
import Feed from '../../components/Feed';
import Trending from '../../components/Trending';

const Subreddit = () => {
  const {
    query: { topic },
  } = useRouter();

  return (
    <div className="">
      <div className="shadow-md">
        <div className="w-full h-[15vh] bg-red-400" />
        <div className={`relative`}>
          <div className={` absolute -top-[3vh] left-[10vw] rounded-full `}>
            <Avatar seed={topic as string} sub />
          </div>
        </div>
        <div className="pl-[24vw] sm:pl-[20vw] md:pl-[16vw] bg-white py-2 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{topic}</h1>
            <p className="text-lg font-semibold ml-2">r/{topic}</p>
          </div>
          <div className="mr-5 sm:flex sm:items-center sm:space-x-2">
            <h1 className="border rounded-full border-black px-3.5 py-1 font-bold">
              Joined
            </h1>
            <FiBell className="hidden sm:inline h-8 w-8 border rounded-full border-black p-1 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-3 max-w-5xl mx-auto">
        <AddPost subreddit={topic as string} />
        <Trending />
        <Feed topic={topic as string} />
      </div>
    </div>
  );
};

export default Subreddit;
