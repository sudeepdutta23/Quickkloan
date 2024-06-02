import moment from "moment";
import { ENDPOINT, CustomResponse, DATE_FORMAT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const createLead = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.LEAD_APPLY_LOAN, signal, {
    borrower: { id: localStorage.getItem("xtpt") },
  });

export const saveForm = async (
  body: any,
  signal: AbortSignal,
  isFileUploading = false
): Promise<CustomResponse> =>
  await callApi(
    RequestType.POST,
    ENDPOINT.LEAD_SAVE_FORM,
    signal,
    body,
    isFileUploading
  );

export const deleteCosigner = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.DELETE,
    `${ENDPOINT.LEAD_DELETE_COSIGNER}/${body.individualId}/${body.leadId}`,
    signal
  );

export const getOngoingCompleted = async (signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.POST,
    ENDPOINT.LEAD_GET_ONGOING_COMPLETED_INDIVIDUAL,
    signal,
    { borrower: { id: localStorage.getItem("xtpt") } }
  );

export const getLeadRecords = async (leadId: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.GET,
    `${ENDPOINT.ADMIN_GET_LEAD_BY_LEADID}/${leadId}`,
    signal
  );

export const getFilterLeads = async (
  query: any,
  signal: AbortSignal,
  pagination?: any
): Promise<CustomResponse> => {
  let newQuery = { ...query, fromDate: query.fromDate ? moment(query.fromDate).format(DATE_FORMAT) : query.fromDate, toDate: query.toDate ? moment(query.toDate).format(DATE_FORMAT) : query.toDate };
  let queryParams: any = new URLSearchParams(newQuery);
  if (pagination) {
    queryParams = `${queryParams}&${pagination}`;
  }
  const res = await callApi(
    RequestType.GET,
    `${ENDPOINT.ADMIN_GET_ALL_LEADS}?${queryParams}`,
    signal
  );
  return res;
};

export const downloadAllFile = async (leadId: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(
    RequestType.GET,
    `${ENDPOINT.ADMIN_DOWNLOAD_ALL_FILES}/${leadId}`,
    signal,
    null,
    false,
    true
  );

export const downloadExcelLeadsReport = async (
  query: any,
  signal: AbortSignal,
  pagination?: any
): Promise<CustomResponse> => {
  let newQuery = { ...query, fromDate: query.fromDate ? moment(query.fromDate).format(DATE_FORMAT) : query.fromDate, toDate: query.toDate ? moment(query.toDate).format(DATE_FORMAT) : query.toDate };
  let queryParams: any = new URLSearchParams(newQuery);
  if (pagination) {
    queryParams = `${queryParams}&${pagination}`;
  }
  const res = await callApi(
    RequestType.GET,
    `${ENDPOINT.ADMIN_GET_ALL_LEADS}?${queryParams}`,
    signal,
    null,
    false,
    true
  );
  return res;
};

export const getLeadComments = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ADMIN_GET_COMMENTS, signal, body);

export const setLeadComments = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>
  await callApi(RequestType.POST, ENDPOINT.ADMIN_ADD_COMMENT, signal, body);
