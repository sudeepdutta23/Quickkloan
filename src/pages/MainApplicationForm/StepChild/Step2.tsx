import { FieldArray, useFormikContext } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import InfoIcon from '@mui/icons-material/Info';

import { Cosigner, PopUp, Button, Tooltip, TextInput } from "../../../components";
import { useApplyFormState } from "../../../hooks";
import { STYLES } from "../../../config";
import Select from "../../../components/UI/TextInput/Select";

const Step2 = ({
  initValues,
  removeCosigner,
  handleSelectionChange,
  verifyCosignerOTP,
}: any) => {

  const { handleChange, errors, values, touched, setFieldTouched, setFieldValue }: any = useFormikContext();

  const { state } = useApplyFormState();

  const [render, setRender] = useState(false);
  const [tooltipOpen, setTooltip] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [tempCosDelData, setTempCosDel] = useState<any>({});

  const toggleConfirm = () => setConfirm(!showConfirm);

  const handleRemoveCosigner = async (
    index: number,
    individualId: any,
    arrayHelpers: any
  ) => {
    if (individualId) {
      const deletedCosigner = await removeCosigner(individualId, values.leadId);
      if (deletedCosigner) {
        values.cosigner.splice(index, 1);
        setRender(!render);
      }
      toggleConfirm();
    } else {
      arrayHelpers.remove(index);
      toggleConfirm();
    }
  };

  const confirmCosignerDelete = (
    index: any,
    id: any,
    arrayHelpers: any,
    cosignerName: string
  ) => {
    if (!id) {
      arrayHelpers.remove(index);
      return
    }
    setTempCosDel({ index, id, arrayHelpers, cosignerName });
    setConfirm(true);
  };

  return (
    <Container maxWidth="sm" className="mw-50 py-3">
      {(values?.loanType === 1 || values?.loanType === 2) && (
        <div className="tipForCosigner text-secondary">
          <div>
            <InfoIcon />{" "}
            <u>
              <span style={{ fontWeight: "bold" }}>Tip for Cosigner</span>{" "}
            </u>
          </div>
          <div>
            Once you save the details <br /> of cosigner some fields may <br />
            freeze so kindly fill it properly
          </div>
        </div>
      )}
      {(values?.loanType === 1 || values?.loanType === 2) && (
        <FieldArray
          name="cosigner"
          render={(arrayHelpers: any) => (
            <>
              <div className="d-flex align-items-center">
                <Button
                  style={STYLES.button}
                  sx={{ mb: 4 }}
                  onClick={() => {
                    if (values.cosigner.length < 4) {
                      arrayHelpers.push({});
                      setTimeout(() => {
                        let elem = document.getElementById(
                          `cosigner-${values.cosigner.length}`
                        );
                        elem?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }, 300);
                    } else {
                      toast.warning("Only 4 cosigners are allowed");
                    }
                  }}
                >
                  Add-Cosigner +
                </Button>
                {(values?.loanType === 1 || values?.loanType === 2) && (
                  <div className="tipForCosignerMobile">
                    <Tooltip
                      open={tooltipOpen}
                      handleTooltipOpen={() => setTooltip(true)}
                      handleTooltipClose={() => setTooltip(false)}
                      title={
                        <span>
                          Once you save the details <br /> of cosigner some fields
                          may <br />
                          freeze so kindly fill it properly
                        </span>
                      }
                    >
                      <InfoIcon />
                    </Tooltip>
                  </div>
                )}
              </div>
              {values?.cosigner &&
                values.cosigner.length > 0 &&
                values.cosigner.map((cosigner: any, index: number) => (
                  <Cosigner
                    key={index}
                    id={`cosigner-${index}`}
                    number={index}
                    initialValues={initValues?.cosigner}
                    cosigner={cosigner}
                    removeCosigner={() =>
                      confirmCosignerDelete(
                        index,
                        cosigner?.id,
                        arrayHelpers,
                        `${cosigner?.firstName} ${cosigner?.lastName}`
                      )
                    }
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    setFieldTouched={setFieldTouched}
                    handleSelectionChange={handleSelectionChange}
                    totalCosigner={values.cosigner.length}
                    setFieldValue={setFieldValue}
                    verifyCosignerOTP={verifyCosignerOTP}
                  />
                ))}
            </>
          )}
        />
      )}
      {values?.loanType === 1 && (
        <Select
          label="Course Country"
          name="borrower.courseCountryId"
          value={values?.borrower?.courseCountryId}
          options={state?.courseCountry}
          onChange={handleChange}
        />)}
      {values?.loanType === 2 && (
        <Select
          label="Course"
          name="borrower.courseId"
          value={values?.borrower?.courseId}
          options={state?.courses}
          onChange={handleChange}
        />
      )}
      {(values?.loanType === 3 || values?.loanType === 4) && (
        <>
          <Select
            label="Work Status"
            name="borrower.employmentTypeId"
            value={values?.borrower?.employmentTypeId}
            options={state?.employment}
            onChange={handleChange}
          />
          <TextInput
            fullWidth
            label="Salary"
            name="borrower.salary"
            value={values?.borrower?.salary}
            onChange={handleChange}
          />
        </>
      )}
      <PopUp
        open={showConfirm}
        toggleModal={toggleConfirm}
        modalType="warning"
        title="Delete Cosigner"
        content={`Are you sure you want to remove this cosigner ${tempCosDelData?.cosignerName}`}
        okText="Yes"
        onOk={() =>
          handleRemoveCosigner(
            tempCosDelData?.index,
            tempCosDelData?.id,
            tempCosDelData?.arrayHelpers
          )
        }
      />
    </Container>
  );
};

export default Step2;
