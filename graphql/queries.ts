import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query QueryGAP {
    getPostList {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query QueryGAPBT($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query QueryGPID($post_id: ID!) {
    getPostByPostID(post_id: $post_id) {
      body
      created_at
      id
      image
      title
      subreddit_id
      username
      comments {
        created_at
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query QueryGVBPID($post_id: ID!) {
    getVotesByPostID(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

export const GET_TOP_SUBREDDITS = gql`
  query QueryGTS($limit: Int!) {
    getTopSubreddits(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query QuerySRbyTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
