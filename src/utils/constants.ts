import { JobFilterParams } from "./models";

export const jobTypes = [
  { label: "Hybrid", value: "hybrid" },
  { label: "Full Time", value: "full_time" },
  { label: "Part Time", value: "part_time" },
  { label: "Internship", value: "internship" },
];

export const defaultJobsParams: JobFilterParams = {
  page: 1,
  search_term: "",
  job_type: "",
  location: "",
  skills: [],
};
