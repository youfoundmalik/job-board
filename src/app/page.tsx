"use client";

import { Input, Select } from "@/components/common";
import Header from "@/components/layout/Header";
import { JobsTable } from "@/components/tables";
import { useJobsContext } from "@/hooks/useJobContext";
import { jobTypes } from "@/lib/constants";

let timeout: NodeJS.Timeout;

export default function Home() {
  const { jobsParams, setJobsParams, error, jobs, fetchJobs } = useJobsContext();

  const handleSearch = (key: string, value: string | string[]) => {
    const params = { ...jobsParams, [key]: value };
    setJobsParams(params);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchJobs(params);
    }, 1000);
  };

  if (error && jobs.length === 0) throw error;

  return (
    <div className='w-full 3xl:max-w-[1400px] py-5 md:py-10 px-[min(150px,5%)] bg-white mx-auto min-h-screen h-full flex flex-col gap-4'>
      <Header />
      <div className='flex flex-col gap-6 md:mx-8 flex-grow'>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground'>Job Board</h2>
        <div className='flex items-center gap-2 md:gap-6 flex-col md:flex-row'>
          <Input
            value={jobsParams.location ?? ""}
            containerClass='w-full md:w-[218px]'
            className='placeholder:text-foreground text-sm'
            placeholder='Location'
            onChange={(e) => handleSearch("location", e.target.value)}
          />
          <Select
            value={jobsParams.job_type ?? ""}
            options={jobTypes}
            containerClass='w-full md:w-[218px]'
            placeholder='Job Type'
            onChange={(e) => {
              setJobsParams({ ...jobsParams, job_type: e.target.value });
              fetchJobs({ ...jobsParams, job_type: e.target.value });
            }}
          />
          <Input
            value={jobsParams.skills?.[0] ?? ""}
            containerClass='w-full md:w-[218px]'
            className='placeholder:text-foreground text-sm'
            placeholder='Skills'
            onChange={(e) => handleSearch("skills", [e.target.value])}
          />
        </div>
        <JobsTable />
      </div>
    </div>
  );
}
