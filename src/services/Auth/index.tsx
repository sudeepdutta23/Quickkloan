import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const login = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.AUTH_LOGIN,signal, body);

export const signUp = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.AUTH_REGISTER,signal, body);

export const verifyOtp = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.AUTH_VERIFY_OTP,signal, body);

export const logout = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.AUTH_LOGOUT, signal);

export const adminCreateLead = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ADMIN_REGISTER,signal, body);

export const adminOtp = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ADMIN_OTP,signal, body);

export const resendOtp = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ADMIN_RESEND_OTP,signal, body);
