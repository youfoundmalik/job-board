"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/common";
import errorImg from "../../public/images/error-image.svg";
import { useJobsContext } from "@/hooks/useJobContext";
import { OptimizedImage } from "@/components/common/Image";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const { setError } = useJobsContext();

  const handleReset = () => {
    setError(null);
    reset();
    router.refresh();
  };

  return (
    <div className='w-full h-[100dvh] flex items-center justify-center flex-col gap-2'>
      <OptimizedImage src={errorImg} alt='No data' width={100} height={100} className='w-[350px]' />
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
