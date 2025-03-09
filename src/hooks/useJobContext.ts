import { useContext } from "react";
import JobsContext from "@/context/JobsContext";

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobsContext must be used within an JobsContextProvider");
  }
  return context;
}
