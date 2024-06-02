import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addressSchema = Yup.object()
  .shape({
    currentAddress: Yup.string()
      .required(`Borrower current address is required`)
      .label("Address")
      .max(254, "Current Address Too Long")
      .min(3, "Invalid Address"),
    currentAddressLineTwo: Yup.string()
      .max(254, "Address Too Long")
      .notRequired()
      .nullable(),
    currentLandmark: Yup.string()
      .required(`Borrower current landmark is required`)
      .max(254),
    currentStateId: Yup.string().required(`Borrower current state is required`),
    currentCityId: Yup.string().required(`Borrower current city is required`),
    currentPincode: Yup.number()
      .required(`Borrower current pincode is required`)
      .min(100000, `Borrower current pincode must be minimum 6 digits long`)
      .max(99999999, `Borrower current pincode must be minimum 8 digits long`),
    currentCountryId: Yup.string().required(
      `Borrower current country is required`
    ),
    currentResidenceTypeId: Yup.string().required(
      `Borrower current residence is required`
    ),
    permanentAddress: Yup.string()
      .notRequired()
      .max(254, "Permanent Address Too Long")
      .min(3, "Invalid Address")
      .nullable()
      .transform((value) => (!!value ? value : null)),
    permanentAddressLineTwo: Yup.string()
      .notRequired()
      .max(254, "Permanent Address Line Two Too Long")
      .nullable()
      .transform((value) => (!!value ? value : null)),
    permanentLandmark: Yup.string()
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
    permanentStateId: Yup.string()
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null))
    ,
    permanentCityId: Yup.string()
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
    permanentPincode: Yup.number()
      .notRequired()
      .min(100000, `Borrower current pincode must be minimum 6 digits long`)
      .max(99999999, `Borrower current pincode must be minimum 8 digits long`)
      .nullable()
      .transform((value) => (!!value ? value : null)),
    permanentCountryId: Yup.string()
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
    permanentResidenceTypeId: Yup.string()
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
  })
  .label("Address");

export const Step1Schema = Yup.object().shape({
  loanType: Yup.string().required("Loan Type is required"),
  borrower: Yup.object().shape({
    loanAmount: Yup.number()
      .required("Loan Amount is required")
      .min(10000, "Loan Amount must be greater than or equal to 10000")
      .max(10000000, "Loan Amount must be less than 10000000")
      .typeError("Must be a vaild number"),
    address: addressSchema,
  }),
});

export const Step2Schema = (loanType: number) => {

  const borrowerSchema: any = {};

  const schema : { borrower : any, cosigner?: any} = { borrower: {} };

  if(loanType === 1 || loanType === 2) {
    schema.cosigner = Yup.array().of(
      Yup.object().shape({
        firstName: Yup.string()
          .required("Cosigner first name is required")
          .min(2, "Cosigner first name should be minimum 2 character long")
          .max(
            15,
            "Cosigner first name should be minimum 15 character long"
          ),
        lastName: Yup.string()
          .required("Cosigner last name is required")
          .min(2, "Cosigner last name should be minimum 2 character long")
          .max(
            15,
            "Cosigner last name should be minimum 15 character long"
          ),
          emailId: Yup.string()
          .email("Invalid cosigner email")
          .required("Cosigner email id is required"),
          mobileNo: Yup.string().required("Cosigner mobile is required"),
          relationship: Yup.string().required("Cosigner relation is required"),
        address: addressSchema,
      })
    );
  }

  if(loanType === 1) {
    borrowerSchema.courseCountryId = Yup.string().required("Country is required");
  }

  if(loanType === 2) {
    borrowerSchema.courseId = Yup.string().required("Course is required");
  }

  if(loanType === 3 || loanType === 4) {
    borrowerSchema.employmentTypeId = Yup.string().required("Work status is required");
    borrowerSchema.salary = Yup.number().required("Salary is required");
  }

  schema.borrower = Yup.object().shape(borrowerSchema).required("Please Fill All The Fields");

  return Yup.object().shape(schema);
  
};

export const signUpSchema = Yup.object().shape({
  salutation: Yup.string().required("Salutation is required"),
  firstName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Invalid first name format")
    .required("First Name is requires")
    .min(3, "First Name must be at least 3 letters")
    .max(20, "First Name must be at maximum 20 letters"),
  middleName: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z\s]+$/, "Invalid middle name format")
    .min(3, "First Name must be at least 3 letters")
    .max(20, "First Name must be at maximum 20 letters")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Invalid last name format")
    .required("Last Name is requires")
    .min(3, "First Name must be at least 3 letters")
    .max(20, "First Name must be at maximum 20 letters"),
    mobileNo: Yup.string()
    .matches(/^[0-9]*$/, "Invalid number format")
    .required("Number is requires")
    .min(10, "Mobile number should be at least 10 digits long")
    .max(12, "Mobile number should be maximum 12 digits long"),
    emailId: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const CONTACT_US_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, "name should be atleast 2 letters long")
    .max(800, "name should be less than 800 letters long!")
    .required("name is required"),
  email: Yup.string().email("Invalid email").required("email is required"),
  comment: Yup.string()
    .min(15, "comment should be atleast 15 letters long")
    .max(5000, "comment should be less than 5000 letters long!")
    .required("comment is required"),
});

export const ValidateStepSchema = async (
  schema: any, 
  values: any,
  cb: (values: any) => {},
  step: any = null
) => {
  await schema
    .validate(values)
    .then(() => {
      cb(values);
    })
    .catch((error: any) => {
      if(step === 2){
        let message = error.errors[0].includes("Borrower") ? error.errors[0].replace("Borrower","Cosigner") : error.errors[0]
        toast.error(message);
      }else{
        toast.error(error.errors[0]);
      }
    });
};
