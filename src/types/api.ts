export class ApiError extends Error {
  constructor(
    message: string,
    public originalError?: unknown,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestMethod {
  method: HTTPMethod;
  url: string;
}
