import { ENDPOINT, CustomResponse } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getFeatureList = async (signal: AbortSignal) : Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.FEATURE_GET, signal)