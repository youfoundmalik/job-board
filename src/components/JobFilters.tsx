"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input, Select } from "@/components/common";
import { useJobsContext } from "@/hooks/useJobContext";
import { jobTypes } from "@/utils/constants";
import { JobFilterParams } from "@/types/job";

let timeout: NodeJS.Timeout;

export default function JobFilters({ isLoading, params }: { isLoading: boolean; params: JobFilterParams }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useJobsContext();
  const [values, setValues] = useState({
    location: params.location ?? "",
    job_type: params.job_type ?? "",
    skills: params.skills?.[0] ?? "",
  });

  const handleSearch = (key: string, value: string) => {
    clearTimeout(timeout);
    setValues((p) => ({ ...p, [key]: value }));

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    timeout = setTimeout(() => {
      setIsLoading(true);
      router.push(`/?${params.toString()}`);
    }, 500);
  };

  return (
    <div className='flex items-center gap-2 md:gap-6 flex-col md:flex-row'>
      <Input
        value={values.location}
        containerClass='w-full md:w-[218px]'
        className='placeholder:text-foreground text-sm'
        placeholder='Location'
        disabled={isLoading}
        onChange={(e) => handleSearch("location", e.target.value)}
      />
      <Select
        value={values.job_type}
        options={jobTypes}
        containerClass='w-full md:w-[218px]'
        placeholder='All'
        disabled={isLoading}
        onChange={(e) => handleSearch("job_type", e.target.value)}
      />
      <Input
        value={values.skills}
        containerClass='w-full md:w-[218px]'
        className='placeholder:text-foreground text-sm'
        placeholder='Skills'
        disabled={isLoading}
        onChange={(e) => handleSearch("skills", e.target.value)}
      />
    </div>
  );
}
