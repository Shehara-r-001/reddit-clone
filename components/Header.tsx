import Image from 'next/image';
import React from 'react';
import { AiTwotoneHome } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { FaChevronDown } from 'react-icons/fa';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { MdOutlineGraphicEq } from 'react-icons/md';
import { BiVideoRecording } from 'react-icons/bi';
import { FiBell, FiPlus } from 'react-icons/fi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const Header = () => {
  return (
    <div className=" sticky top-0 z-25 flex items-center shadow-sm bg-white">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer mx-2">
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/5/58/Reddit_logo_new.svg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex items-center justify-between mx-2 space-x-2 xl:min-w-[300px] lg:min-w-[260px]">
        <AiTwotoneHome className="h-5 w-5" />
        <p className="text-sm hidden lg:inline flex-1">Home</p>
        <FaChevronDown className="hidden lg:inline" />
      </div>
      <form className="flex items-center text-sm space-x-2 bg-gray-200 flex-1 rounded-sm py-1 px-2">
        <ImSearch className="h-4 w-4 text-gray-600" />
        <input
          className="bg-gray-200 outline-none flex-1"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>
    </div>
  );
};

export default Header;
