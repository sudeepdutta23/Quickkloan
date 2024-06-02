import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getBannerImages = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, ENDPOINT.PRODUCT_GET_CAROUSEL_IMAGE, signal);
