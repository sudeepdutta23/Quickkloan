export interface CustomResponse {
  error: boolean;
  data: {
    message: string;
    [key: string]:any;
  };
}

export interface Config {
    images: {
      FOOTER: string;
      HEADER: string;
      LOGO: string;
      DEFAULT_IMAGE: string;
      ABOUT: string;
    }
    alt: string | undefined;
    blogFeatureId: number;
    otpLength: number;
    secretPass: string | undefined;
    testimonialComma: string | undefined;
    officeDetails: {
      OFFICE_ADDRESS: string | undefined;
      MAIL:string | undefined;
      NUMBERS: string[] | undefined;
      OFFICE_HOURS: string | undefined;
    }
}

export interface Dropdown {
  name: string;
  value: string;
}

