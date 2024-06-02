import { useFormikContext } from "formik";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CapitalizeAll, encryptData } from "../../utils";
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary, File } from "../UI";

export const Document = ({
  heading = "Title",
  individualName,
  values,
  isAdmin,
  handleFile,
  reference,
  referenceId,
  loanType,
  docloading,
  cosignerNum,
  leadId,
}: any) => {

  const { values: { cosigner } }: any = useFormikContext();

  const location = useLocation();
  const setImage = (image: any) => {
    window.open(image)
  };

  const copyDocUploadPath = async (field: any) => {
    const path = window.location.origin
    const fullParam = encryptData(`${leadId}/${referenceId}/${reference}/${field?.documentTypeId}/${field?.documentType}/${loanType}`);

    await navigator.clipboard.writeText(`${path}/#/uploadDocuments/${fullParam}`)
    toast.dark("Text Copied")
  }


  return (
    <div>
      <Accordion sx={{ my: 2 }} defaultExpanded={reference === "Borrower"} slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{CapitalizeAll(heading)}&nbsp; {cosignerNum != undefined && !cosigner?.[cosignerNum]?.relationship && <span> {cosignerNum + 1}</span>} {individualName && <span className="font-weight-bold">- ({individualName})</span>}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {values &&
              values.map((field: any, index: any) => {
                return (
                  <div
                    className="d-flex justify-content-between py-2"
                    key={index}
                  >
                    {field?.documentName}
                    <div className="d-flex align-items-baseline">
                      {(!field?.documentPath && location.pathname.includes('/admin')) && <ContentCopyIcon className="mx-2 mt-1 pointer" onClick={() => copyDocUploadPath(field)} />}
                      {field?.documentPath && <RemoveRedEyeIcon className="mx-2 mt-1 pointer" onClick={() => setImage(field?.documentPath)} />}
                      <File
                        name={`${field?.name}`}
                        id={`${reference}-${referenceId}-${field?.documentName}`}
                        img={field?.documentPath}
                        loading={docloading?.[`${field?.documentName}`] || false}
                        onChange={(e: any) => {
                          handleFile(
                            e,
                            reference,
                            referenceId,
                            `${field?.documentTypeId}`,
                            `${field?.documentName}`,
                            loanType
                          );
                          // setFieldTouched(e.currentTarget.name);
                        }}
                        showFileUpload={isAdmin == undefined ? true : isAdmin}
                      />
                    </div>
                  </div>
                );
              })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
