import { useEffect, useState } from "react";
import { useApplyFormState } from "../../hooks/Store";
import { getCity } from "../../services/Master";
import { RESIDENCE } from "../../config/Constants";
import { Accordion, AccordionDetails, AccordionSummary, LabelledSwitch, TextInput } from "../UI";
import { createSignal } from "../../utils";
import Select from "../UI/TextInput/Select";
interface AddressInterface {
  type: "current" | "permanent";
  reference?: string;
  cosignerNo?: any;
  handleChange: any;
  isAdmin?: boolean;
  errors: any;
  values: any;
  touched: any;
  setFieldTouched: any;
  handleSelectionChange?: any;
  ForceRender?: any;
  setFieldValue?: any;
  tempStateArr?: any;
}

const b = "borrower";

export const Address = ({
  type,
  reference,
  handleChange,
  isAdmin,
  values,
  setFieldTouched,
  cosignerNo,
  setFieldValue,
  tempStateArr
}: AddressInterface) => {
  const name =
    reference === b
      ? `${reference}.address.${type}`
      : `${reference}.[${cosignerNo}].address.${type}`;
  const refValue =
    reference === b
      ? values?.[`${reference}`]?.[`address`]
      : values[`${reference}`]?.[cosignerNo]?.[`address`];
  const addressType = type === "current" ? "Current" : "Permanent";

  // When check is enable
  let isDisabled = false
  if (reference === "cosigner") {
    isDisabled = addressType == "Permanent" && (values?.[`${reference}`]?.[`${cosignerNo}`]?.address?.currentIsPermanent == 1) ? true : false;
  } else {
    isDisabled = addressType == "Permanent" && (values?.[`${reference}`]?.address?.currentIsPermanent == 1) ? true : false;
  }
  let addrType = type;
  if (addressType === "Permanent") {
    if (reference === "cosigner") {
      addrType = values?.cosigner?.[cosignerNo]?.address?.currentIsPermanent == 1 ? "current" : "permanent";
    } else {
      addrType = values?.borrower?.address?.currentIsPermanent == 1 ? "current" : "permanent";
    }
  }

  let checkname;
  let checkValue;
  if (reference === "cosigner") {
    checkname = `${reference}.[${cosignerNo}].address.currentIsPermanent`;
    checkValue = values?.[`${reference}`]?.[`${cosignerNo}`]?.address?.currentIsPermanent == 1 ? true : false;
  } else {
    checkname = `${reference}.address.currentIsPermanent`;
    checkValue = values?.[`${reference}`]?.address?.currentIsPermanent == 1 ? true : false;
  }

  const { state }= useApplyFormState();

  const [city, setCity] = useState<any>([])

  useEffect(() => {
    setCity([...city, ...tempStateArr])
  }, [tempStateArr])

  const toggleCurrentIsPermanent = (e: any) => {
    const { name, checked } = e.target;
    checked == true ? setFieldValue(name, "1") : setFieldValue(name, "0");
    if (!checked) resetInputFields(name)
  }

  const resetInputFields = (name: string) => {
    let keyBeforeName = name.replace('currentIsPermanent', '')
    const permanent: any = {
      permanentAddress: getByName(`${keyBeforeName}permanentAddress`),
      permanentAddressLineTwo: getByName(`${keyBeforeName}permanentAddressLineTwo`),
      permanentLandmark: getByName(`${keyBeforeName}permanentLandmark`),
      permanentCountryId: getByName(`${keyBeforeName}permanentCountryId`),
      permanentStateId: getByName(`${keyBeforeName}permanentStateId`),
      permanentCityId: getByName(`${keyBeforeName}permanentCityId`),
      permanentPincode: getByName(`${keyBeforeName}permanentPincode`),
      permanentResidenceTypeId: getByName(`${keyBeforeName}permanentResidenceTypeId`)
    }
    Object.keys(permanent).forEach((keys) => {
      permanent[keys].value = null
      setFieldValue(`${keyBeforeName}${keys}`, undefined)
    })
  }

  const getByName = (name: string) => document.getElementsByName(name)[0]

  let accordianProps = type == "current" ? { activeKey: "0" } : {}

  const handleSelectionChange = async (e: any) => {
    const { signal } = createSignal()
    const { data } = await getCity(e.target.value, signal);
    setCity(data);
  };

  return (
    <>
      <Accordion className="mt-4" {...accordianProps}>
          <AccordionSummary>{type.toUpperCase()} {`Address`.toUpperCase()}</AccordionSummary>
          <AccordionDetails>
            <TextInput 
              fullWidth
              label={`${addressType} Address`}
              name={`${name}Address`}
              value={refValue?.[`${addrType}Address`]}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <TextInput 
              fullWidth
              label={`${addressType} Address Line 2`}
              name={`${name}AddressLineTwo`}
              value={refValue?.[`${addrType}AddressLineTwo`]}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <TextInput 
              fullWidth
              label={`${addressType} Landmark`}
              name={`${name}Landmark`}
              value={refValue?.[`${addrType}Landmark`]}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <Select
              label={`${addressType} Country`}
              name={`${name}CountryId`}
              value={refValue?.[`${addrType}CountryId`]}
              options={state?.country}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <Select
              label={`${addressType} State`}
              name={`${name}StateId`}
              value={refValue?.[`${addrType}StateId`]}
              options={state?.states}
              onChange={(e: any) => {
                handleChange(e);
                handleSelectionChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <Select
              label={`${addressType} City`}
              name={`${name}CityId`}
              value={refValue?.[`${addrType}CityId`]}
              options={city}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
             <TextInput
              fullWidth
              label={`${addressType} Pincode`}
              name={`${name}Pincode`}
              value={refValue?.[`${addrType}Pincode`]}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
            <Select
              label={`${addressType} Residence`}
              name={`${name}ResidenceTypeId`}
              value={refValue?.[`${addrType}ResidenceTypeId`]}
              options={RESIDENCE}
              onChange={(e: any) => {
                handleChange(e);
                setFieldTouched(e.target.name);
              }}
              disabled={!isAdmin || isDisabled}
            />
          </AccordionDetails>
      </Accordion>
      {type === "current" && <div className="d-flex justify-content-center mt-3">
        <LabelledSwitch
          disabled={!isAdmin} 
          checked={checkValue}
          name={checkname}
          label="Is Current Address Permanent"
          value={checkValue}
          onChange={toggleCurrentIsPermanent} 
        />
      </div>}
    </>
  );
};
