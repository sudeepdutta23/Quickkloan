export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export interface RequestObject {
  method: RequestType;
  headers: Headers;
  body?: any;
}

export interface ResponseType {
  data: any;
  error: boolean;
}

export interface Signal { controller: AbortController, signal: AbortSignal }
