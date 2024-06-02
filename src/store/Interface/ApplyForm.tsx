export interface CountryInterface {
  value: string;
  countryCode: string;
  name: string;
  showOnAddress: string;
}

export interface StateInterface {
  value: string;
  countryId: string;
  stateCode: string;
  name: string;
}

export interface CityInterface {
  value: string;
  cityCode: string;
  name: string;
  stateId: string;
}

export interface EmploymentInterface {
  value: string;
  name: string;
}

export interface LoanTypeInterface {
  value: string;
  name: string;
  orderBy: string;
}

export interface CoursesInterface {
  value: string;
  name: string;
}

export interface TestimonialInterface {
  name?: string; 
  value: number| string;
  customerName: string;
  customerImage: string;
  customerComment: string;
  customerCollegeName: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentsInterface {
  id: number;
  value: string;
  documentType: string;
  documentName: string;
  loanType: string;
  individualType: string;
  requiredIndividualType: string;
}

export interface RelationInterface {
  value: string;
  name: string;
}

export type ApplyFormState = {
  country: Array<CountryInterface>;
  courseCountry: Array<CountryInterface>;
  states: Array<StateInterface>;
  city: Array<CityInterface>;
  employment: Array<EmploymentInterface>;
  loanTypes: Array<LoanTypeInterface>;
  courses: Array<CoursesInterface>;
  testimonials: Array<TestimonialInterface>;
  documents: Array<DocumentsInterface>;
  relation: Array<RelationInterface>;
};

export type ApplyFormActionsMap = {
  SET_COURSE_COUNTRY: "SET_COURSE_COUNTRY";
  SET_COUNTRY: "SET_COUNTRY";
  SET_STATE: "SET_STATE";
  SET_CITY: "SET_CITY";
  PUSH_CITY: "PUSH_CITY";
  SET_EMPLOYMENT: "SET_EMPLOYMENT";
  SET_LOAN_TYPE: "SET_LOAN_TYPE";
  SET_COURSES: "SET_COURSES";
  SET_TESTIMONIALS: "SET_TESTIMONIALS";
  SET_DOCUMENTS: "SET_DOCUMENTS";
  SET_RELATIONS: "SET_RELATIONS";
  INIT_VALUES: "INIT_VALUES";
};

export type ApplyFormActions = {
  [Key in keyof ApplyFormActionsMap]: {
    type: Key;
    payload: any;
  };
}[keyof ApplyFormActionsMap];

export type ApplyFormDispatcher = <
  Type extends ApplyFormActions["type"],
  Payload extends any
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type ApplyFormContextInterface = {
  readonly state: ApplyFormState,
  readonly dispatch: ApplyFormDispatcher
};
