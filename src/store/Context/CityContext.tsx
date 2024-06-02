import { createContext, useCallback, useReducer } from "react";
import {
  CityReducer,
  CityActions,
  CityContextInterface,
  CityDispatcher,
  CityState,
} from "..";

const initialState: CityState = {
  city: [],
};

export const CityContext = createContext<CityContextInterface>({
  state: initialState,
  dispatch: () => {},
});

/* 
  To DO  I have to do some R&D regarding dynamic payload type
*/

export const CityProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, _dispatch] = useReducer(CityReducer, initialState);

  const dispatch: CityDispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as CityActions);
  }, []);

  return (
    <CityContext.Provider value={{ state, dispatch }}>
      {children}
    </CityContext.Provider>
  );
};
