import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS } from '../graphql/queries';

const Feed = () => {
  const { data, error } = useQuery(GET_ALL_POSTS);
  return <div>Feed</div>;
};

export default Feed;
