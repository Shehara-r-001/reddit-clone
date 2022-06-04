import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  seed?: string;
};

const Avatar = ({ seed }: Props) => {
  const { data: session } = useSession();
  return (
    <div className="relative h-9 w-9 rounded-full bg-white overflow-hidden">
      <Image
        layout="fill"
        // objectFit="contain"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
      />
    </div>
  );
};

export default Avatar;
