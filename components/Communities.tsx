import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { GET_TOP_SUBREDDITS } from '../graphql/queries';
import Avatar from './Avatar';

const Communities = () => {
  const { data } = useQuery(GET_TOP_SUBREDDITS, {
    variables: {
      limit: 8,
    },
  });

  const subreddits: Subreddit[] = data?.getTopSubreddits;

  return (
    <div className="sticky top-28 hidden h-fit min-w-[280px] lg:inline mt-3 ml-3 bg-white shadow-sm rounded-sm">
      <p className="bg-black text-white p-3 text-sm font-bold">
        Top Communities
      </p>
      <div>
        {subreddits.map((sub, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-3 px-2"
          >
            <p>{index + 1}</p>

            <Link href={`subreddit/${sub.topic}`}>
              <div className="flex items-center space-x-2 flex-1 my-1 group cursor-pointer">
                <Avatar seed={sub.topic} />
                <p className="text-sm group-hover:underline">r/{sub.topic}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="px-10 my-3">
        <button className="bg-blue-500 w-full rounded-full py-1 text-white cursor-pointer hover:scale-90 transition duration-300 ease-in-out">
          View All
        </button>
      </div>
    </div>
  );
};

export default Communities;
