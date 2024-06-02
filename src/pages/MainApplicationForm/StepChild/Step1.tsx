import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";

import { Address, TextInput } from "../../../components";
import { useApplyFormState } from "../../../hooks";
import { CityProvider } from "../../../store";
import { getClass, getError } from "../../../utils";
import Select from "../../../components/UI/TextInput/Select";
import { useFormikContext } from "formik";

const Step1 = ({
  initValues,
  handleSelectionChange,
}: any) => {

  const { values, touched, handleChange, setFieldTouched, errors, setFieldValue }: any = useFormikContext();
  const { state } = useApplyFormState();

  return (
    <Container maxWidth="sm" className="mw-50 py-3">
      <TextInput
        fullWidth
        name="borrower.loanAmount"
        label="Loan Amount"
        value={values?.borrower?.loanAmount}
        onChange={(e: any) => {
          handleChange(e);
          setFieldTouched(e.target.name);
        }}
        className={getClass(
          touched?.borrower?.loanAmount,
          errors?.borrower?.loanAmount
        )}
        helperText={getError(
          touched?.borrower?.loanAmount,
          errors?.borrower?.loanAmount
        )}
      />
      <Select
        label="Loan Type"
        name="loanType"
        value={values?.loanType}
        disabled={initValues?.loanType}
        options={state?.loanTypes}
        className={getClass(touched?.loanType, errors?.loanType)}
        onChange={(e: any) => {
          handleChange(e);
          setFieldTouched(e.target.name);
        }}
        helperText={getError(touched?.loanType, errors?.loanType)}
      />
      <CityProvider>
        <>
          <Address
            defaultOpen={true}
            type="current"
            reference="borrower"
            handleSelectionChange={handleSelectionChange}
          />
          <Address
            type="permanent"
            reference="borrower"
            handleSelectionChange={handleSelectionChange}
          />
        </>
      </CityProvider>
    </Container>
  );
};

export default Step1;
