import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LeadComments, Loader } from "../../../components";
import { useApplyFormState } from "../../../hooks";
import {
  getStatus,
  updateStatus,
  updateStep,
  getCity,
  getCountries,
  getCourses,
  getEmployementStatus,
  getLoanType,
  getStates,
  verifyOtp,
  deleteCosigner,
  downloadAllFile,
  getLeadRecords,
  saveForm,
} from "../../../services";
import { SmallUserCard } from "../SmallUserCard";
import { Step1 } from "../Steps/Step1";
import { Step2 } from "../Steps/Step2";
import { Step3 } from "../Steps/Step3";
import "./style.css";
import { Button } from "../../../components";
import { createSignal } from "../../../utils";

const LeadDetails = ({ leadId, isAdmin }: any) => {
  const param = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApplyFormState();
  const [activeTab, setTab] = useState(0);
  const [initValues, setInitValues] = useState<any>({});
  const tabHeaders = ["Step-1", "Step-2", "Step-3"];
  const [cosigner, setCosigner] = useState<number[]>([]);
  const [docloading, setDocLoading] = useState<any>({});
  const [leadStatuses, putStatuses] = useState<any>([]);
  const [tempStateArr, setTempState] = useState<any>([]);
  const [displayLoader, setLoader] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleCityObject = async (stateId: any, cityId: any) => {
    if (stateId) {
      const { signal } = createSignal();
      const { data } = await getCity(stateId, signal);
      let cityObj = data.filter((city: any) => city.value === cityId);
      if (!cityObj.length) {
        cityObj = [data[0]];
      }
      let duplicateFound = false;
      if (tempStateArr.length) {
        tempStateArr.forEach((city: any) => {
          if (city.value == cityObj[0].value) {
            duplicateFound = true;
          }
        });
      }
      if (!duplicateFound) {
        tempStateArr.push(cityObj[0]);
        setTempState(tempStateArr);
      }
      // dispatchCity({ type: "PUSH_CITY_ADMIN", payload: stateObj[0] })
    }
  };

  const passForCityMapping = (address: any) => {
    if (
      address?.currentCityId &&
      address?.currentCityId === address?.permanentCityId
    ) {
      handleCityObject(address?.currentStateId, address?.currentCityId);
    } else {
      handleCityObject(address?.currentStateId, address?.currentCityId);
      handleCityObject(address?.permanentStateId, address?.permanentCityId);
    }
  };

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      Promise.all([getLoanType(signal),getCountries(signal),getStates(signal), getCourses(signal), getEmployementStatus(signal), getCountries(signal,`?showOnAddress=YES`)]).then((data: any) => {
        if (!data?.[0]?.data?.abort) dispatch("INIT_VALUES", data);
      });
    })();

    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeadRecords = async () => {
    setLoader(true);
    let leadID = leadId ? leadId : param.leadId;
    const { signal } = createSignal();
    const { data, error } = await getLeadRecords(leadID, signal);
    if (!error) {
      setInitValues(data?.leadDetails);
      data?.leadDetails?.step1?.borrower?.address &&
        passForCityMapping(data?.leadDetails?.step1?.borrower?.address);
      if (
        data?.leadDetails?.step2?.cosigner &&
        data?.leadDetails?.step2?.cosigner?.length > 0
      ) {
        for (let i = 0; i < data?.leadDetails?.step2?.cosigner.length; i++) {
          data?.leadDetails?.step2?.cosigner?.[i]?.address &&
            passForCityMapping(
              data?.leadDetails?.step2?.cosigner?.[i]?.address
            );
        }
      }
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      await fetchLeadRecords();
      if (isAdmin) {
        const { data, error } = await getStatus(signal);
        if (!error) {
          putStatuses(data);
        }
      }
    })();
    setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewCosigner = useCallback(() => {
    if (cosigner.length <= 4) {
      setCosigner([...cosigner, cosigner.length + 1]);
    } else {
      toast.warn("Only 5 cosigners are allowed");
    }
  }, [cosigner]);

  const removeCosigner = useCallback(
    async (individualId: any, leadId: string | number, index: number) => {
      if (individualId) {
        const { signal } = createSignal();
        const { data, error } = await deleteCosigner(
          { individualId, leadId },
          signal
        );
        if (!error) {
          toast.success(data.message);
          setInitValues({...initValues, step3: {...initValues?.step3, cosigner: [...initValues?.step3?.cosigner?.filter((item: any,i: number)=> i != index)] }, step2: { ...initValues?.step2, cosigner: [...initValues?.step2?.cosigner?.filter((item: any, i: number)=> i != index)] }})
        } else {
          toast.error(data.message);
        }
      }
    },
    []
  );

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
    formData.append("leadId", initValues?.borrower?.leadId);
    formData.append("step", "3");
    formData.append("loanType", loanType);
    const { signal } = createSignal();
    const { error, data } = await saveForm(formData, signal, true);
    if (!error) {
      fetchLeadRecords();
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
    if (!error) {
      //   setActiveStep(data.step - 1);
      setInitValues(data);
    } else {
      toast.error(data.message);
    }
  };

  const handleAllFileDownload = async (leadId: any) => {
    let documentsNotFound = false;
    let noOfDocuments = [];
    noOfDocuments.push(initValues?.step3?.borrower?.fileObject.length);
    if (initValues?.step3?.cosigner && initValues?.step3?.cosigner.length > 0) {
      initValues?.step3?.cosigner.forEach((cosigner: any) => {
        noOfDocuments.push(cosigner?.fileObject.length);
      });
    }
    noOfDocuments.forEach((value) => {
      if (value > 0) {
        documentsNotFound = true;
      }
    });
    if (documentsNotFound) {
      const { signal } = createSignal();
      const { data, error } = await downloadAllFile(leadId, signal);
      if (error) {
        toast.error(data.message);
      }
    } else {
      toast.error("No Documents Found");
    }
    return true;
  };

  const step3Submit = async (values: any) => {
    const { signal } = createSignal();
    const { data, error } = await saveForm(
      {
        ...values,
        step: Number(initValues?.step3?.step),
        leadId: Number(initValues?.step3?.leadId),
        loanType: initValues?.step3?.loanType,
      },
      signal
    );
    if (!error) {
      toast.success(data?.message);
      fetchLeadRecords();
    } else {
      toast.error(data.message);
    }
  };

  const verifyCosignerOTP = async (body: any) => {
    const { signal } = createSignal();
    let response = await verifyOtp(body, signal);
    if (!response.error) {
      setInitValues(response.data);
      toast.success("Cosigner consent given successfully");
      fetchLeadRecords();
    } else {
      toast.error("Something went wrong!!!");
    }
  };

  const getStep = () => {
    switch (activeTab) {
      case 0:
        return (
          <Step1
            tempStateArr={tempStateArr}
            isAdmin={isAdmin}
            initValues={initValues?.step1}
            handleChange={handleChange}
            handleSelectionChange={handleSelectionChange}
            stepSubmit={stepSubmit}
            activeTab={activeTab}
            fetchLeadRecords={fetchLeadRecords}
          />
        );
      case 1:
        return (
          <Step2
            initValues={initValues?.step2}
            isAdmin={isAdmin}
            tempStateArr={tempStateArr}
            handleChange={handleChange}
            addNewCosigner={addNewCosigner}
            removeCosigner={removeCosigner}
            cosigner={cosigner}
            handleSelectionChange={handleSelectionChange}
            activeTab={activeTab}
            fetchLeadRecords={fetchLeadRecords}
            verifyCosignerOTP={verifyCosignerOTP}
          />
        );
      case 2:
        return (
          <Step3
            handleChange={handleChange}
            isAdmin={isAdmin}
            handleFile={handleFile}
            docloading={docloading}
            values={initValues?.step3}
            currentStep={initValues?.borrower?.step}
            handleAllFileDownload={handleAllFileDownload}
            step3Submit={step3Submit}
          />
        );
      default:
        return "";
    }
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value == index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const updateLeadStatus = async (leadStatus: any) => {
    let payload = {
      leadId: initValues?.borrower?.leadId,
      borrower: {
        id: initValues?.borrower?.individualId,
        leadStatus,
      },
    };
    const { signal } = createSignal();
    const { data, error } = await updateStatus(payload, signal);
    if (!error) {
      toast.success(data?.message);
      fetchLeadRecords();
    } else {
      toast.error(data?.message);
    }
  };

  const updateLeadStep = async (leadId: any, step: any) => {
    const { signal } = createSignal();
    const { data, error } = await updateStep({ leadId, step }, signal);
    if (!error) {
      toast.success(data?.message);
      fetchLeadRecords();
    } else {
      toast.error(data?.message);
    }
  };

  return ( initValues?.borrower?.leadId && !displayLoader ?
    <Container maxWidth="xl">
      <div className="mx-1">
        {isAdmin && (
          <div className="d-flex">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              <ArrowBack className="mb-1" />
            </Button>
            <div className="text-center w-100 h2">
              <u>Lead-{param.leadId}</u>
            </div>
          </div>
        )}
        <div className="mt-1">
          <Card>
            <CardContent>
              {isAdmin && (
                <div className="d-flex justify-content-center">
                  <div className="leadCard">
                    <SmallUserCard
                      data={initValues?.borrower}
                      leadStatuses={leadStatuses}
                      updateLeadStatus={updateLeadStatus}
                      updateLeadStep={updateLeadStep}
                    />
                  </div>
                </div>
              )}
              {initValues?.borrower?.leadId && isAdmin && (
                <LeadComments leadId={initValues?.borrower?.leadId} />
              )}
              <div className="mt-6">
                <Paper>
                  <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs
                      value={activeTab}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      centered
                    >
                      {tabHeaders.map((tab, i) => (
                        <Tab label={tab} key={i} />
                      ))}
                    </Tabs>
                  </Box>
                  {tabHeaders.map((tab, i) => (
                    <TabPanel value={activeTab} index={i} key={i}>
                      {displayLoader ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        getStep()
                      )}
                    </TabPanel>
                  ))}
                </Paper>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>: <Loader isFullPage />
  );
};

export default LeadDetails;
