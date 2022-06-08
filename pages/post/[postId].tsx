import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADD_COMMENT } from '../../graphql/mutations';
import toast from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import Timeago from 'react-timeago';
import { GoGift } from 'react-icons/go';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import { BsReply } from 'react-icons/bs';

type FormData = {
  comment: string;
};

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostID'],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostByPostID;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // just another way to do it. first one will work as well.. :D
    console.log(data);

    const notification = toast.loading('Posting the comment..');

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue('comment', '');

    toast.success('Comment has been posted..', {
      id: notification,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Post post={post} />
      {post && (
        <div className="bg-white text-sm mx-1 rounded-sm shadow-sm lg:mx-0 lg:w-2/3 sm:w-3/4 mb-5">
          <p className="ml-2 py-1">
            Comment as{' '}
            <span className="font-semibold">{session?.user?.name}</span>
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-2 rounded-md sm:flex sm:items-center sm:space-x-2 "
          >
            <textarea
              {...register('comment')}
              disabled={!session}
              placeholder={session ? 'Add a comment..' : 'Sign in to comment..'}
              className="outline-none bg-green-50 h-20 w-full p-2 sm:mb-2"
            />
            <button className="bg-red-300 font-semibold px-3 py-1 rounded-full hover:border hover:border-red-400 mb-2 mt-1 sm:mt-auto">
              Comment
            </button>
          </form>
        </div>
      )}
      <div className="mb-5">
        {post?.comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white mt-2 mx-1 lg:mx-0 rounded-sm shadow-sm lg:w-2/3 sm:w-3/4"
          >
            <div className="flex items-center space-x-2 p-2">
              <Avatar />
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold">{comment.username}</p>
                <Timeago date={comment.created_at} />
              </div>
            </div>
            <p className="p-1 ml-4 pb-1 text-sm">{comment.text}</p>
            <div className="flex items-center justify-between ml-3 w-3/4 pb-2 sm:w-2/3">
              <div className="flex items-center w-1/4 justify-between">
                <RiArrowUpSFill className="footerIcon h-7 w-7 hover:text-green-400" />
                <p>22</p>
                <RiArrowDownSFill className="footerIcon h-7 w-7 hover:text-red-400" />
              </div>
              <GoGift className="footerIcon" />
              <BsReply className="footerIcon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
