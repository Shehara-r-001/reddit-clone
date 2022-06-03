import React from 'react';
import { useSession } from 'next-auth/react';

const AddPost = () => {
  const { data: session } = useSession();
  return (
    <form>
      <div>
        <input
          disabled={!session}
          type="text"
          placeholder={session ? 'Create a post..' : 'Log in to create a post'}
          className="bg-gray-50 p-2 px-4 outline-none text-sm rounded-sm flex-1"
        />
      </div>
    </form>
  );
};

export default AddPost;
