import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getBlogList = async (paramData: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.GET,
    `${ENDPOINT.BLOG_GET}?${new URLSearchParams(paramData)}`,
    signal
  );

export const getBlogListById = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, `${ENDPOINT.BLOG_GET_BY_ID}/${id}`, signal);

export const addUpdateBlogList = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.BLOG_ADD, signal, body, true);

export const deleteBlogListById = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, `${ENDPOINT.BLOG_DELETE}/${id}`, signal);