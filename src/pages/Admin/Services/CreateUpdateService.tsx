import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { initialValue } from ".";
import { STYLES } from "../../../config";
import { addUpdateServices } from "../../../services/LoanServices";
import { createSignal } from "../../../utils";
import { Image as ImageView } from "../../../components";

const ArrayFile = ({ name, label, editingImage, id }: any) => {
  const { values, setFieldValue, touched, errors }: any = useFormikContext();
  const [image, setImage] = useState("");

  const handleFile = (e: any, array: any) => {
    const { files } = e.target;
    const file = files[0];
    let icon: any = document.getElementById("icon");
    // checking webp
    if (file) {
      if (file.type === "image/webp") {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            if (img.width === 690 && img.height === 388) {
              setFieldValue(name.toString(), file);
              setImage(URL.createObjectURL(file));
              icon.value = "";
            } else {
              toast.warning("Please upload valid file diminsion");
              icon.value = "";
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        toast.warning("Please upload image with webp extesion");
        icon.value = "";
      }
    }
  };
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers: any) => (
        <div>
          <Typography sx={{ display: "flex" }}>
            <IconButton component="label">
              <CloudUploadIcon sx={{ fontSize: 30 }} />
              <input
                type="file"
                id="icon"
                hidden
                onChange={(e) => handleFile(e, arrayHelpers)}
                name={name}
              />
            </IconButton>
            <Typography sx={{ mt: 1.5 }} component="span">
              {id ? "Replace existing file" : "Select file to upload"}
            </Typography>
          </Typography>
          <FormHelperText
            className={touched?.[name] && errors?.[name] ? "text-danger" : ""}
          >
            {touched?.[name] && <>{errors?.[name]}</>}
          </FormHelperText>
          <ul style={{ marginTop: 10, listStyle: "none" }} id="imagesSection">
            {id && (
              <li>
                <ImageView
                  style={{ marginBottom: 20, width: '20%' }}
                  src={editingImage}
                />
              </li>
            )}
            {values?.[name]?.name && (
              <li>
                <ImageView
                  style={{ marginBottom: 20, width: '20%' }}
                  src={image}
                />
                {values?.[name].name}{" "}
                <ClearIcon
                  onClick={() => setFieldValue(name, undefined)}
                  sx={{ color: "black", cursor: "pointer" }}
                />{" "}
              </li>
            )}
          </ul>
        </div>
      )}
    />
  );
};

const CreateUpdateService = ({
  editedBlog,
  getAllServices,
  editingImage,
  toggleShow,
  loanTypes,
  setEdit,
}: any) => {
  const addEditService = async (values: any) => {
    if (!values?.id) delete values.id;
    if (!values?.id && !values?.icon?.name) {
      toast.warning("Icon is required");
      return;
    }

    const formdata = new FormData();
    Object.keys(values).forEach(
      (key) => values[key] && formdata.append(key, values[key])
    );
    const { signal } = createSignal();
    const { data, error } = await addUpdateServices(formdata, signal);
    if (!error) {
      toast.success(data.message);
      toggleShow();
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  };

  const loanServiceSchema = Yup.object().shape({
    loanType: Yup.string().required("loantype is required"),
    percentStart: Yup.number().required("percentstart is required"),
    percentEnd: Yup.number().required("percentEnd is required"),
    desc: Yup.string()
      .required("description is required")
      .min(5, "please enter atleast five letters"),
  });

  return (
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
      <Typography variant="h5" sx={{ fontWeight: 600, my: 2 }}>
        Add Update Services
      </Typography>
      <Typography>
        <Formik
          initialValues={editedBlog}
          validationSchema={loanServiceSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const added: any = await addEditService(values);
            if (added) {
              resetForm();
              getAllServices(false);
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
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
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
                      label="loanType"
                      variant="filled"
                      size="small"
                      sx={{ pb: 1 }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {loanTypes.length > 0 &&
                        loanTypes.map((loan: any) => (
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
                  <Grid container spacing={4}>
                    <Grid item md={6}>
                      <TextField
                        name="percentStart"
                        value={values?.percentStart}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        id="filled-basic"
                        label="% Start"
                        variant="filled"
                        error={
                          touched.percentStart && Boolean(errors.percentStart)
                        }
                        helperText={
                          touched.percentStart && <>{errors.percentStart}</>
                        }
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        name="percentEnd"
                        value={values?.percentEnd}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        id="filled-basic"
                        label="% End"
                        variant="filled"
                        error={touched.percentEnd && Boolean(errors.percentEnd)}
                        helperText={
                          touched.percentEnd && <>{errors.percentEnd}</>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    multiline
                    minRows={4}
                    name="desc"
                    value={values?.desc}
                    onChange={handleChange}
                    fullWidth
                    id="filled-basic"
                    label="Description"
                    variant="filled"
                    error={touched.desc && Boolean(errors.desc)}
                    helperText={touched.desc && <>{errors.desc}</>}
                  />
                </Grid>
                <Grid item md={12}>
                  <ArrayFile
                    name="icon"
                    label="Icon"
                    editingImage={editingImage}
                    id={values.id}
                  />
                </Grid>
              </Grid>
              <Typography>
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
                    setEdit(initialValue);
                    resetForm();
                  }}
                >
                  Reset
                </Button>
              </Typography>
            </form>
          )}
        </Formik>
      </Typography>
    </Box>
  );
};

export default CreateUpdateService;
