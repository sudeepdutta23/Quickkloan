import { Button, Container } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Address } from '../../../components/Address/AdminAddress';
import { TextInput } from '../../../components';
import { useApplyFormState } from '../../../hooks';
import { saveForm } from '../../../services/Individual';
import { CityProvider } from '../../../store';
import { Step1Schema, ValidateStepSchema } from '../../../utils/ValidationSchema';
import { createSignal } from '../../../utils';
import Select from '../../../components/UI/TextInput/Select';

export const Step1 = ({
  initValues,
  tempStateArr,
  isAdmin,
  handleSelectionChange,
  activeTab, fetchLeadRecords }: any) => {
  const { state } = useApplyFormState();
  const [step1values, setStepValues] = useState<any>({})

  useEffect(() => {
    setStepValues(initValues)
  }, [initValues])

  const stepSubmit = async (values: any) => {
    const { signal } = createSignal();
    const { data, error } = await saveForm(values, signal);
    if (!error) {
      toast.success("Step 1 saved successfully");
      fetchLeadRecords();
    } else {
      toast.error(data.message);
    }
  };

  const submitForm = async (values: any, step: any) => {
    await ValidateStepSchema(Step1Schema, values, async (values) => await stepSubmit(values));
  }

  return (
    <>
      <Formik
        initialValues={step1values}
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
              <TextInput
                type='number'
                fullWidth
                name="borrower.loanAmount"
                label="Loan Amount"
                value={parseInt(values?.borrower?.loanAmount)}
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldTouched(e.target.name);
                }}
              />
              <Select
                label="Loan Type"
                name="loanType"
                value={values?.loanType}
                disabled={!isAdmin || initValues?.loanType}
                options={state?.loanTypes}
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldTouched(e.target.name);
                }}
              />
              <CityProvider>
                <>
                  <Address
                    type="current"
                    reference="borrower"
                    values={values}
                    isAdmin={isAdmin}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldTouched={setFieldTouched}
                    errors={errors}
                    handleSelectionChange={handleSelectionChange}
                    setFieldValue={setFieldValue}
                    tempStateArr={tempStateArr}
                  />
                  <Address
                    type="permanent"
                    reference="borrower"
                    values={values}
                    isAdmin={isAdmin}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldTouched={setFieldTouched}
                    errors={errors}
                    handleSelectionChange={handleSelectionChange}
                    setFieldValue={setFieldValue}
                    tempStateArr={tempStateArr}
                  />
                </>
              </CityProvider>
            </Container>
            {isAdmin && <div className='d-flex justify-content-center'>
              <Button color="primary" type="submit" variant="contained" sx={{ mt: 4 }}>
                Submit
              </Button>
            </div>}
          </form>)}
      </Formik>
    </>
  )
}
