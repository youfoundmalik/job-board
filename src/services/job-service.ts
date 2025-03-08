import axiosInstance from "./axios";
import { AppAPIs } from "./apis";
import { JobFilterParams, JobModel } from "@/lib/models";

export const getAllJobs = async (data: JobFilterParams): Promise<JobModel[]> => {
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
