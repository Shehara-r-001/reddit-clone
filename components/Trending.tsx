import React from 'react';
import { VscRocket } from 'react-icons/vsc';
import { HiOutlineFire } from 'react-icons/hi';
import { TiStarburstOutline } from 'react-icons/ti';
import { MdOutlineAlignVerticalTop } from 'react-icons/md';
import { BsChevronDown, BsViewStacked } from 'react-icons/bs';
import { Dropdown } from 'semantic-ui-react';
import { AiOutlineCaretDown } from 'react-icons/ai';

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';

const Trending = () => {
  return (
    <div className=" bg-white my-3 p-2 mx-1 lg:mx-0 flex justify-between items-center shadow-sm">
      <div className="flex items-center w-3/4 justify-between lg:w-3/5">
        <div className="sortingDiv group flex items-center bg-blue-200 p-1 px-4 rounded-full border border-blue-300">
          <VscRocket className="sortIcon group-hover:text-[#3734ecfb] group-hover:-rotate-45 transition duration-300" />
          <p>Best</p>
          <AiOutlineCaretDown className="h-4 w-4 cursor-pointer sm:hidden" />
        </div>
        <div className="sortingDiv group">
          <HiOutlineFire className="sortIcon group-hover:text-orange-400 group-hover:rotate-45" />
          <p>Hot</p>
        </div>
        <div className="sortingDiv group">
          <TiStarburstOutline className="sortIcon group-hover:text-red-400 group-hover:rotate-45" />
          <p>New</p>
        </div>
        <div className="sortingDiv group">
          <MdOutlineAlignVerticalTop className="rotate-180 sortIcon group-hover:text-blue-400" />
          <p>Top</p>
        </div>
      </div>
      <div className="flex items-center mr-2 space-x-1 group cursor-pointer">
        <BsViewStacked className="h-4 w-4" />
        <BsChevronDown className="h-3 w-3 group-hover:scale-110 transition duration-200" />
      </div>
    </div>
  );
};

export default Trending;
