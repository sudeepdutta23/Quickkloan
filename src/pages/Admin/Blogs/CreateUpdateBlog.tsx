import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { FieldArray, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STYLES } from "../../../config";

const ArrayField = ({ name, label }: any) => {
  const { values }: any = useFormikContext();
  const [arrayName, setValue] = useState("");

  const handleAddArray = (array: any) => {
    if (values?.[name].length === 5) {
      toast.warn(`${label} cannot be greater than 5`);
      return;
    }
    if (arrayName) {
      array.push(arrayName);
      setValue("");
    }
  };
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers: any) => (
        <div>
          <Typography sx={{ display: "flex" }}>
            <Button
              sx={{ ...STYLES.button, ":hover": { ...STYLES.button } }}
              variant="contained"
              onClick={() => handleAddArray(arrayHelpers)}
            >
              Add {label} +
            </Button>{" "}
            &nbsp;&nbsp;
            <TextField
              value={arrayName}
              onChange={(e) => setValue(e.currentTarget.value)}
              label={`Write ${label} here`}
              variant="filled"
              onKeyDown={(e: any) =>{
                e.key === "Enter" && handleAddArray(arrayHelpers)
                e.stopPropagation();
              }}
            />
          </Typography>
          <ul style={{ marginTop: 10, listStyle: "none" }}>
            {values?.[name] &&
              values?.[name]?.map((field: any, index: number) => (
                <li style={{ color: "blue", padding: 5 }}>
                  <ClearIcon
                    onClick={() => arrayHelpers.remove(index)}
                    sx={{ color: "black", cursor: "pointer" }}
                  />{" "}
                  #{field}
                </li>
              ))}
          </ul>
        </div>
      )}
    />
  );
};

const ArrayFile = ({ name, label }: any) => {
  const { values, setFieldValue }: any = useFormikContext();

  const handleFile = (e: any, array: any) => {
    if (values?.[name].length === 5) {
      toast.warn(`${label} cannot be greater than 5`);
      return;
    }
    const { files } = e.target;
    setFieldValue(name.toString(), files);
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
                hidden
                multiple
                onChange={(e) => handleFile(e, arrayHelpers)}
                name={name}
              />
            </IconButton>
            <Typography sx={{ mt: 1.5 }} component="span">
              Select file to upload
            </Typography>
            {/* )
                        }} /> */}
          </Typography>
          <ul style={{ marginTop: 10, listStyle: "none" }} id="imagesSection">
            {values?.[name].length > 0
              ? Array.from(values[name]).map((j: any, index: number) => (
                  <li key={index}>
                    {" "}
                    <ClearIcon
                      onClick={() => arrayHelpers.remove(index)}
                      sx={{ color: "black", cursor: "pointer" }}
                    />{" "}
                    {j.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    />
  );
};

const CreateUpdateBlog = ({ editedBlog, addEditBlog }: any) => {
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
        Add Update Blog
      </Typography>
      <Typography>
        <Formik
          initialValues={editedBlog}
          onSubmit={(values, { setSubmitting, resetForm }) => addEditBlog(values)}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    value={values?.title}
                    onChange={handleChange}
                    name="title"
                    label="Title"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={6}>
                <TextField
                    fullWidth
                    id="filled-basic"
                    value={values?.blogCategory}
                    onChange={handleChange}
                    name="blogCategory"
                    label="Blog Catrgory"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    name="shortDesc"
                    value={values?.shortDesc}
                    onChange={handleChange}
                    fullWidth
                    id="filled-basic"
                    label="Short Description"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    name="timeToRead"
                    value={values?.timeToRead}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    id="filled-basic"
                    label="Time to Read"
                    variant="filled"
                  />
                </Grid>
                <Grid item md={6}>
                  <ArrayField name="hashTags" label="Hash Tags" />
                </Grid>
                <Grid item md={6}>
                  <ArrayField name="seoKeywords" label="Seo Keywords" />
                </Grid>
                {/* <Grid item md={12}>
                                    <FormControlLabel color='#624bff' control={<Checkbox checked={values.isVideo === 1} onChange={() => setFieldValue('isVideo', values.isVideo === 0 ? 1 : 0)} sx={{
                                        [`&, &.${checkboxClasses.checked}`]: {
                                            color: '624bff',
                                        },
                                    }} />} label="Is youtube video" />
                                </Grid> */}
                <Grid item md={6}>
                  {/* {values?.isVideo === 0 ? ( */}
                    <ArrayFile name="media" label="Image" />
                  {/* ) : (
                    <TextField
                      name="media"
                      value={values?.media}
                      onChange={handleChange}
                      fullWidth
                      id="filled-basic"
                      label="Youtube Link"
                      variant="filled"
                    />
                  )} */}
                </Grid>
                <Grid item md={12}>
                  <CKEditor
                    editor={Editor}
                    data={values.longDesc}
                    onReady={(editor: any) => {
                      // You can store the "editor" and use when it is needed.
                      editor.editing.view.change((writer: any) => {
                        writer.setStyle(
                          "height",
                          "600px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFieldValue("longDesc", data);
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
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
                  onClick={()=>addEditBlog(values, resetForm)}
                  // type="submit"
                >
                  Submit
                </Button>{" "}
                &nbsp;&nbsp;
                <Button
                  sx={{ ...STYLES.outlinedBtn, mt: 1 }}
                  variant="outlined"
                  size="large"
                  // type="submit"
                  onClick={()=> resetForm()}
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

export default CreateUpdateBlog;
