import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";;

export const getAbout = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, ENDPOINT.ABOUT_GET, signal);

export const addUpdateAbout = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ABOUT_ADD, signal, body);

export const deleteAbout = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.GET, `${ENDPOINT.ABOUT_DELETE}/${id}`, signal);

export const postMail = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.CONTACT_SEND_MAIL, signal, body);
