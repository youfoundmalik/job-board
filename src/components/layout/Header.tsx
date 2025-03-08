import React from "react";
import { AddIcon, Button, Input, SearchIcon } from "../common";

const Header = () => {
  return (
    <div className='px-8 pb-4 pt-6 flex items-center justify-between border-b border-base-gray-100'>
      <Input
        icon={<SearchIcon />}
        containerClass='w-full md:w-[340px] !rounded-full !bg-base-gray-200'
        className='text-sm placeholder:text-base-gray-800'
        placeholder='Search for jobs'
      />
      <Button className='bg-primary text-white rounded-full hover:opacity-90 transition-opacity duration-100 hidden md:flex' icon={<AddIcon />}>
        <span className='pr-1'>Create New Job Post</span>
      </Button>
    </div>
  );
};

export default Header;
