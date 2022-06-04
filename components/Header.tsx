import Image from 'next/image';
import React from 'react';
import { AiTwotoneHome } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { FaChevronDown, FaRegCommentDots } from 'react-icons/fa';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { MdOutlineGraphicEq } from 'react-icons/md';
import { BiVideoRecording } from 'react-icons/bi';
import { FiBell, FiPlus } from 'react-icons/fi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { RiCoinLine } from 'react-icons/ri';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcRating } from 'react-icons/fc';

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className=" sticky top-0 z-25 flex items-center shadow-sm bg-white w-full">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer mx-2">
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/5/58/Reddit_logo_new.svg"
          layout="fill"
          objectFit="contain"
          priority={true}
        />
      </div>
      <div className="flex items-center justify-between mx-2 space-x-2 xl:min-w-[300px] lg:min-w-[260px]">
        <AiTwotoneHome className="h-5 w-5 cursor-pointer" />
        <p className="text-sm hidden lg:inline flex-1 mt-1">Home</p>
        <FaChevronDown className="hidden lg:inline cursor-pointer mt-1" />
      </div>
      <form className="flex items-center text-sm space-x-2 bg-gray-100 flex-1 rounded-sm py-1 px-2">
        <ImSearch className="h-4 w-4 text-gray-600" />
        <input
          className="bg-gray-100 outline-none flex-1 text-sm"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>
      <div className="flex items-center space-x-1 lg:space-x-3 mx-1">
        <div className="items-center hidden lg:flex lg:space-x-3 ml-2">
          <BsArrowUpRightCircle className="icon_header" />
          <MdOutlineGraphicEq className="icon_header border border-black rounded-full" />
          <BiVideoRecording className="icon_header" />
        </div>
        <hr className="h-8 border border-gray-100 hidden lg:inline" />
        <FaRegCommentDots className="icon_header" />
        <div className="relative">
          <FiBell className="icon_header" />
          <p className="absolute -top-2 -right-1 text-xs bg-red-500 rounded-full h-4 w-4 text-center">
            4
          </p>
        </div>
        <FiPlus className="icon_header" />
        <HiOutlineSpeakerphone className="icon_header bg-gray-100 rounded-full p-1 h-7 w-7" />
        <div className="border border-orange-400 items-center rounded-full px-2 py-1 bg-gradient-to-b from-yellow-300 to-orange-400 hidden sm:flex hover:opacity-90 cursor-pointer">
          <RiCoinLine className="icon_header text-gray-700 -rotate-90" />
          <p className="text-xs mx-1 font-semibold">Free</p>
        </div>
      </div>
      {session ? (
        <div className="hidden md:flex md:items-center  px-2 py-0.5 mr-1 lg:py-0 hover:border hover:border-gray-100 hover:rounded-sm min-w-[150px]">
          <Image
            src={`https://avatars.dicebear.com/api/open-peeps/${
              session?.user?.name || 'placeholder'
            }.svg`}
            height={25}
            width={25}
            className="rounded-full cursor-pointer"
            objectFit="contain"
            onClick={() => signOut()}
          />
          <div className="hidden md:flex md:flex-col ml-1 flex-1">
            <p className="text-xs truncate">{session?.user?.name}</p>
            <div className="flex items-center space-x-1">
              <FcRating className="w-2 h-2" />
              <p className="text-[10px]">12 karma</p>
            </div>
          </div>
          <FaChevronDown className="h-3 w-3 ml-2 cursor-pointer" />
        </div>
      ) : (
        <div className="hidden md:flex md:items-center  px-2 py-0.5 mr-1 lg:py-0 hover:border hover:border-gray-100 hover:rounded-sm min-w-[150px]">
          <Image
            src="https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png"
            height={25}
            width={25}
            className="rounded-full cursor-pointer"
            objectFit="contain"
            onClick={() => signIn()}
          />
          <div className="hidden md:flex md:flex-col ml-1 flex-1">
            <p className="text-xs">Sign In</p>
            <p className="text-[10px]"></p>
          </div>
          <FaChevronDown className="h-3 w-3 ml-2 cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default Header;
