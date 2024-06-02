import { useFormikContext } from "formik";
import { Document } from "../../../components";
import { Container } from "@mui/material";


const Step3 = ({ handleFile, docloading }: any) => {
  const { values }: any = useFormikContext();
  return (
    <Container maxWidth="md" className="mw-50 py-3">
      <Document
        heading={"borrower"}
        individualName={values?.borrower?.name}
        values={values?.borrower?.fileObject}
        handleFile={handleFile}
        reference="Borrower"
        loanType={values?.loanType}
        referenceId={values?.borrower?.id}
        docloading={docloading?.[`Borrower-${values?.borrower?.id}`]}
      />
      {values?.cosigner &&
        values?.cosigner?.length > 0 &&
        values.cosigner.map((cosigner: any, index: number) => {
          return (
            <Document
              key={cosigner?.individualId}
              cosignerNum={index}
              heading={
                cosigner?.relationship ? cosigner?.relationship : `cosigner`
              }
              individualName={cosigner?.name}
              values={cosigner?.fileObject}
              handleFile={handleFile}
              reference="Cosigner"
              loanType={values?.loanType}
              referenceId={cosigner?.id}
              docloading={docloading?.[`Cosigner-${cosigner?.id}`]}
            />
          );
        })}
    </Container>
  );
};

export default Step3;
