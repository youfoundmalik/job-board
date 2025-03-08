import moment from "moment";
import Image from "next/image";
import { Fragment, memo } from "react";
import TableBase, { TableCell, TableHeaderCell } from "./base";
import { useJobsContext } from "@/hooks/useJobContext";
import { JobModel } from "@/lib/models";

const JobsTable: React.FC = () => {
  const { jobs: data, isLoading, fetchJobs } = useJobsContext();

  const handleResetFilters = () => fetchJobs({});

  return (
    <Fragment>
      <TableBase
        count={data.length}
        isLoading={isLoading}
        className='border-separate border-spacing-1/2'
        emptyTitle='No jobs found'
        emptyDescription={
          <>
            No jobs found for your search. Please try again with different filters or reset your filters.
            <br />
            <button onClick={handleResetFilters} className='text-primary font-medium text-center cursor-pointer mt-2'>
              Reset Filters
            </button>
          </>
        }
      >
        <thead>
          <tr>
            <TableHeaderCell>Job Title</TableHeaderCell>
            <TableHeaderCell>Job Type</TableHeaderCell>
            <TableHeaderCell>Skills</TableHeaderCell>
            <TableHeaderCell>Languages</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
          </tr>
        </thead>
        {isLoading ? (
          <LoadingSkeleton count={data.length || 5} />
        ) : (
          data.length > 0 && (
            <tbody className='before:content-[" "] before:block before:h-2'>
              {data.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </tbody>
          )
        )}
      </TableBase>
    </Fragment>
  );
};

export default memo(JobsTable);

const LoadingSkeleton = memo(({ count }: { count: number }) => (
  <tbody>
    {new Array(count).fill(0).map((_, index) => (
      <tr key={index} className='animate-pulse'>
        <td>
          <div className='py-4 px-1 flex flex-col gap-2 w-full justify-center'>
            <div className='bg-gray-100 w-full h-8' />
          </div>
        </td>
        <td>
          <div className='py-4 px-1 flex flex-col gap-1 w-full justify-center'>
            <div className='bg-gray-100 w-2/3 h-3' />
            <div className='bg-gray-100 w-full h-3' />
          </div>
        </td>
        <td>
          <div className='py-4 px-1 flex flex-col gap-1 w-full justify-center'>
            <div className='bg-gray-100 w-2/3 h-3' />
            <div className='bg-gray-100 w-full h-3' />
          </div>
        </td>
        <td>
          <div className='py-4 px-1 flex flex-col gap-2 w-full justify-center'>
            <div className='bg-gray-100 w-full h-8' />
          </div>
        </td>
        <td>
          <div className='py-4 px-1 flex flex-col gap-2 w-full justify-center'>
            <div className='bg-gray-100 w-1/2 h-4' />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

const JobRow = memo(({ job }: { job: JobModel }) => (
  <tr>
    <TableCell className='!px-0 min-w-[270px]'>
      <div className='px-2.5 py-2 rounded-lg bg-base-gray-300 box-border flex items-start gap-2.5'>
        <div className='w-9.5 h-9.5 box-border relative p-5 rounded-full bg-white flex items-center justify-center'>
          {job.company_logo && <Image src={job.company_logo} alt={job.company_name ?? "logo"} fill className='object-contain' />}
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-base-black font-medium text-sm md:text-base line-clamp-1'>{job.job_title}</p>
          <span className='text-xs text-base-gray-800'>
            {job.job_location_name} - {moment(job.created_at).fromNow()}
          </span>
        </div>
      </div>
    </TableCell>
    <TableCell>{job.job_type?.replace("_", " ")}</TableCell>
    <TableCell>{job.required_skills}</TableCell>
    <TableCell>{job.languages}</TableCell>
    <TableCell>{job.tags}</TableCell>
  </tr>
));

JobRow.displayName = "JobRow";
