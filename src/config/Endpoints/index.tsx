export const ENDPOINT = {
  FEATURE_GET: "feature/getAllFeature",
  

  ABOUT_GET: `about/getAbout`,
  ABOUT_ADD: `about/addAbout`,
  ABOUT_DELETE: `about/deleteAbout`,
  

  CONTACT_SEND_MAIL: `contact/sendContactMail`,

  BLOG_GET: `blog/getAllBlog`,
  BLOG_GET_BY_ID: `blog/getBlogById`,
  BLOG_ADD: `blog/addBlog`,
  BLOG_DELETE: `blog/deleteBlog`,

  AUTH_LOGIN: `auth/login`,
  AUTH_REGISTER: `auth/register`,
  AUTH_VERIFY_OTP: `auth/otp`,
  AUTH_LOGOUT: `auth/logout`,

  ADMIN_REGISTER: `admin/register`,
  ADMIN_OTP: `admin/otp`,
  ADMIN_RESEND_OTP: `auth/resendOTP`,
  ADMIN_GET_ALL_LEADS: `admin/getAllLeads`,
  ADMIN_GET_LEAD_BY_LEADID: `admin/getLeadRecord`,
  ADMIN_DOWNLOAD_ALL_FILES: `admin/downloadAllFile`,
  ADMIN_GET_COMMENTS: `admin/fetchAllComments`,
  ADMIN_ADD_COMMENT: `admin/addComment`,
  ADMIN_UPDATE_LEAD_STATUS: `admin/updateLeadStatus`,
  ADMIN_UPDATE_STEP: `admin/updateStep`,

  PRODUCT_GET_CAROUSEL_IMAGE: `product/fetchCarouselImage`,
  PRODUCT_GET_LOAN_PRODUCT: `product/fetchLoanProduct`,
  PRODUCT_GET_LOAN_PRODUCT_BY_ID: `product/fetchLoanProductById`,
  PRODUCT_ADD_LOAN_PRODUCT: `product/addLoanProduct`,
  PRODUCT_DELETE_LOAN_PRODUCT: `product/deleteLoanProduct`,

  LEAD_APPLY_LOAN: `lead/applyLoan`,
  LEAD_SAVE_FORM: `lead/saveForm`,
  LEAD_DELETE_COSIGNER: `lead/deleteCosigner`,
  LEAD_GET_ONGOING_COMPLETED_INDIVIDUAL: `lead/getOngoingCompletedIndividual`,

  MASTER_GET_LEAD_STATUS: `master/getAllLeadStatus`,

  MASTER_GET_ALL_COUNTRY: `master/getAllCountry`,
  MASTER_GET_ALL_COURSE_COUNTRY: `master/getCourseCountry`,
  MASTER_ADD_COUNTRY: `master/addCountry`,
  MASTER_EDIT_COUNTRY: `master/editCountry`,
  MASTER_DELETE_COUNTRY: `master/deleteCountry`,

  MASTER_GET_STATE: `master/getAllState`,
  MASTER_ADD_STATE: `master/addState`,
  MASTER_EDIT_STATE: `master/editState`,
  MASTER_DELETE_STATE: `master/deleteState`,

  MASTER_GET_CITY: `master/getAllCity`,
  MASTER_ADD_CITY: `master/addCity`,
  MASTER_EDIT_CITY: `master/editCity`,
  MASTER_DELETE_CITY: `master/deleteCity`,

  MASTER_GET_EMPLOYEE_STATUS: `master/getAllEmployeeStatus`,
  MASTER_ADD_EMPLOYEE_STATUS: `master/addEmployeeStatus`,
  MASTER_EDIT_EMPLOYEE_STATUS: `master/editEmployeeStatus`,
  MASTER_DELETE_EMPLOYEE_STATUS: `master/deleteEmployeeStatus`,

  MASTER_GET_BANNER: `product/fetchCarouselImage`,
  MASTER_ADD_UPDATE_BANNER: `product/addCarouselImage`,
  MASTER_DELETE_BANNER: `product/deleteCarouselImage`,

  MASTER_GET_LOAN_TYPE: `master/getLoanType`,
  MASTER_ADD_LOAN_TYPE: `master/addLoanType`,
  MASTER_EDIT_LOAN_TYPE: `master/editLoanType`,
  MASTER_DELETE_LOAN_TYPE: `master/deleteLoanType`,

  MASTER_GET_COURSE: `master/getAllCourse`,
  MASTER_ADD_COURSE: `master/addCourse`,
  MASTER_EDIT_COURSE: `master/editCourse`,
  MASTER_DELETE_COURSE: `master/deleteCourse`,

  MASTER_GET_TESTIMONIAL: `master/fetchAllTestimonial`,
  MASTER_ADD_TESTIMONIAL: `master/addTestimonial`,
  MASTER_EDIT_TESTIMONIAL: `master/editTestimonial`,
  MASTER_DELETE_TESTIMONIAL: `master/deleteTestimonial`,

  MASTER_GET_DOCUMENTS: `master/getAllDocuments`,
  MASTER_ADD_DOCUMENTS: `master/addDocument`,
  MASTER_EDIT_DOCUMENTS: `master/updateDocument`,
  MASTER_DELETE_DOCUMENTS: `master/deleteDocument`,

  MASTER_GET_RELATIONSHIP: `getAllRelationship`,
  MASTER_ADD_RELATIONSHIP: `master/addRelationship`,
  MASTER_EDIT_RELATIONSHIP: `master/editRelationship`,
  MASTER_DELETE_RELATIONSHIP: `master/deleteRelationship`,

};
