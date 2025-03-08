"use client";

import { createContext, ReactNode, useState, useCallback, useEffect } from "react";
import { JobFilterParams, JobModel } from "@/lib/models";
import { getAllJobs } from "@/services/job-service";
import { defaultJobsParams } from "@/lib/constants";

// Define the type for our context state
interface JobsContextType {
  isLoading: boolean;
  error: Error | null;
  setError: (error: Error | null) => void;
  jobs: JobModel[];
  setJobs: (jobs: JobModel[]) => void;
  jobsParams: JobFilterParams;
  setJobsParams: (jobsParams: JobFilterParams) => void;
  fetchJobs: (params?: JobFilterParams) => Promise<void>;
}

// Create the context with a default value
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Create a provider component
export function JobsContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [jobsParams, setJobsParams] = useState<JobFilterParams>(defaultJobsParams);

  const fetchJobs = useCallback(
    async (params = jobsParams) => {
      setError(null);
      const payload = Object.fromEntries(
        Object.entries(params).filter((entry) => {
          if (Array.isArray(entry[1])) {
            return entry[1].length > 0 && entry[1][0] !== "";
          }
          return entry[1] !== "";
        })
      );

      console.log(payload);
      // return;
      try {
        setIsLoading(true);
        const response = await getAllJobs(payload);
        setJobs(response);
        setJobsParams(params);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [jobsParams]
  );

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isLoading,
    error,
    setError,
    jobs,
    setJobs,
    jobsParams,
    setJobsParams,
    fetchJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export default JobsContext;
