import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Formik } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import * as Yup from "yup";
import {PopUp} from "../../../components";
import { Image } from "../../../components";
import { createSignal } from "../../../utils";
import { getLoanType } from "../../../services";
import { STYLES } from "../../../config";
import { addUpdateBanner, deleteBanner, getBanner } from "../../../services/Master";

const HomeBanner = () => {
  const [bannerData, setBannerData] = useState<any>([]);
  const [loanType, setLoanType] = useState<any>([]);
  const [image] = useState("");
  const [editingImage, setEditingImage] = useState("");
  const initialValue = {
    loanType: "",
    text: "",
    image: "",
    id: "",
  };
  const [initialValues, setInit] = useState<any>(initialValue);
  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const tableHeader = ['Banner Image','Loan Type','Banner Text','Actions']

  const bannerSchema = Yup.object().shape({
    loanType: Yup.string().required("Loan type is required"),
  });

  const handleFile = (e: any, setFieldValue: any) => {
    const { files } = e.target;
    const file = files[0];
    let icon: any = document.getElementById("bannerIcon");
    // checking webp
    if (file) {
      if (file.type === "image/webp") {
          setFieldValue("image", file);
      } else {
        toast.warning("Please upload image with webp extesion");
        icon.value = "";
      }
    }
  };

  const getCarouselData = async () => {
    const { signal } = createSignal();
    const { error, data } = await getBanner(signal);
    if (!error) setBannerData(data);
  };

  const fetchLoanType = async () => {
    const { signal } = createSignal();
    const { error, data } = await getLoanType(signal);
    if (!error) setLoanType(data);
  };

  const handleBannerEdit = async (banner: any) => {
    let blogObj = {
      id: banner?.id,
      loanType: banner?.loanTypeID,
      text: banner?.text,
    };
    setInit(blogObj);
    setEditingImage(banner.image);
  };

  const handleBannerDelete = async (id: any) => {
    const { signal } = createSignal();
    const { data, error } = await deleteBanner(id, signal);
    if (!error) {
      toast.success(data.message);
      getCarouselData();
    } else {
      toast.error(data.message);
    }
    setModalData({ ...modalData, open: false })

  };

  const addEditBanner = async (values: any) => {
    const { signal } = createSignal();
    if (!values?.id) delete values.id;
    if (!values?.image?.name) {
      toast.warning("Banner image is required");
      return;
    }

    const formdata = new FormData();
    Object.keys(values).forEach(
      (key) => values[key] && formdata.append(key, values[key])
    );
    const { data, error } = await addUpdateBanner(formdata,signal);
    if (!error) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  };

  useEffect(() => {
    getCarouselData();
    fetchLoanType();
  }, []);

  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", mx: 2, p: 2 }}>
        <Typography component="div" sx={{ fontSize: 30, fontWeight: 600 }}>
          Home Banner
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          mx: 2,
          p: 2,
          mt: 2,
        }}
      >
        <Typography component="div" sx={{ fontSize: 25, fontWeight: 600 }}>
          Add/Update Home Banner
        </Typography>
        <Container maxWidth="xs">
          <Formik
            initialValues={initialValues}
            validationSchema={bannerSchema}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const added: any = await addEditBanner(values);
              if (added) {
                setInit(initialValue);
                resetForm();
                getCarouselData();
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ ml: 2 }}
                      >
                        Select Loan Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        name="loanType"
                        value={values?.loanType}
                        onChange={handleChange}
                        label="Loan Type"
                        variant="filled"
                        size="small"
                        sx={{ pb: 1 }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {loanType.length > 0 &&
                          loanType.map((loan: any) => (
                            <MenuItem key={loan.value} value={loan.value}>
                              {loan?.name}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText
                        className={
                          touched?.loanType && errors?.loanType
                            ? "text-danger"
                            : ""
                        }
                      >
                        {touched?.loanType && <>{errors?.loanType}</>}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      name="text"
                      value={values?.text}
                      onChange={handleChange}
                      fullWidth
                      id="filled-basic"
                      label="Banner Text"
                      variant="filled"
                      error={touched.text && Boolean(errors.text)}
                      helperText={touched.text && <>{errors.text}</>}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography sx={{ display: "flex" }}>
                      <IconButton component="label">
                        <CloudUploadIcon sx={{ fontSize: 30 }} />
                        <input
                          type="file"
                          id="bannerIcon"
                          hidden
                          onChange={(e) => handleFile(e, setFieldValue)}
                          name="image"
                        />
                      </IconButton>
                      <Typography sx={{ mt: 1.5 }} component="span">
                        {values.id
                          ? "Replace existing file"
                          : "Select file to upload"}
                      </Typography>
                    </Typography>
                    <ul
                      style={{ marginTop: 10, listStyle: "none" }}
                      id="imagesSection"
                    >
                      {values.id && (
                        <li>
                            <Image src={editingImage} style={{ width: "20%", marginBottom: 20 }} />{" "}
                        </li>
                      )}
                      {values?.image?.name && (
                        <li
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                         {/* <Image src={image} style={{ width: "20%", marginBottom: 20 }} />{" "} */}
                          {values?.image?.name}{" "}
                          <ClearIcon
                            onClick={() => setFieldValue("image", undefined)}
                            sx={{ color: "black", cursor: "pointer" }}
                          />{" "}
                        </li>
                      )}
                    </ul>
                  </Grid>
                  <Typography
                    component="div"
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    <Button
                      sx={{
                        ...STYLES.button,
                        mt: 1,
                        ":hover": { ...STYLES.button },
                      }}
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Submit
                    </Button>{" "}
                    &nbsp;&nbsp;
                    <Button
                      sx={{ ...STYLES.outlinedBtn, mt: 1 }}
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        setInit(initialValue);
                        resetForm();
                      }}
                    >
                      Reset
                    </Button>
                  </Typography>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          mx: 2,
          p: 2,
          mt: 2,
        }}
      >
          <TableContainer>
        <Table sx={{ minWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeader.map(header => <TableCell key={header} className="text-center">{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {bannerData?.length > 0 &&
              bannerData?.map(((banner: any) => {
                return <TableRow
                  key={banner.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="text-center" sx={{ width: `${100/4}%` }} >
                    <Image src={banner.image} style={{ width: "50%" }} />  
                  </TableCell>
                  <TableCell sx={{ width: `${100/4}%` }} className="text-center">{banner?.loanType}</TableCell>
                  <TableCell className="text-center" sx={{ width: `${100/4}%` }}>{banner?.text || 'N/A'}</TableCell>
                  <TableCell className="text-center"sx={{ width: `${100/4}%`}}>
                  <Button
                      variant="outlined"
                      size="small"
                      startIcon={<BorderColorIcon />}
                      onClick={() => handleBannerEdit(banner)}
                    >
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() =>
                        setModalData({ open: true, data: banner.id })
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              }))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <PopUp
        open={modalData.open}
        toggleModal={() => setModalData({ ...modalData, open: false })}
        modalType="warning"
        title="Delete"
        content={`Are you sure you want to delete?`}
        okText="Yes"
        onOk={() => handleBannerDelete(modalData.data)}
      />
    </div>
  );
};

export default HomeBanner;
