import React from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import Image from 'next/image';
import { VscComment, VscDebugBreakpointLogUnverified } from 'react-icons/vsc';
import { GoGift } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import Link from 'next/link';

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <Link href={`post/${post.id}`} prefetch>
      <div className="bg-white flex my-3 shadow-md rounded-sm mx-1 lg:mx-0">
        <div className="flex flex-col items-center justify-star space-y-1 bg-gray-50 p-2">
          <RiArrowUpSFill className="voteIcons hover:text-green-300" />
          <p className="text-sm font-semibold">0</p>
          <RiArrowDownSFill className="voteIcons hover:text-red-400" />
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex items-center mt-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs ml-2">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`} prefetch>
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
              <p className="footerText">3 Comments</p>
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
            <BsThreeDots className="footerIcon" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
