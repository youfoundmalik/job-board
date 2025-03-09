"use client";

import React, { useState } from "react";
import { AddIcon, Button, Input, SearchIcon } from "../common";
import { useSearchParams, useRouter } from "next/navigation";
import { useJobsContext } from "@/hooks/useJobContext";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useJobsContext();
  const [value, setValue] = useState(searchParams.get("search_term") ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search_term", value);
    } else {
      params.delete("search_term");
    }

    setIsLoading(true);

    router.push(`/?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className='md:px-8 pb-4 pt-6 flex items-center justify-between border-b border-base-gray-100'>
      <form onSubmit={handleSubmit}>
        <Input
          icon={<SearchIcon />}
          value={value}
          onBlur={() => handleSearch()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          containerClass='w-full md:w-[340px] !rounded-full !bg-base-gray-200'
          className='text-sm placeholder:text-base-gray-800'
          placeholder='Search for jobs'
        />
      </form>
      <Button className='bg-primary text-white rounded-full hover:opacity-90 transition-opacity duration-100 hidden md:flex' icon={<AddIcon />}>
        <span className='pr-1'>Create New Job Post</span>
      </Button>
    </div>
  );
};

export default Header;
