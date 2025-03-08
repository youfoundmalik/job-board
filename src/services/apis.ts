import { RequestMethod } from "@/lib/models";

export class AppAPIs {
  static getJobs: RequestMethod = {
    method: "POST",
    url: "/job/get-jobs-open",
  };
}
