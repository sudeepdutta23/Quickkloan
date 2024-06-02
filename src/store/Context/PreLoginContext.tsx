import React, { createContext, useReducer, useCallback } from "react";
import {
  PreLoginActions,
  PreLoginContextInterface,
  PreLoginDispatcher,
  PreLoginState,
  PreLoginReducer,
} from "..";

const initialState: PreLoginState = {
  feature: [],
  carouselData: [],
  about: {},
  services: [],
  showSignUp: false,
  blogs: [],
  testimonials: [],
  service: {},
  blogDetails: {
    id: 0,
    title: "",
    name: "",
    shortDesc: "",
    longDesc: "",
    timeToRead: "",
    hashTags: [],
    seoKeywords: [],
    createdBy: "",
    isApproved: "",
    media: []
  },
};

export const PreLoginContext = createContext<PreLoginContextInterface>({
  state: initialState,
  dispatch: () => {},
});

/* 
  To DO  I have to do some R&D regarding dynamic payload type
*/

export const PreLoginProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, _dispatch] = useReducer(PreLoginReducer, initialState);

  const dispatch: PreLoginDispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as PreLoginActions);
  }, []);

  return (
    <PreLoginContext.Provider value={{ state, dispatch }}>
      {children}
    </PreLoginContext.Provider>
  );
};
