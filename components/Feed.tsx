import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries';
import Post from './Post';
import { DotWave } from '@uiball/loaders';

type Props = {
  topic?: string;
};

const Feed = ({ topic }: Props) => {
  const { data, error } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      });

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  if (!posts)
    return (
      <div className="flex w-full items-center justify-center p-10">
        <DotWave size={47} speed={1} color="#ff8080" />;
      </div>
    );

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
