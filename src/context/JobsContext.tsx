"use client";

import { createContext, ReactNode, useMemo, useState, useCallback } from "react";
import { JobModel } from "@/types/job";

// Define the type for our context state
interface JobsContextType {
  error: Error | null;
  setError: (error: Error | null) => void;
  jobs: JobModel[];
  setJobs: (jobs: JobModel[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  paginatedJobs: JobModel[];
}

// Create the context with a default value
const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Create a provider component
export function JobsContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSetJobs = useCallback((newJobs: JobModel[]) => {
    setCurrentPage(1);
    setJobs(newJobs);
  }, []);

  // Internal pagination (Api isn't paginated)
  const { paginatedJobs, totalPages, totalItems } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      paginatedJobs: jobs.slice(start, end),
      totalPages: Math.ceil(jobs.length / itemsPerPage),
      totalItems: jobs.length,
    };
  }, [jobs, currentPage, itemsPerPage]);

  const value = {
    error,
    setError: (error: Error | null) => {
      setIsLoading(true);
      setError(error);
    },
    jobs,
    setJobs: handleSetJobs,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    totalItems,
    itemsPerPage,
    totalPages,
    paginatedJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export default JobsContext;
