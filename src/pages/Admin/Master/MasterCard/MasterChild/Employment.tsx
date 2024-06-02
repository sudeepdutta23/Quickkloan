import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useApplyFormState } from "../../../../../hooks";
import {
  addEmployementStatus,
  deleteEmployementStatus,
  editEmployementStatus,
  getEmployementStatus,
} from "../../../../../services/Master";
import { EmploymentInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import { PopUp } from "../../../../../components";

export const Employment = () => {
  const { state, dispatch } = useApplyFormState();

  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const tableHeader = ["Sl No", "Employment Type", "Action"];
  const excludedBody = ["value"];

  const employmentSchema = yup.object().shape({
    employmentType: yup.string().required("Employment name is required"),
  });

  useEffect(() => {
    const { controller, signal} = createSignal();
    (async () => {
      const { data, error } = await getEmployementStatus(signal);
      if (data?.abort) return;
      if (!error) dispatch("SET_EMPLOYMENT", data);
    })();

    return () =>  controller.abort();
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
  } = useFormik({
    initialValues: {
      employee: "",
      employmentType: "",
    },
    validationSchema: employmentSchema,
    onSubmit: async (values) => {
      if (values?.employee) {
        if (!values?.employee) {
          toast.warning("Please select a employement");
          return;
        } else if (!values?.employmentType) {
          toast.warning("Employement name is required");
          return;
        } else {
          const { signal} = createSignal();
          const { data: resData, error } = await editEmployementStatus(
            { employmentType: values?.employmentType },
            values?.employee,
            signal
          );
          if (!error) {
            toast.success(resData.message);
            const { signal} = createSignal();
            dispatch('SET_EMPLOYMENT', (await getEmployementStatus(signal)).data);
            resetForm();
          } else {
            toast.error(resData.message);
          }
        }
      } else {
        if (!values?.employmentType) {
          toast.warning("Employment name is required");
          return;
        } else {
          const { signal} = createSignal();
          const { data: resData, error } = await addEmployementStatus({
            employmentType: values?.employmentType,
          }, signal);
          if (!error) {
            toast.success(resData.message);
            const { signal} = createSignal();
            dispatch('SET_EMPLOYMENT', (await getEmployementStatus(signal)).data);
            resetForm();
          } else {
            toast.error(resData.message);
          }
        }
      }
    },
  });

  const handleEmploymentChange = (employee: string) => {
    const employ: EmploymentInterface | undefined = state.employment.find(
      (val: EmploymentInterface) => val.value === employee
    );
    if (employ) {
      setValues({ employee: employ.value, employmentType: employ.name });
    }
  };

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a employement");
      return;
    } else {
      const { signal} = createSignal();
      const { data, error } = await deleteEmployementStatus(id, signal);
      if (!error) {
        toast.success(data?.message);
        const { signal} = createSignal();
        dispatch('SET_EMPLOYMENT', (await getEmployementStatus(signal)).data);
        resetForm();
      } else {
        toast.error(data?.message);
      }
    }
    setModalData({ ...modalData, open: false })
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            Employement Type
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
                  name="employmentType"
                  label="Employment Type"
                  value={values?.employmentType}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.employmentType && errors?.employmentType
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.employmentType && errors?.employmentType}
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
            <Button onClick={() => resetForm()}>Cancel</Button>
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
        body={state?.employment}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleEmploymentChange}
      />
    </>
  );
};
