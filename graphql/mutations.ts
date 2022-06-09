import { gql } from '@apollo/client';

export const ADD_VOTE = gql`
  mutation MutAV($post_id: ID!, $username: String!, $upvote: Boolean!) {
    addVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MutationAC($post_id: ID!, $username: String!, $text: String!) {
    addAComment(post_id: $post_id, username: $username, text: $text) {
      created_at
      post_id
      text
      username
      id
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPostMut(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation AddSubredditMut($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
