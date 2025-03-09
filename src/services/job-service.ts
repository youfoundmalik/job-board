import axiosInstance from "./axios";
import { AppAPIs } from "./apis";
import { JobFilterParams, JobModel } from "@/types/job";
import { ApiError } from "@/types/api";

export class JobService {
  static async getAllJobs(params: JobFilterParams = {}): Promise<JobModel[]> {
    try {
      const filteredParams = this.filterEmptyParams(params);
      const { method, url } = AppAPIs.getJobs;

      const response = await axiosInstance.request({
        method,
        url,
        data: filteredParams,
      });

      return response.data;
    } catch (error) {
      throw new ApiError("Failed to fetch jobs", error);
    }
  }

  private static filterEmptyParams(params: JobFilterParams) {
    return Object.fromEntries(
      Object.entries(params).filter((entry) => {
        if (Array.isArray(entry[1])) {
          return entry[1].length > 0 && entry[1][0] !== "";
        }
        return entry[1] !== "";
      })
    );
  }
}
