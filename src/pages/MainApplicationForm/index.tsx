import "./style.css";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useApplyFormState } from "../../hooks";
import { Step1, Step2, Step3, Step4 } from "./StepChild";
import {
  Step1Schema,
  Step2Schema,
  ValidateStepSchema,
  createSignal,
} from "../../utils";
import {
  createLead,
  deleteCosigner,
  saveForm,
  verifyOtp,
  getAllRelationship,
  getCity,
  getCountries,
  getCourses,
  getEmployementStatus,
  getLoanType,
  getStates,
} from "../../services";

const steps = ["", "", ""];

const MainApplicationForm = () => {
  const [cosigner, setCosigner] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [initValues, setInitValues] = useState<any>({});
  const { dispatch } = useApplyFormState();

  const [docloading, setDocLoading] = useState<any>({});

  const navigate = useNavigate();

  const handleCityObject = useCallback(async (stateId: any, cityId: any) => {
    if (stateId) {
      const { signal } = createSignal();
      const { data, error } = await getCity(stateId, signal);
      if (data?.abort) return;
      if (!error) {
        const stateObj = data.filter((city: any) => city.value === cityId);
        dispatch("PUSH_CITY", stateObj[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const passForCityMapping = useCallback((address: any) => {
    if (
      address?.currentCityId &&
      address?.currentCityId === address?.permanentCityId
    ) {
      handleCityObject(address?.currentStateId, address?.currentCityId);
    } else {
      handleCityObject(address?.currentStateId, address?.currentCityId);
      handleCityObject(address?.permanentStateId, address?.permanentCityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { controller, signal } = createSignal();

    (async () => {
      //-------Apply Loan--------//
      const { data, error } = await createLead(signal);
      if (data?.abort) return;
      if (!error) {
        setInitValues(data);
        setActiveStep(data.step - 1);
        //Mapp State data to state object
        //Borrower
        if (data.step === 1) {
          data?.borrower?.address &&
            passForCityMapping(data?.borrower?.address);
        }
        //Cosigner
        if (data.step === 2) {
          if (data?.cosigner && data?.cosigner?.length > 0) {
            for (let i = 0; i < data?.cosigner?.length; i++) {
              data?.cosigner?.[i]?.address &&
                passForCityMapping(data?.cosigner?.[i]?.address);
            }
          }
        }
      } else {
        toast.error(data.message);
      }
      //-------Apply Loan--------//
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepSubmit = async (values: any) => {
    let loanType = values?.loanType
      ? Number(values?.loanType)
      : Number(initValues?.loanType);
    const { signal } = createSignal();
    const { data, error } = await saveForm(
      {
        ...values,
        step: Number(initValues?.step),
        leadId: Number(initValues?.leadId),
        loanType,
      },
      signal
    );
    if (data?.abort) return;
    if (!error) {
      setActiveStep(data.step - 1);
      setInitValues(data);
      if (data?.step === 4) {
        toast.success(data?.message);
      }
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      if (initValues.step === 1) {
        dispatch("SET_LOAN_TYPE", (await getLoanType(signal)).data);
      }
      if (initValues.step === 1 || initValues.step === 2) {
        dispatch("SET_COUNTRY", (await getCountries(signal,`?showOnAddress=YES`)).data);
        dispatch("SET_STATE", (await getStates(signal)).data);
        dispatch("SET_COURSES", (await getCourses(signal)).data);
      }
      if (initValues.step === 2) {
        dispatch("SET_EMPLOYMENT", (await getEmployementStatus(signal)).data);
        dispatch("SET_COURSE_COUNTRY", (await getCountries(signal,`?showOnAddress=YES`)).data);
        dispatch("SET_RELATIONS", (await getAllRelationship(signal)).data);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues.step]);

  const handleFile = async (
    e: any,
    individual: any,
    individualId: any,
    documentId: any,
    documentType: any,
    loanType: any
  ) => {
    const { files } = e.target;
    setDocLoading({
      ...docloading,
      [`${individual}-${individualId}`]: {
        ...docloading[`${individual}-${individualId}`],
        [documentType]: true,
      },
    });

    const formData = new FormData();
    formData.append("individualType", individual);
    formData.append("individualId", individualId);
    formData.append("documentId", documentId);
    formData.append("documentType", documentType);
    formData.append("file", files[0]);
    formData.append("leadId", initValues.leadId);
    formData.append("step", "3");
    formData.append("loanType", loanType);
    const { signal } = createSignal();
    const { error, data } = await saveForm(formData, signal, true);
    if (data?.abort) return;
    if (!error) {
      setActiveStep(data.step - 1);
      setInitValues(data);
      setDocLoading({
        ...docloading,
        [`${individual}-${individualId}`]: {
          ...docloading[`${individual}-${individualId}`],
          [documentType]: false,
        },
      });
      toast.success("File uploaded successfully");
    } else {
      toast.error(data.message);
      setDocLoading({
        ...docloading,
        [`${individual}-${individualId}`]: {
          ...docloading[`${individual}-${individualId}`],
          [documentType]: false,
        },
      });
    }
  };

  const handleSelectionChange = async (e: any) => {
    const { signal } = createSignal();
    dispatch("SET_CITY", (await getCity(e.target.value, signal)).data);
  };

  const removeCosigner = useCallback(
    async (individualId: any, leadId: string | number) => {
      if (individualId) {
        const { signal } = createSignal();
        const { data, error } = await deleteCosigner(
          { individualId, leadId },
          signal
        );
        if (!error) {
          toast.success(data.message);
          return true;
        } else {
          toast.error(data.message);
        }
      }
    },
    []
  );

  const checkDocumentUploaded = (values: any) => {
    for (let file of values.borrower.fileObject) {
      if (file.requiredIndividualType == 1 && !file.documentPath) {
        toast.warning(`Borrower ${file?.documentName} is required`);
        return false;
      }
    }
    if (values?.cosigner && values.cosigner.length > 0) {
      for (let i = 0; i < values.cosigner.length; i++) {
        for (
          let j = 0;
          j < values.cosigner[i].fileObject.length;
          j++
        ) {
          let file = values.cosigner[i]?.fileObject[j];
          if (file?.requiredIndividualType == 1 && !file.documentPath) {
            toast.warning(
              `Cosigner ${i + 1} ${file?.documentName} is required`
            );
            return false
          }
        }
      }
    }
    return true;
  };

  const submitForm = async (values: any, activeStep: number) => {
    switch (activeStep) {
      case 0:
        return await ValidateStepSchema(
          Step1Schema,
          {
            ...values,
            borrower: {
              ...values.borrower,
              loanAmount: parseInt(values.borrower.loanAmount),
            },
          },
          async (values) => await stepSubmit(values)
        );
      case 1:
        return await ValidateStepSchema(
          Step2Schema(Number(values.loanType)),
          values,
          async (values) => await stepSubmit(values),
          2
        );
      case 2:
        let isAllMendatoryDocumentsUploaded = checkDocumentUploaded(values);

        if (isAllMendatoryDocumentsUploaded) await stepSubmit({ submit: true });
        return null;

      default:
        break;
    }
  };

  const verifyCosignerOTP = async (body: any) => {
    const { signal } = createSignal();
    let response = await verifyOtp(body, signal);
    if (!response.error) {
      setInitValues(response.data);
      response.error = false;
      response.data.message = "Cosigner consent given successfully";
    } else {
      response.error = true;
      response.data.message = "Something went wrong!!!";
    }
    return response;
  };

  const getForm = () => {
    switch (activeStep) {
      case 0: {
        return (
          <Step1
            initValues={initValues}
            handleSelectionChange={handleSelectionChange}
          />
        );
      }
      case 1: {
        return (
          <Step2
            initValues={initValues}
            removeCosigner={removeCosigner}
            handleSelectionChange={handleSelectionChange}
            verifyCosignerOTP={verifyCosignerOTP}
          />
        );
      }
      case 2: {
        return (
          <Step3
            handleFile={handleFile}
            docloading={docloading}
          />
        );
      }
    }
  };

  const handleBack = async () => {
    // let value: any = values;
    const { signal } = createSignal();
    const { data, error } = await saveForm(
      {
        leadId: Number(initValues?.leadId),
        step: Number(initValues?.step - 2),
        loanType: Number(initValues.loanType),
        borrower: { id: initValues?.borrower?.id },
        validate: false,
      },
      signal
    );
    if (!error) {
      setActiveStep(data.step - 1);
      setInitValues(data);
      //Mapp State data to state object
      //Borrower
      if (data.step === 1) {
        data?.borrower?.address && passForCityMapping(data?.borrower?.address);
      }
      //Cosigner
      if (data.step === 2) {
        if (data?.cosigner && data?.cosigner?.length > 0) {
          for (let i = 0; i < data?.cosigner?.length; i++) {
            data?.cosigner?.[i]?.address &&
              passForCityMapping(data?.cosigner?.[i]?.address);
          }
        }
      }
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="mx-5">
        <Button variant="text" onClick={() => navigate("/dashboard/home")}>
          <ArrowBack />
        </Button>
      </div>
      <Container component={Box} p={5}>
        <Paper component={Box} p={3}>
          {activeStep !== steps.length && (
            <Stepper alternativeLabel activeStep={activeStep} sx={{ mb: 6 }}>
              {steps.map((label, index) => {
                const labelProps = {};
                const stepProps = {};
                return (
                  <Step {...stepProps} key={index}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          )}
          {activeStep === steps.length ? (
            <Step4 values={initValues} />
          ) : (
            <>
              <Formik
                initialValues={{
                  ...initValues,
                  borrower: {
                    ...initValues.borrower,
                    id: localStorage.getItem("xtpt"),
                  },
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                  if (!initValues?.allCosignerConsentGiven && activeStep == 1) {
                    toast.warning(
                      "Please complete the consent of all the cosigners to proceed the step"
                    );
                    return;
                  }
                  await submitForm(values, activeStep);
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    {getForm()}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pt: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          color="inherit"
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                      )}
                      <Button color="primary" type="submit" variant="contained">
                        {activeStep == 1 && !initValues?.allCosignerConsentGiven
                          ? "Save"
                          : activeStep === steps.length - 1
                            ? "Submit"
                            : "Next"}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default MainApplicationForm;
