import { AccordionDetails, Button } from "@mui/material";
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { SALUATATIONS } from "../../config";
import { useApplyFormState } from "../../hooks";
import { Address } from "../Address";
import { ConsentModal } from "../ConsentModal";
import { Accordion, AccordionSummary, TextInput } from "../UI";
import Select from "../UI/TextInput/Select";

export const Cosigner = ({
  number,
  removeCosigner,
  handleChange,
  initialValues,
  values,
  handleSelectionChange,
  cosigner,
  totalCosigner,
  verifyCosignerOTP
}: any) => {
  const [showConsentModal, setConsentModal] = useState(false)
  const [currentCosigner, setCosigner] = useState(``)
  let props = number == totalCosigner - 1 ? { defaultActiveKey: "0" } : {};
  const handleCosignerConsent = (e: any, cosigner: any) => {
    e.stopPropagation();
    if (cosigner?.consentGiven != "1") {
      setConsentModal(true);
      setCosigner(cosigner)
    }
  }

  const { state } = useApplyFormState();

  const closeConsentModal = () => setConsentModal(false);
  return (
    <Accordion defaultChecked={number === 0} className="mt-4 mb-4" {...props} id={`cosigner-${number}`}>
      <AccordionSummary>
        <div className="d-flex justify-content-between align-items-baseline w-100">
          <span>Cosigner {number + 1} {<span> {cosigner?.firstName && `${cosigner?.firstName}`} {cosigner?.lastName && `${cosigner?.lastName}`}</span>}</span>
          <div>
            {/* <Button variant="contained" size="small" onClick={(e)=>handleCosignerConsent(e,cosigner)}>Ask For Consent</Button> */}
            &nbsp;&nbsp;
            <DeleteForeverIcon
              onClick={(e) => {
                removeCosigner(cosigner.individualId, number);
                e.stopPropagation();
              }}
              style={{ color: "black" }}
              className="mr-10"
            />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="d-flex justify-content-end">
          {cosigner?.id && <Button onClick={(e) => handleCosignerConsent(e, cosigner)} style={{ color: cosigner?.consentGiven == "1" ? 'green' : 'red', marginBottom: 8 }} size="small" variant="outlined" endIcon={cosigner?.consentGiven == "1" ? <DoneIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />}>Consent</Button>}
        </div>
        <Select
          label="Salutation"
          name={`cosigner[${number}].salutation`}
          value={values?.cosigner?.[number]?.salutation}
          options={SALUATATIONS}
          onChange={handleChange}
          disabled={initialValues?.[number]?.salutation}
        />
        <TextInput
          fullWidth
          label="First Name"
          name={`cosigner[${number}].firstName`}
          value={values?.cosigner?.[number]?.firstName}
          onChange={handleChange}
          disabled={initialValues?.[number]?.firstName}
        />
        <TextInput
          fullWidth
          label="Middle Name"
          name={`cosigner[${number}].middleName`}
          value={values?.cosigner?.[number]?.middleName}
          onChange={handleChange}
          disabled={initialValues?.[number]?.middleName}
        />
        <TextInput
          fullWidth
          label="Last Name"
          name={`cosigner[${number}].lastName`}
          value={values?.cosigner?.[number]?.lastName}
          onChange={handleChange}
          disabled={initialValues?.[number]?.lastName}
        />
        <TextInput
          fullWidth
          type="email"
          label="Email Id"
          name={`cosigner[${number}].emailId`}
          value={values?.cosigner?.[number]?.emailId}
          onChange={handleChange}
          disabled={initialValues?.[number]?.emailId}
        />
        <TextInput
          fullWidth
          type="tel"
          label="Mobile Number"
          name={`cosigner[${number}].mobileNo`}
          value={values?.cosigner?.[number]?.mobileNo}
          onChange={handleChange}
          disabled={initialValues?.[number]?.mobileNo}
        />
        <Select
          label={`Relationship with borrower`}
          name={`cosigner[${number}].relationship`}
          options={state?.relation}
          value={values?.cosigner?.[number]?.relationship}
          onChange={handleChange}
        />
        <Address
          type="current"
          reference="cosigner"
          cosignerNo={number}
          handleSelectionChange={handleSelectionChange}
        />
        <Address
          type="permanent"
          reference="cosigner"
          cosignerNo={number}
          handleSelectionChange={handleSelectionChange}
        />
      </AccordionDetails>
      <ConsentModal show={showConsentModal} handleOK={handleCosignerConsent} handleCancel={closeConsentModal} currentCosigner={currentCosigner} values={values} verifyCosignerOTP={verifyCosignerOTP} />
    </Accordion>
  );
};