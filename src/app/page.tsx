import { JobBoard } from "@/components/JobBoard";
import { getAllJobs } from "@/services/job-service";
import { JobFilterParams } from "@/lib/models";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Convert search params to filter params
  const filterParams: JobFilterParams = {
    location: searchParams.location as string,
    job_type: searchParams.job_type as string,
    skills: searchParams.skills ? [searchParams.skills as string] : [],
    search_term: searchParams.search_term as string,
  };

  const initialJobs = await getAllJobs(filterParams);

  return <JobBoard initialJobs={initialJobs} initialParams={filterParams} />;
}
