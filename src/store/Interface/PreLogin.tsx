export interface FeatureType {
  description: string;
  id: number;
  isActive: string;
  toggle_id: string;
}

export type CarouselDataType = { image: string; id: string, text?: string };

export type AboutUsType = { about?: string; id?: number; isActive?: string };

export type ServiceType = {
  id?: number;
  icon?: string;
  name?: string;
  desc?: string;
  percentEnd?: string;
  percentStart?: string;
};

export interface BlogMedia {
  id: number;
  blog_id: string;
  media: string;
}

export interface BlogDetailsInterface {
    id: number;
    title: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    timeToRead: string;
    hashTags: string[];
    seoKeywords: string[];
    createdBy: string;
    isApproved: string;
    latestBlog?: BlogDetailsInterface[];
    media: BlogMedia[];
};

export type PreLoginState = {
  feature: Array<FeatureType>;
  carouselData: Array<CarouselDataType>;
  about: AboutUsType;
  services: Array<ServiceType>;
  showSignUp: boolean;
  blogs: any;
  testimonials: any;
  service: ServiceType;
  blogDetails: BlogDetailsInterface
};

export type PreLoginActionsMap = {
  SET_FEATURE: "SET_FEATURE";
  SET_CAROUSEL_DATA: "SET_CAROUSEL_DATA";
  SET_ABOUT: "SET_ABOUT";
  SET_SERVICES: "SET_SERVICES";
  TOGGLE_AUTH: "TOGGLE_AUTH";
  SET_BLOGS: "SET_BLOGS";
  SET_TESTIMONIAL: "SET_TESTIMONIAL";
  INIT_VALUES: "INIT_VALUES";
  SET_SINGLE_SERVICE: "SET_SINGLE_SERVICE";
  SET_BLOG_DETAILS: "SET_BLOG_DETAILS";
};

export type PreLoginActions = {
  [Key in keyof PreLoginActionsMap]: {
    type: Key;
    payload: any;
  };
}[keyof PreLoginActionsMap];

export type PreLoginDispatcher = <
  Type extends PreLoginActions["type"],
  Payload extends any
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type PreLoginContextInterface = {
  readonly state: PreLoginState,
  readonly dispatch: PreLoginDispatcher
};
