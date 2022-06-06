import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { FiLink } from 'react-icons/fi';
import { BiImageAdd } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import toast from 'react-hot-toast';
import { log } from 'console';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

const AddPost = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [openImageBox, setOpenImageBox] = useState(false);

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading('Creating the post..');

    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('new post has been added.', newPost);
      } else {
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log('new post has been added.', newPost);
      }

      setValue('postTitle', '');
      setValue('postBody', '');
      setValue('postImage', '');
      setValue('subreddit', '');
      setOpenImageBox(false);

      toast.success('The post has been created..!', {
        id: notification, // will replace
      });
    } catch (error) {
      toast.error('Oops..! Something went wrong..!', {
        id: notification,
      });
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-[50px] z-20 bg-white rounded-sm shadow-sm  p-1 px-2 mx-1 lg:mx-0"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          type="text"
          placeholder={session ? 'Create a post..' : 'Log in to create a post'}
          className="bg-gray-50 p-1 px-4 outline-none text-sm rounded-sm flex-1"
        />
        <div className="flex items-center space-x-2">
          <BiImageAdd
            onClick={() => setOpenImageBox(!openImageBox)}
            className={`iconAddPost ${
              openImageBox && 'text-blue-400'
            } hover:scale-110 transition duration-300`}
          />
          <FiLink className="iconAddPost h-5 w-5" />
        </div>
      </div>

      {!!watch('postTitle') && (
        <div className="">
          <div className="text-sm flex items-center space-x-3 mt-2 mb-1">
            <p className="font-semibold ml-2 min-w-[100px]">Body</p>
            <input
              {...register('postBody')}
              placeholder="Body of the post (optional)"
              type="text"
              className="bg-gray-50 p-1 px-4 outline-none flex-1 rounded-sm"
            />
          </div>
          <div className="text-sm flex items-center space-x-3 mt-2 mb-1">
            <p className="font-semibold ml-2 min-w-[100px]">Subreddit</p>
            <input
              {...register('subreddit', { required: true })}
              placeholder="i.e. r/cursedComments"
              type="text"
              className="bg-gray-50 p-1 px-4 outline-none flex-1 rounded-sm"
            />
          </div>
          {openImageBox && (
            <div className="text-sm flex items-center space-x-3 mt-2 mb-1">
              <p className="font-semibold ml-2 min-w-[100px]">Image url</p>
              <input
                {...register('postImage')}
                placeholder="Add the image url (optional)"
                type="text"
                className="bg-gray-50 p-1 px-4 outline-none flex-1 rounded-sm"
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 px-2 text-red-500 text-xs">
              {errors.postTitle?.type === 'required' && (
                <p>Post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <div className="flex justify-center">
              <button
                type="submit"
                className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-blue-500 border-2 border-blue-500 rounded-full hover:text-white group hover:bg-gray-50 my-2"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative text-sm">Create post</span>
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default AddPost;
