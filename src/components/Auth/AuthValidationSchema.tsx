import * as Yup from "yup";
import { CONFIG } from "../../config";

const shape = (object: Yup.ObjectShape) => Yup.object().shape(object);

export const loginSchecma = shape({
    userName: Yup.string().required("Please enter user name.")
})

export const otpSchema = shape({
    otp: Yup.string().required("Please enter otp.").length(CONFIG.otpLength, `Please enter ${CONFIG.otpLength} digits otp.`)
})

export const registerSchecma = shape({
    salutation: Yup.string().required("Please select salutation."),
    firstName: Yup.string().matches(/^[a-zA-Z\s]+$/, "Invalid first name format")
        .required("First Name is requires")
        .min(3, "First Name must be at least 3 letters")
        .max(20, "First Name must be at maximum 20 letters"),
    moddleName: Yup.string().notRequired()
        .matches(/^[a-zA-Z\s]+$/, "Invalid middle name format")
        .min(3, "First Name must be at least 3 letters")
        .max(20, "First Name must be at maximum 20 letters")
        .nullable()
        .transform((value) => (!!value ? value : null)),
    lastName: Yup.string().matches(/^[a-zA-Z\s]+$/, "Invalid last name format")
        .required("Last Name is requires")
        .min(3, "First Name must be at least 3 letters")
        .max(20, "First Name must be at maximum 20 letters"),
    mobileNo: Yup.string().matches(/^[0-9]*$/, "Invalid number format")
        .required("Number is requires")
        .min(10, "Mobile number should be at least 10 digits long")
        .max(12, "Mobile number should be maximum 12 digits long"),
    emailId: Yup.string().email("Invalid email format")
        .required("Email is required")
})