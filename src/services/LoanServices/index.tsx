import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getServices = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, ENDPOINT.PRODUCT_GET_LOAN_PRODUCT, signal);

export const getServiceById = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.GET,
    `${ENDPOINT.PRODUCT_GET_LOAN_PRODUCT_BY_ID}/${id}`,
    signal
  );

export const addUpdateServices = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.POST,
    ENDPOINT.PRODUCT_ADD_LOAN_PRODUCT,
    signal,
    body,
    true
  );

export const deleteServices = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.GET,
    `${ENDPOINT.PRODUCT_DELETE_LOAN_PRODUCT}/${id}`,
    signal,
  );
