import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useApplyFormState } from "../../../../../hooks";
import {
  addTestimonials,
  deleteTestimonials,
  editTestimonials,
  getTestimonials,
} from "../../../../../services";
import { TestimonialInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import { Image, PopUp } from "../../../../../components";

export const Testimonials = () => {
  const { state, dispatch } = useApplyFormState();
  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const dispatchTestimonial = async (signal?: AbortSignal) => {
    if (!signal) {
      const { signal: signals } = createSignal();
      signal = signals;
    }
    const { data, error } = await getTestimonials(signal);
    if (data?.abort) return;
    if (!error) dispatch("SET_TESTIMONIALS", data);
  };

  const testimonialSchema = yup.object().shape({
    customerName: yup.string().required("Name is required"),
    customerCollegeName: yup.string().required("College name is required"),
    customerComment: yup.string().required("Comment name is required"),
  });

  const tableHeader = [
    "Sl No",
    "Customer Name",
    "Customer Image",
    "Comment",
    "College Name",
    "Action",
  ];
  const excludedBody = ["value", "isActive"];

  useEffect(() => {
    const { controller, signal } = createSignal();

    dispatchTestimonial(signal);

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    resetForm,
    touched,
    errors,
  }: any = useFormik({
    initialValues: {
      id: "",
      customerName: "",
      customerCollegeName: "",
      customerComment: "",
      customerImage: null,
    },
    validationSchema: testimonialSchema,
    onSubmit: async (values: any) => {
      if (values?.id) {
        if (!values?.id) {
          toast.warning("Please select a testimonial");
          return;
        } else if (!values?.customerName) {
          toast.warning("Name is required");
          return;
        } else if (!values?.customerComment) {
          toast.warning("Comment is required");
          return;
        } else if (!values?.customerCollegeName) {
          toast.warning("College name is required");
          return;
        } else {
          const formData = new FormData();
          Object.keys(values).forEach((keys) => {
            if (keys === "customerImage") {
              if (file) formData.append("customerImage", file);
            } else {
              formData.append(keys, values[keys]);
            }
          });
          const { signal } = createSignal();
          const { data, error } = await editTestimonials(formData, signal);
          if (!error) {
            toast.success(data.message);
            dispatchTestimonial();
            resetForm();
            handleImageRemove();
          } else {
            toast.error(data.message);
          }
        }
      } else {
        if (!values?.customerName) {
          toast.warning("Name is required");
          return;
        } else if (!values?.customerComment) {
          toast.warning("Comment is required");
          return;
        } else if (!values?.customerCollegeName) {
          toast.warning("College name is required");
          return;
        } else {
          const formData = new FormData();
          Object.keys(values).forEach((keys) => {
            if (keys === "customerImage") {
              if (file) formData.append(keys, file);
            } else if (keys === "id") {
            } else {
              formData.append(keys, values[keys]);
            }
          });
          const { signal } = createSignal();
          const { data, error } = await addTestimonials(formData, signal);
          if (!error) {
            toast.success(data.message);
            dispatchTestimonial();
            resetForm();
            handleImageRemove();
          } else {
            toast.error(data.message);
          }
        }
      }
    },
  });

  const handleFileChange = (event: any) => {
    const { files } = event.target;
    setFile(files[0]);
    setUrl(URL.createObjectURL(files[0]));
  };

  const handleTestimonialChange = (id: any) => {
    if (!id) {
      resetForm();
      return;
    }
    const testimonial: TestimonialInterface | undefined =
      state?.testimonials.find((val: TestimonialInterface) => val.value === id);
    if (testimonial) {
      setValues({
        ...values,
        id,
        customerName: testimonial.name,
        customerCollegeName: testimonial.customerCollegeName,
        customerComment: testimonial.customerComment,
      });
      setImage(testimonial.customerImage);
    }
  };

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a testimonial");
      return;
    } else {
      const { signal } = createSignal();
      const { data, error } = await deleteTestimonials(id, signal);
      if (!error) {
        toast.success(data.message);
        dispatchTestimonial();
        resetForm();
        // resetFile()
        handleImageRemove();
      } else {
        toast.error(data.message);
      }
    }
    setModalData({ ...modalData, open: false })
  };

  const handleImageRemove = () => {
    setFile(null);
    setUrl("");
    setImage("");
    let file: any = document.getElementById("icon");
    file.value = "";
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            Testimonial
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  name="customerName"
                  label="Name"
                  value={values?.customerName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.customerName && errors?.customerName
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.customerName && errors?.customerName}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  name="customerCollegeName"
                  label="College Name,Address"
                  value={values?.customerCollegeName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.customerCollegeName && errors?.customerCollegeName
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.customerCollegeName && errors?.customerCollegeName}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <Typography sx={{ display: "flex" }}>
                <IconButton component="label">
                  <CloudUploadIcon sx={{ fontSize: 30 }} />
                  <input
                    type="file"
                    id="icon"
                    hidden
                    onChange={handleFileChange}
                    name="customerImage"
                  />
                </IconButton>
                <Typography sx={{ mt: 1.5 }} component="span">
                  Select file to upload
                </Typography>
              </Typography>
              <ul
                style={{ marginTop: 10, listStyle: "none" }}
                id="imagesSection"
              >
                {image && (
                  <li>
                    <div>
                      <Image
                        src={image}
                        style={{ marginBottom: 20, width: "20%" }}
                      />
                    </div>
                  </li>
                )}
                {imageUrl && (
                  <li>
                    <div>
                      <Image
                        src={imageUrl}
                        style={{ marginBottom: 20, width: "20%" }}
                      />
                      {file?.name}
                      <ClearIcon
                        onClick={handleImageRemove}
                        sx={{ color: "black", cursor: "pointer" }}
                      />{" "}
                    </div>
                  </li>
                )}
              </ul>
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  name="customerComment"
                  label="Comment"
                  multiline
                  rows={5}
                  value={values?.customerComment}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.customerComment && errors?.customerComment
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.customerComment && errors?.customerComment}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Button variant="contained" type="submit">
              Save
            </Button>
            &nbsp;
            <Button
              onClick={() => {
                resetForm();
                setImage("");
              }}
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
      <PopUp
        open={modalData.open}
        toggleModal={() => setModalData({ ...modalData, open: false })}
        modalType="warning"
        title="Delete"
        content={`Are you sure you want to delete?`}
        okText="Yes"
        onOk={() => onDelete(modalData.data)}
      />
      <MasterTable
        header={tableHeader}
        body={state?.testimonials}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleTestimonialChange}
      />
    </>
  );
};
