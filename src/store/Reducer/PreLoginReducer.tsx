import { PreLoginActions, PreLoginState } from "..";

export const PreLoginReducer = (
  state: PreLoginState,
  action: PreLoginActions
): PreLoginState => {
  switch (action.type) {
    case "SET_FEATURE":
      return { ...state, feature: action.payload };
    case "SET_CAROUSEL_DATA":
      return { ...state, carouselData: action.payload };
    case "SET_ABOUT":
      return { ...state, about: action.payload };
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    case "SET_BLOGS":
      return { ...state, blogs: action.payload };
    case "SET_TESTIMONIAL":
      return { ...state, testimonials: action.payload };
    case "SET_SINGLE_SERVICE":
        return { ...state, service: action.payload };
    case "SET_BLOG_DETAILS":
        return { ...state, blogDetails: action.payload };
    case "TOGGLE_AUTH":
      return {
        ...state,
        showSignUp: action.payload ? action.payload : !state.showSignUp,
      };
    case "INIT_VALUES":
      const [carousel, about, services, testimonials, blogs] = action.payload;
      return {
        ...state,
        carouselData: carousel?.data,
        about: about?.data,
        services: services?.data,
        testimonials: testimonials?.data,
        blogs: blogs?.data?.data,
      };
    default:
      return state;
  }
};
