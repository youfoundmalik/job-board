"use client";

import { useEffect } from "react";

import JobFilters from "./JobFilters";
import Header from "@/components/layout/Header";
import { JobsTable } from "@/components/tables";
import { useJobsContext } from "@/hooks/useJobContext";
import { JobFilterParams, JobModel } from "@/types/job";

interface JobBoardProps {
  initialJobs: JobModel[];
  initialParams: JobFilterParams;
}

export function JobBoard({ initialJobs, initialParams }: JobBoardProps) {
  const { setJobs, setIsLoading, isLoading } = useJobsContext();

  useEffect(() => {
    setJobs(initialJobs);
    setIsLoading(false);
  }, [initialJobs, setIsLoading, setJobs]);

  return (
    <div className='w-full 3xl:max-w-[1400px] py-5 md:py-10 px-[min(150px,5%)] bg-white mx-auto min-h-screen h-full flex flex-col gap-4'>
      <Header />
      <div className='flex flex-col gap-6 md:mx-8 flex-grow'>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground'>Job Board</h2>
        <JobFilters isLoading={isLoading} params={initialParams} />
        <JobsTable isLoading={isLoading} />
      </div>
    </div>
  );
}
