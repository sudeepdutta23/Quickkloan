import React, { createContext, useCallback, useReducer } from "react";
import { ApplyFormReducer,ApplyFormActions,
  ApplyFormContextInterface,
  ApplyFormState,
  ApplyFormDispatcher, } from "..";

const initialState: ApplyFormState = {
  country: [],
  courseCountry: [],
  states: [],
  city: [],
  employment: [],
  loanTypes: [],
  courses: [],
  testimonials: [],
  documents: [],
  relation: [],
};

/* 
  To DO  I have to do some R&D regarding dynamic payload type
*/

export const ApplyFormContext = createContext<ApplyFormContextInterface>({
  state: initialState,
  dispatch: () => {},
});

export const ApplyFormProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, _dispatch] = useReducer(ApplyFormReducer, initialState);

  const dispatch: ApplyFormDispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as ApplyFormActions);
  }, []);

  return (
    <ApplyFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplyFormContext.Provider>
  );
};
