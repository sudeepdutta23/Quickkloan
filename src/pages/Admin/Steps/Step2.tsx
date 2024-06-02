import { Button, Container } from '@mui/material';
import { FieldArray, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopUp, TextInput } from '../../../components';
import { Cosigner } from '../../../components/Cosigner/AdminCosigner';
import { useApplyFormState } from '../../../hooks';
import { saveForm } from '../../../services/Individual';
import { Step2Schema, ValidateStepSchema } from '../../../utils/ValidationSchema';
import { createSignal } from '../../../utils';
import Select from '../../../components/UI/TextInput/Select';

export const Step2 = ({
  initValues,
  isAdmin,
  removeCosigner,
  handleSelectionChange,
  activeTab,
  tempStateArr,
  fetchLeadRecords,
  verifyCosignerOTP
}: any) => {
  const { state } = useApplyFormState();
  const [step2values, setStepValues] = useState<any>({});

  const [showConfirm, setConfirm] = useState(false);
  const [tempCosDelData, setTempCosDel] = useState<any>({});

  const toggleConfirm = () => setConfirm(!showConfirm)

  useEffect(() => {
    setStepValues(initValues)
  }, [initValues])

  const handleRemoveCosigner = async (
    index: number,
    individualId: any,
    arrayHelpers: any
  ) => {
    if (individualId) {
      const deletedCosigner = await removeCosigner(individualId, initValues.leadId, index);
      if (deletedCosigner) {
        toggleConfirm();
      }
    } else {
      arrayHelpers.remove(index);
      toggleConfirm();
    }
  };

  const stepSubmit = async (values: any) => {
    const { signal } = createSignal();
    const { data, error } = await saveForm(values, signal);
    if (!error) {
      toast.success("Step 2 saved successfully");
      fetchLeadRecords()
    } else {
      toast.error(data.message);
    }
  };

  const submitForm = async (values: any, step: any) => {
    await ValidateStepSchema(Step2Schema(Number(values.loanType)), values, async (values) => await stepSubmit(values), 2);
  }

  const confirmCosignerDelete = (index: any, id: any, arayHelpers: any, cosignerName: string, values: any) => {
    if(!id){
      arayHelpers.remove(index);
      return;
    }
    setTempCosDel({ index, id, arayHelpers, cosignerName, values });
    setConfirm(true);
  }
  return (
    <Formik
      initialValues={step2values}
      enableReinitialize={true}
      onSubmit={async (values) => await submitForm(values, activeTab)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md" className="mw-50 py-3">
            {(values?.loanType === 1 || values?.loanType === 2) && (
              <FieldArray
                name="cosigner"
                render={(arrayHelpers: any) => (
                  <div>
                    {isAdmin && <Button
                      className='mb-4'
                      variant='contained'
                      onClick={() => {
                        if (values.cosigner.length < 4) {
                          arrayHelpers.push({})
                          setTimeout(() => {
                            let elem = document.getElementById(`cosigner-${values.cosigner.length}`);
                            elem?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }, 300)
                        } else {
                          toast.warning("Only 4 cosigners are allowed")
                        }
                      }}
                    >
                      Add-Cosigner +
                    </Button>}
                    {values?.cosigner &&
                      values.cosigner.length > 0 &&
                      values.cosigner.map((cosigner: any, index: number) => (
                        <Cosigner
                          key={index}
                          id={`cosigner-${index}`}
                          number={index}
                          cosigner={cosigner}
                          isAdmin={isAdmin}
                          removeCosigner={() =>
                            confirmCosignerDelete(
                              index,
                              cosigner?.id,
                              arrayHelpers,
                              `${cosigner?.firstName} ${cosigner?.lastName}`,
                              values
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
                          tempStateArr={tempStateArr}
                          verifyCosignerOTP={verifyCosignerOTP}
                        />
                      ))}
                  </div>
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
                disabled={!isAdmin}
              />
            )}
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
                  disabled={!isAdmin}
                />
                <TextInput
                  fullWidth
                  label="Salary"
                  name="borrower.salary"
                  value={values?.borrower?.salary}
                  onChange={handleChange}
                  disabled={!isAdmin}
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
              onOk={() => handleRemoveCosigner(tempCosDelData?.index, tempCosDelData?.id, tempCosDelData?.arrayHelpers)}
            />
          </Container>
          {isAdmin && <div className='d-flex justify-content-center'>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </div>}
        </form>)}

    </Formik>
  )
}
