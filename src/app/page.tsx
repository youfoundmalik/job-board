import { JobBoard } from "@/components/JobBoard";
import { JobService } from "@/services/job-service";
import { JobFilterParams } from "@/types/job";

export default async function Page({ searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const params = (await searchParams) ?? {};

  // Convert search params to filter params
  const filterParams: JobFilterParams = {
    location: (params?.location as string) ?? "",
    job_type: (params?.job_type as string) ?? "",
    skills: params?.skills ? [params.skills as string] : [],
    search_term: (params?.search_term as string) ?? "",
  };

  const initialJobs = await JobService.getAllJobs(filterParams);

  return <JobBoard initialJobs={initialJobs} initialParams={filterParams} />;
}
