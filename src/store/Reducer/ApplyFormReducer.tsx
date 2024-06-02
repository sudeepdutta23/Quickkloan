import { ApplyFormActions, ApplyFormState } from ".."

export const ApplyFormReducer = (state : ApplyFormState, action: ApplyFormActions) : ApplyFormState => {
    switch (action.type) {
        case  "SET_COUNTRY":{
            return {
                ...state,
                country: action.payload
            }
        }
        case 'SET_COURSE_COUNTRY':{
            return {
                ...state,
                courseCountry: action.payload
            }
        }
        case 'SET_STATE':{
            return {
                ...state,
                states: action.payload
            }
        }
        case 'SET_CITY':{
            return {
                ...state,
                city: action.payload
            }
        }
        case 'PUSH_CITY': {
            for(let i = 0; i < state.city.length; i++){
                if(state.city[i].value === action.payload.value){
                    return state
                }
            }
            
            return {
                ...state,
                city: [
                    ...state.city,
                    action.payload
                ]
            }
        }
        case 'SET_EMPLOYMENT':{
            return {
                ...state,
                employment: action.payload
            }
        }
        case 'SET_LOAN_TYPE':{
            return {
                ...state,
                loanTypes: action.payload
            }
        }
        case 'SET_COURSES':{
            return {
                ...state,
                courses: action.payload
            }
        }
        case 'SET_TESTIMONIALS':{
            return {
                ...state,
                testimonials: action.payload
            }
        }
        case 'SET_DOCUMENTS':{
            return {
                ...state,
                documents: action.payload
            }
        }
        case 'SET_RELATIONS':{
            return {
                ...state,
                relation: action.payload
            }
        }
        case "INIT_VALUES":
        const [loanTypes, country, states, courses, employment, courseCountry] = action.payload;
            return {
                ...state,
                loanTypes: loanTypes?.data,
                country: country?.data,
                states: states?.data,
                courses: courses?.data,
                employment: employment?.data,
                courseCountry: courseCountry?.data
            };
        default: 
            return state;
    }
}