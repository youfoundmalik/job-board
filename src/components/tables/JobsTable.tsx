import moment from "moment";
import { Fragment, memo } from "react";
import { useRouter } from "next/navigation";

import TableBase, { TableCell, TableHeaderCell } from "./base";
import { useJobsContext } from "@/hooks/useJobContext";
import { OptimizedImage } from "../common/Image";
import { JobModel } from "@/types/job";
import Pagination from "./pagination";

let timeout: NodeJS.Timeout;
interface JobsTableProps {
  isLoading?: boolean;
}

const JobsTable: React.FC<JobsTableProps> = ({ isLoading = false }) => {
  const { paginatedJobs: data, totalItems, currentPage, setCurrentPage, totalPages, setIsLoading } = useJobsContext();
  const router = useRouter();

  const handleResetFilters = () => {
    router.push("/");
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    timeout = setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsLoading(false);
      return () => clearTimeout(timeout);
    }, 500);
  };

  return (
    <Fragment>
      <TableBase
        count={totalItems}
        isLoading={isLoading}
        pagination={
          totalPages > 1 && data.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
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
          <LoadingSkeleton count={data.length > 5 ? data.length : 5} />
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
    <TableCell className='!px-0 min-w-[270px] max-w-[350px]'>
      <div className='px-2.5 py-3 rounded-lg bg-base-gray-300 box-border flex items-start gap-2.5'>
        <div className='w-9.5 h-9.5 box-border relative rounded-full overflow-clip bg-white flex items-center justify-center'>
          {job.company_logo && (
            <OptimizedImage src={job.company_logo} alt={job.company_name ?? "logo"} width={32} height={32} className='object-contain' />
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-base-black font-medium text-sm md:text-base line-clamp-1'>{job.job_title}</p>
          <span className='text-xs text-base-gray-800'>
            {job.job_location_name} - {moment(job.created_at).fromNow()}
          </span>
        </div>
      </div>
    </TableCell>
    <TableCell>
      <span className='min-w-fit line-clamp-1'>{job.job_type?.replace("_", " ")}</span>
    </TableCell>
    <TableCell>
      <span className='min-w-[300px] w-[300px] line-clamp-3 md:line-clamp-5'>{job.required_skills}</span>
    </TableCell>
    <TableCell>
      <span className='line-clamp-2'>{job.languages}</span>
    </TableCell>
    <TableCell>
      <span className='min-w-[270px] w-[270px] line-clamp-3 md:line-clamp-5'>{job.tags}</span>
    </TableCell>
  </tr>
));

JobRow.displayName = "JobRow";
