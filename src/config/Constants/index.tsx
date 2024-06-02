import { Config, CustomResponse, Dropdown } from "../";

export const CONFIG: Config = {
  images: JSON.parse(process.env.REACT_APP_IMAGES!),
  alt: process.env.REACT_APP_ALT_IMAGES,
  blogFeatureId: Number(process.env.REACT_APP_BLOG_FEATURE_ID),
  otpLength: Number(process.env.REACT_APP_OTP_LENGTH),
  secretPass: process.env.REACT_APP_SECRET_PASS,
  testimonialComma: process.env.REACT_APP_TESTIMONIAL_ICON,
  officeDetails: JSON.parse(process.env.REACT_APP_OFFICE_DETAILS!),
};

export const DEFAULT_FAIL_RESPONSE: CustomResponse = {
  error: true,
  data: {
    message: "Something Goes Wrong! Try Again Later",
    abort: false,
  },
};

export const DEFAULT_ABORT_RESPONSE: CustomResponse = {
  error: true,
  data: {
    message: "Something Goes Wrong! Try Again Later",
    abort: true,
  },
};

export const DEFAULT_SUCCESS_RESPONSE: CustomResponse = {
  error: false,
  data: {
    message: "Successful",
  },
};

export const SALUATATIONS: Array<Dropdown> = [
  {
    name: "Mr",
    value: "Mr",
  },
  {
    name: "Mrs",
    value: "Mrs",
  },
  {
    name: "Ms",
    value: "Ms",
  },
];

export const exclude401Urls: Array<string> = [
  "auth/login",
  "lead/otp",
  "lead/register",
];

export const LOAN_TYPE: Array<Dropdown> = [
  {
    name: "Domestic",
    value: "1",
  },
  {
    name: "Abroad",
    value: "2",
  },
  {
    name: "Personal",
    value: "3",
  },
  {
    name: "Business",
    value: "4",
  },
];

export const RESIDENCE: Array<Dropdown> = [
  {
    name: "Own",
    value: "1",
  },
  {
    name: "Rented",
    value: "2",
  },
  {
    name: "Pg",
    value: "3",
  },
];

const states = {
  name: 'states',
  options: [],
  type: 'select',
  placeholder: 'select state',
  value: null
}

const cities = {
  name: 'cities',
  options: [],
  type: 'select',
  placeholder: 'select city',
  value: null
}

export const FIELDS = [
  {
      header: "Countries",
      inputs: [
          {
              name: 'countries',
              options: [],
              type: "select",
              placeholder: 'select country',
              value: null
          },
          {
              name: 'countryName',
              type: 'text',
              placeholder: 'country',
              value: null
          }
      ]
  },
  {
      header: "States",
      inputs: [
          {
              name: 'countries',
              options: [],
              type: "select",
              placeholder: 'select country',
              value: null
          },
          states,
          {
              name: 'state',
              type: 'text',
              placeholder: 'state',
              value: null
          }
      ]
  },
  {
      header: "Cities",
      inputs: [
          {
              name: 'countries',
              options: [],
              type: "select",
              placeholder: 'select country',
              value: null
          },
          states,
          cities,
          {
              name: 'city',
              type: 'text',
              placeholder: 'city',
              value: null
          }
      ]
  },
  {
      header: "Work Status",
      inputs: [
          {
              name: 'works',
              options: [],
              type: 'select',
              placeholder: 'select work',
              value: null
          },
          {
              name: 'work',
              type: 'text',
              placeholder: 'work',
              value: null
          }
      ]
  }
]

export const NAVITEMS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' }, 
  { name: 'Services', id: 'services' }, 
  { name: 'Testimonials', id: 'testimonials' }
]

export const DRAWER_WIDTH = "100%";

export const RESPONSIVE = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 800 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 1,
  }
};

export const PROCESS_DATA = [
  {
    title: "Apply Now",
    description: "Apply For Loan",
  },
  {
    title: "Choose Loan Amount & Type",
    description: "Enter the loan amount and type",
  },
  {
    title: "Get loan sanctioned and disbursed into your account",
    description: "Get your money in minutes.",
  },
];

export const INITIAL_SEARCH_VALUES = { pageOffset: 6, orderBy: 'id', sort: 'desc', searchValue: '' }

export const DATE_FORMAT = 'YYYY-MM-DD';
