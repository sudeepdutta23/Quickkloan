import { CityActions, CityState } from "..";

export const CityReducer = (state : CityState, action: CityActions): CityState =>{
    switch (action.type) {
        case 'SET_CITY_ADMIN':{
            return {
                ...state,
                city: action.payload
            }
        }
        case 'PUSH_CITY_ADMIN': {
            return {
                ...state,
                city: [
                    ...state.city,
                    action.payload
                ]
            }
        }
        default: 
            return state;
    }
}