import React, { useEffect, useState } from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import Image from 'next/image';
import { VscComment, VscDebugBreakpointLogUnverified } from 'react-icons/vsc';
import { GoGift } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import Link from 'next/link';
import { DotWave } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VOTES_BY_POST_ID } from '../graphql/queries';
import { ADD_VOTE } from '../graphql/mutations';

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostID'],
  });

  const upVote = async (isUp: boolean) => {
    if (!session) {
      toast('You must be logged in to vote');
      return;
    }
    if (vote && isUp) {
      return;
      // already upvoted
    }
    if (vote === false && !isUp) {
      return;
      // already downvoted
    }

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUp,
      },
    });
  };

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostID;
    const voteCount = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) {
      return 0;
    }
    if (voteCount === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return voteCount;
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostID;

    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [data]);

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10">
        <DotWave size={47} speed={1} color="#ff8080" />
      </div>
    );

  return (
    <div className="bg-white flex my-3 shadow-md rounded-sm mx-1 lg:mx-0">
      <div className="flex flex-col items-center justify-star space-y-1 bg-gray-50 p-2">
        <RiArrowUpSFill
          onClick={() => upVote(true)}
          className={`voteIcons hover:text-green-300 ${vote && 'text-red-500'}`}
        />
        <p className="text-sm font-semibold">{displayVotes(data)}</p>
        <RiArrowDownSFill
          onClick={() => upVote(false)}
          className={`voteIcons hover:text-red-400 ${
            vote === false && 'text-purple-500'
          }`}
        />
      </div>
      <Link href={`post/${post.id}`}>
        <div className="flex flex-col justify-center w-full cursor-pointer">
          <div className="flex items-center mt-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs ml-2">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold hover:underline cursor-pointer">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              {' . '}
              Posted By{' '}
              <span className="hover:underline cursor-pointer">
                u/{post.username}
              </span>{' '}
              <TimeAgo date={post.created_at} />
            </p>
          </div>
          <div className="my-2 font-semibold ml-2">
            <h1>{post.title}</h1>
            {post.title ? (
              ''
            ) : (
              <p className="text-sm font-normal">{post.body}</p>
            )}
          </div>
          {post.image ? (
            <div>
              <img src={post.image} className="w-full object-contain mb-2" />
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex items-center justify-between my-3 px-2 w-4/5 lg:w-2/3">
            <div className="flex items-center text-xs group">
              <VscComment className="footerIcon" />
              <p className="footerText inline">
                {post.comments.length}
                <span className="footerText">Comments</span>
              </p>
            </div>
            <div className="flex items-center text-xs group">
              <GoGift className="footerIcon" />
              <p className="footerText">Award</p>
            </div>
            <div className="flex items-center text-xs group">
              <RiShareForwardLine className="footerIcon" />
              <p className="footerText">Share</p>
            </div>
            <div className="flex items-center text-xs group">
              <BsBookmark className="footerIcon" />
              <p className="footerText">Save</p>
            </div>
            <BsThreeDots className="h-7 w-7 hover:scale-110 transition duration-300 hover:bg-blue-50 rounded-full p-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
