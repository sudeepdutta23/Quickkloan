import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { SALUATATIONS } from "../../config";
import { getAllRelationship } from "../../services/Master";
import { CityProvider } from "../../store";
import { Address } from "../Address/AdminAddress";
import { ConsentModal } from "../ConsentModal";
import { Accordion, AccordionDetails, AccordionSummary, TextInput } from "../UI";
import { createSignal } from "../../utils";
import Select from "../UI/TextInput/Select";

export const Cosigner = ({
  number,
  removeCosigner,
  handleChange,
  isAdmin,
  errors,
  values,
  touched,
  setFieldTouched,
  handleSelectionChange,
  cosigner,
  totalCosigner,
  setFieldValue,
  tempStateArr,
  verifyCosignerOTP
}: any) => {
  const [showConsentModal, setConsentModal] = useState(false)
  const [currentCosigner, setCosigner] = useState(``)
  const [relationArray, setRelation] = useState<any>([])
  const handleCosignerConsent = (e: any, cosigner: any) => {
    e.stopPropagation();
    if (cosigner?.consentGiven != "1") {
      setConsentModal(true);
      setCosigner(cosigner)
    }
  }

  useEffect(() => {
    (async () => {
      const { signal} = createSignal();
      const { data, error } = await getAllRelationship(signal);
      if (!error) setRelation(data);
    })()
  }, [])

  const closeConsentModal = () => setConsentModal(false);
  let props = number == totalCosigner - 1 ? { defaultActiveKey: "0" } : {};
  return (
    <Accordion defaultChecked={number && number === 0 ? true: false} className="mt-4 mb-6" {...props} id={`cosigner-${number}`}>
        <AccordionSummary>
          <div className="d-flex justify-content-between w-100">
            <span>Cosigner {number + 1} {<span> {cosigner?.firstName && `${cosigner?.firstName}`} {cosigner?.lastName && `${cosigner?.lastName}`}</span>}</span>
            <div>
              {/* // (cosigner?.consentGiven ?<HiDocumentCheck style={{ color:  "green", fontSize: 25 }} onClick={(e)=> e.stopPropagation()} />:<HiDocumentCheck style={{ color: "red", fontSize: 25 }} onClick={(e)=>handleCosignerConsent(e,cosigner)}  />)} */}
              &nbsp;&nbsp;
              {isAdmin && <DeleteForeverIcon
                onClick={(e) => {
                  removeCosigner(cosigner.individualId, number);
                  e.stopPropagation();
                }}
                style={{ color: "black" }}
                className="mr-10"
              />}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex justify-content-end">
            {cosigner?.id && <Button style={{ color: cosigner?.consentGiven == "1" ? 'green' : 'red', marginBottom: 8 }} size="small" variant="outlined" endIcon={cosigner?.consentGiven == "1" ? <DoneIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} />}>Consent</Button>}
          </div>
           <Select 
            label="Salutation"
            name={`cosigner[${number}].salutation`}
            value={values?.cosigner?.[number]?.salutation}
            options={SALUATATIONS}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <TextInput 
            fullWidth
            label="First Name"
            name={`cosigner[${number}].firstName`}
            value={values?.cosigner?.[number]?.firstName}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <TextInput 
            fullWidth
            label="Middle Name"
            name={`cosigner[${number}].middleName`}
            value={values?.cosigner?.[number]?.middleName}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <TextInput 
            fullWidth
            label="Last Name"
            name={`cosigner[${number}].lastName`}
            value={values?.cosigner?.[number]?.lastName}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <TextInput 
            fullWidth
            type="email"
            label="Email Id"
            name={`cosigner[${number}].emailId`}
            value={values?.cosigner?.[number]?.emailId}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <TextInput 
            fullWidth
            type="tel"
            label="Mobile Number"
            name={`cosigner[${number}].mobileNo`}
            value={values?.cosigner?.[number]?.mobileNo}
            onChange={handleChange}
            disabled={!isAdmin}
          />
          <Select 
              label={`Relationship with borrower`}
              name={`cosigner[${number}].relationship`}
              options={relationArray}
              value={values?.cosigner?.[number]?.relationship}
              onChange={handleChange}
              disabled={!isAdmin}
            />
          <CityProvider>
            <>
            <Address
              type="current"
              reference="cosigner"
              values={values}
              touched={touched}
              handleChange={handleChange}
              setFieldTouched={setFieldTouched}
              isAdmin={isAdmin}
              errors={errors}
              cosignerNo={number}
              handleSelectionChange={handleSelectionChange}
              setFieldValue={setFieldValue}
              tempStateArr={tempStateArr}
            />
            <Address
              type="permanent"
              reference="cosigner"
              values={values}
              touched={touched}
              handleChange={handleChange}
              isAdmin={isAdmin}
              setFieldTouched={setFieldTouched}
              errors={errors}
              cosignerNo={number}
              handleSelectionChange={handleSelectionChange}
              setFieldValue={setFieldValue}
              tempStateArr={tempStateArr}
            />
            </>
          </CityProvider>
        </AccordionDetails>
      <ConsentModal show={showConsentModal} handleOK={handleCosignerConsent} handleCancel={closeConsentModal} currentCosigner={currentCosigner} values={values} verifyCosignerOTP={verifyCosignerOTP} />
    </Accordion>
  );
};
