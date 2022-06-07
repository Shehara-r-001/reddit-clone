import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  seed?: string;
  sub?: boolean;
};

const Avatar = ({ seed, sub }: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative rounded-full bg-white overflow-hidden ${
        sub ? 'h-14 w-14' : 'h-9 w-9'
      }`}
    >
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
