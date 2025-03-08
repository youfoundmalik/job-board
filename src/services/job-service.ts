import axiosInstance from "./axios";
import { AppAPIs } from "./apis";
import { JobFilterParams, JobModel } from "@/lib/models";

export const getAllJobs = async (params: JobFilterParams = {}): Promise<JobModel[]> => {
  const data = Object.fromEntries(
    Object.entries(params).filter((entry) => {
      if (Array.isArray(entry[1])) {
        return entry[1].length > 0 && entry[1][0] !== "";
      }
      return entry[1] !== "";
    })
  );
  try {
    const { method, url } = AppAPIs.getJobs;
    console.log(method, url, data);
    const response = await axiosInstance.request({
      method,
      url,
      data, //data is the payload
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
