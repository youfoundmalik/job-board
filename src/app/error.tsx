"use client";

import Image from "next/image";
import errorImg from "../../public/images/error-image.svg";
import { useJobsContext } from "@/hooks/useJobContext";
import { Button } from "@/components/common";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { fetchJobs } = useJobsContext();

  const handleReset = () => {
    fetchJobs();
    reset();
  };

  return (
    <div className='w-full h-[100dvh] flex items-center justify-center flex-col gap-2'>
      <Image src={errorImg} alt='No data' width={100} height={100} className='w-[350px]' />
      <h4 className='text-base-black font-semibold text-xl md:text-2xl mt-2'>Something went wrong!</h4>
      <p className='text-base-gray-800 text-sm text-center'>Failed to fetch jobs at this time.</p>
      <Button
        onClick={handleReset}
        className='text-base-black border border-base-gray-800 w-[200px] hover:bg-gray-50 font-medium text-center cursor-pointer mt-2'
      >
        Try Again
      </Button>
    </div>
  );
}
