import { useContext } from "react";
import { ApplyFormContext, CityContext, CityContextInterface, ApplyFormContextInterface, PreLoginContextInterface, PreLoginContext } from "../../store";

export const usePreLoginState = () => useContext<PreLoginContextInterface>(PreLoginContext);
export const useApplyFormState = () => useContext<ApplyFormContextInterface>(ApplyFormContext);
export const useCityState = () => useContext<CityContextInterface>(CityContext);