import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getStatus = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, ENDPOINT.MASTER_GET_LEAD_STATUS, signal);

export const updateStatus = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.PUT, ENDPOINT.ADMIN_UPDATE_LEAD_STATUS, signal, body);

export const updateStep = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.PUT, ENDPOINT.ADMIN_UPDATE_STEP, signal, body);
