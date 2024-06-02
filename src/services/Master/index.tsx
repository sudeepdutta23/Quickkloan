import { CustomResponse, ENDPOINT } from "../../config";
import { RequestType, callApi } from "../../utils";

export const getCountries = async (signal: AbortSignal, param: string = ``): Promise<CustomResponse> => await callApi(RequestType.GET,`${ENDPOINT.MASTER_GET_ALL_COUNTRY}${param}`, signal);

// export const getCourseCountries = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_ALL_COURSE_COUNTRY, signal);

export const addCountries = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_COUNTRY, signal, body);

export const editCountries = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_COUNTRY}/${id}`, signal, body);

export const deleteCountries = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_COUNTRY}/${id}`, signal);

export const getStates = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_STATE, signal);

export const addStates = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_STATE, signal, body);

export const editStates = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_STATE}/${id}`, signal, body);

export const deleteStates = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_STATE}/${id}`, signal);

export const getCity = async (stateId: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, `${ENDPOINT.MASTER_GET_CITY}/${stateId}`, signal);

export const addCity = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_CITY, signal, body);

export const editCity = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_CITY}/${id}`, signal, body);

export const deleteCity = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_CITY}/${id}`, signal);

export const getEmployementStatus = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_EMPLOYEE_STATUS, signal);

export const addEmployementStatus = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_EMPLOYEE_STATUS, signal, body);

export const editEmployementStatus = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT,`${ENDPOINT.MASTER_EDIT_EMPLOYEE_STATUS}/${id}`, signal, body)

export const deleteEmployementStatus = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE,`${ENDPOINT.MASTER_DELETE_EMPLOYEE_STATUS}/${id}`, signal);

export const addUpdateBanner = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_UPDATE_BANNER, signal, body,true);

export const getBanner = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_BANNER, signal);

export const deleteBanner = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET,`${ENDPOINT.MASTER_DELETE_BANNER}/${id}`, signal);

export const getLoanType = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_LOAN_TYPE, signal);

export const addLoanType = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_LOAN_TYPE, signal, body);

export const editLoanType = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_LOAN_TYPE}/${id}`, signal, body);

export const deleteLoanType = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_LOAN_TYPE}/${id}`, signal);

export const getCourses = async (signal: AbortSignal): Promise<CustomResponse> =>  await callApi(RequestType.GET, ENDPOINT.MASTER_GET_COURSE, signal);

export const addCourses = async (body: any, signal: AbortSignal): Promise<CustomResponse> =>  await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_COURSE, signal, body);

export const editCourses = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> =>  await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_COURSE}/${id}`, signal, body);

export const deleteCourses = async (id: any, signal: AbortSignal): Promise<CustomResponse> =>  await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_COURSE}/${id}`, signal);

export const getTestimonials = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_TESTIMONIAL, signal);

export const addTestimonials = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST,ENDPOINT.MASTER_ADD_TESTIMONIAL, signal, body, true);

export const editTestimonials = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST,ENDPOINT.MASTER_EDIT_TESTIMONIAL, signal, body, true);

export const deleteTestimonials = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE,`${ENDPOINT.MASTER_DELETE_TESTIMONIAL}/${id}`, signal);

export const getDocuments = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_DOCUMENTS, signal);

export const addDocuments = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_DOCUMENTS, signal, body);

export const editDocuments = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT,`${ENDPOINT.MASTER_EDIT_DOCUMENTS}/${id}`, signal, body);

export const deleteDocuments = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_DOCUMENTS}/${id}`, signal);

export const getAllRelationship = async (signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.GET, ENDPOINT.MASTER_GET_RELATIONSHIP, signal);

export const addRelationship = async (body: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.POST, ENDPOINT.MASTER_ADD_RELATIONSHIP, signal, body);

export const editRelationship = async (body: any, id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.PUT, `${ENDPOINT.MASTER_EDIT_RELATIONSHIP}/${id}`, signal, body);

export const deleteRelationship = async (id: any, signal: AbortSignal): Promise<CustomResponse> => await callApi(RequestType.DELETE, `${ENDPOINT.MASTER_DELETE_RELATIONSHIP}/${id}`, signal);