import { RequestMethod } from "@/types/api";

export class AppAPIs {
  static getJobs: RequestMethod = {
    method: "POST",
    url: "/job/get-jobs-open",
  };
}
