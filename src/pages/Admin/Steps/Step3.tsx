import { Button, CircularProgress, Container } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { toast } from 'react-toastify';
import { Document } from '../../../components';
// const docs = require("../../../JSON/documents.json");

export const Step3 = ({ values, handleFile, isAdmin, docloading, handleAllFileDownload, step3Submit, currentStep }: any) => {
  const [loading, setLoading] = useState(false)
  const downloadFile = async () => {
    if (values?.leadId) {
      setLoading(true)
      const response = await handleAllFileDownload(values?.leadId)
      if (response) {
        setTimeout(() => {
          setLoading(!response)
        }, 500)
      }
    }
  }

  const handleSubmit = async () => { 
    for (let file of values.borrower.fileObject) {
      if (file.requiredIndividualType == 1 && !file.documentPath) {
        toast.warning(`Borrower ${file?.documentName} is required`, { toastId: 'borrowerFileReqdCheck' });
        return false;
      }
    }
      if (values?.cosigner && values.cosigner.length > 0) {
        for (let i = 0; i < values.cosigner.length; i++) {
          for (let j = 0; j < values.cosigner[i].fileObject.length; j++) {
            let file = values.cosigner[i]?.fileObject[j];
            if (file?.requiredIndividualType == 1 && !file.documentPath) {
              toast.warning(`Cosigner ${i + 1} ${file?.documentName} is required`, { toastId: 'cosignerFileReqdCheck' })
              return false
            }
          }
        }
      }
   await step3Submit({ submit: true })
  }

  let loanType: any = values?.loanType ? Number(values?.loanType) : 1;
  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      onSubmit={async (values) => {}}
    >
      {({
        // values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        // handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md" className="mw-50 py-3">
            {isAdmin && <div className='d-flex justify-content-end'>
              <Button sx={{ mb: 4 }} disabled={loading} variant='contained' onClick={downloadFile} endIcon={loading ? <CircularProgress size={20} /> : <DownloadForOfflineIcon />}>Download docs</Button>
            </div>}
            {/* {docs &&
        Object.keys(docs?.[loanType]).map((individual: any, index) => ( */}
            <Document
              heading={"borrower"}
              individualName={values?.borrower?.name}
              values={values?.borrower?.fileObject}
              isAdmin={isAdmin}
              handleFile={handleFile}
              reference="Borrower"
              loanType={values?.loanType}
              referenceId={values?.borrower?.id}
              docloading={docloading?.[`Borrower-${values?.borrower?.individualId}`]}
              leadId={values?.leadId}
              step={currentStep}
            />
            {/* ))} */}
            {[1, 2].includes(loanType) && values?.cosigner?.length > 0 && (
              values.cosigner.map((cosigner: any, index: number) => {
                return (
                  <Document
                    key={cosigner?.individualId}
                    cosignerNum={index}
                    heading={cosigner?.relationship ? cosigner?.relationship : "cosigner"}
                    individualName={cosigner?.name}
                    isAdmin={isAdmin}
                    values={cosigner?.fileObject}
                    handleFile={handleFile}
                    reference="Cosigner"
                    loanType={values?.loanType}
                    referenceId={cosigner?.id}
                    docloading={docloading?.[`Cosigner-${cosigner?.individualId}`]}
                    leadId={values?.leadId}
                    step={currentStep}
                  />
                )
              })
            )
            }
          </Container>
          {/* {values?.createdBy == 2 && isAdmin && */}
            <div className='d-flex justify-content-center mt-6'>
              <Button color="primary" type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            {/* // } */}
        </form>)}
    </Formik>
  );
}
