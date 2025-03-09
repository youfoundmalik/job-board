"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input, Select } from "@/components/common";
import { useJobsContext } from "@/hooks/useJobContext";
import { jobTypes } from "@/utils/constants";
import { JobFilterParams } from "@/types/job";

export default function JobFilters({ isLoading, params }: { isLoading: boolean; params: JobFilterParams }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = useJobsContext();
  const [values, setValues] = useState({
    location: params.location ?? "",
    job_type: params.job_type ?? "",
    skills: params.skills?.[0] ?? "",
  });

  const handleSearch = (payload = values) => {
    const params = new URLSearchParams(searchParams.toString());

    if (payload.location) {
      params.set("location", payload.location);
    } else {
      params.delete("location");
    }

    if (payload.job_type) {
      params.set("job_type", payload.job_type);
    } else {
      params.delete("job_type");
    }

    if (payload.skills) {
      params.set("skills", payload.skills);
    } else {
      params.delete("skills");
    }

    setIsLoading(true);
    router.push(`/?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 md:gap-6 flex-col md:flex-row'>
      <Input
        value={values.location}
        containerClass='w-full md:w-[218px]'
        className='placeholder:text-foreground text-sm'
        placeholder='Location'
        disabled={isLoading}
        onBlur={() => handleSearch()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setValues((p) => ({ ...p, location: e.target.value }))}
      />
      <Select
        value={values.job_type}
        options={jobTypes}
        containerClass='w-full md:w-[218px]'
        placeholder='All'
        disabled={isLoading}
        onChange={(e) => {
          const payload = { ...values, job_type: e.target.value };
          setValues(payload);
          handleSearch(payload);
        }}
      />
      <Input
        value={values.skills}
        containerClass='w-full md:w-[218px]'
        className='placeholder:text-foreground text-sm'
        placeholder='Skills'
        disabled={isLoading}
        onBlur={() => handleSearch()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setValues((p) => ({ ...p, skills: e.target.value }))}
      />
    </form>
  );
}
