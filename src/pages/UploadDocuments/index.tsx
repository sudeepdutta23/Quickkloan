import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { useEffect, useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Header, PopUp } from "../../components";
import { saveForm, getLoanType } from "../../services";
import { createSignal, decryptData } from "../../utils";

 
const UploadDocuments = () => {
  const [file, setFile] = useState<any>(null);
  const [loanTypes, setLoanTypes] = useState<any>([]);
  const [showConfirm, setConfirm] = useState(false);

  const toggleConfirm = () => setConfirm(!showConfirm);

  const params = useParams();
  const navigate = useNavigate();
  const data = decryptData(params?.fullParam).split("/");

  const leadId = data?.[0];
  const individualId = data?.[1];
  const individualType = data?.[2];
  const documentTypeId = data?.[3];
  const documentType = data?.[4];
  const loanType = data?.[5];

  useEffect(() => {
    if(!localStorage.getItem('quikk-token')) navigate('/', { state: params.fullParam })
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getLoanType(signal);
      if (data?.abort) return;
      if (!error) setLoanTypes(data);
    })();

    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleFileUpload = (e: any) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const handleReset = () => {
    setFile(null);
    let input: any = document.getElementById("input_file");
    input.value = "";
  };

  const handleFile = async () => {
    if (!file) {
      toast.warning("Please select a file");
      return;
    }
    if (
      !individualType ||
      !individualId ||
      !documentTypeId ||
      !leadId ||
      !loanType
    ) {
      toast.warning("Something went wrong!!! Please try again later");
      return;
    }
    const formData = new FormData();
    formData.append("individualType", individualType);
    formData.append("individualId", individualId);
    formData.append("documentId", documentTypeId);
    formData.append("file", file);
    formData.append("leadId", leadId);
    formData.append("step", "3");
    formData.append("loanType", loanType);

    const { signal } = createSignal();
    const { error, data } = await saveForm(formData, signal, true);
    if (data?.abort) return;
    if (!error) {
      toast.success("File uploaded successfully");
      toggleConfirm();
      handleReset();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <section>
      <Header isUploadSection />
      <Container>
        <Typography
          variant="h4"
          className="text-center fw-bold"
          sx={{ pt: 13 }}
        >
          Single Document Upload
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className="px-5"
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          At QuickLoans, users enjoy a seamless experience as they effortlessly
          upload their documents. The platform's user-friendly interface
          streamlines the process, making document submission a breeze. With
          efficiency and convenience at the forefront, QuickLoans ensures a
          hassle-free way for users to provide necessary documentation for their
          loan applications.
        </Typography>
        <Grid container sx={{ py: 5 }}>
          <Grid
            item
            md={8}
            lg={8}
            sm={12}
            xs={12}
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Card className="border">
              <Grid item md={12} xs={12} lg={12} sm={12} className="border">
                <Typography
                  variant="h5"
                  className="text-center fw-bold"
                  sx={{ py: 2 }}
                >
                  Details
                </Typography>
              </Grid>
              <TableContainer component={"div"}>
                <Table aria-label="Document Info">
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        width={200}
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        Lead Id
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        {leadId || "NA"}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        Individual Type
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        {individualType || "NA"}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        Loan Type
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        {loanTypes.length > 0
                          ? loanTypes.find(
                              (loan: any) => loan.value === loanType
                            )?.name
                          : "NA"}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        Document Type
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "bolder", fontSize: 17 }}
                      >
                        {documentType || "NA"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid
            item
            md={4}
            lg={4}
            sm={12}
            xs={12}
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Card>
              <input
                type="file"
                name=""
                id="input_file"
                onChange={handleFileUpload}
                hidden
              />
              <div className="d-flex justify-content-center border py-4">
                <FileUploadIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => document.getElementById("input_file")?.click()}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Click above to upload file
                </Typography>
                {file?.name ? (
                  <Typography variant="h6" color="text.secondary">
                    File Name: {file?.name || "N/A"}
                  </Typography>
                ) : null}
              </CardContent>
              <CardActions style={{ justifyContent: "center" }} sx={{ py : 2 }}>
                <Button
                  variant="contained"
                  disabled={!file}
                  size="small"
                  onClick={toggleConfirm}
                >
                  Upload
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <PopUp
          open={showConfirm}
          toggleModal={toggleConfirm}
          modalType="warning"
          title={`${documentType}`}
          content={`Are you sure you want to upload this file? If previoulsy uploaded old document will be removed.`}
          okText="Yes"
          onOk={handleFile}
        />
      </Container>
    </section>
  );
};

export default UploadDocuments;
