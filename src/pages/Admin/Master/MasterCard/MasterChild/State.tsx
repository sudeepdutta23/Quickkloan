import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useApplyFormState } from "../../../../../hooks";
import {
  addStates,
  deleteStates,
  editStates,
  getCountries,
  getStates,
} from "../../../../../services/Master";
import { StateInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import { PopUp } from "../../../../../components";

export const State = () => {
  const { state, dispatch } = useApplyFormState();

  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const getState = async () => {
    const { signal } = createSignal();
    dispatch("SET_STATE", (await getStates(signal)).data);
  };

  const tableHeader = ["Sl No", "State Code", "State Name", "Action"];
  const excludedBody = ["value", "countryId"];

  const stateSchema = yup.object().shape({
    countryId: yup.string().required("Please select a country"),
    stateName: yup.string().required("State name is required"),
    stateCode: yup.string().required("State code is required"),
  });

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getCountries(signal);
      if (data?.abort) return;
      if (!error) dispatch("SET_COURSE_COUNTRY", data);
      getState();
    })();

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
  } = useFormik({
    initialValues: {
      countryId: "",
      stateId: "",
      stateCode: "",
      stateName: "",
    },
    validationSchema: stateSchema,
    onSubmit: async (values) => {
      if (values?.stateId) {
        if (!values?.countryId) {
          toast.warning("Country is required");
          return;
        } else if (!values?.stateId) {
          toast.warning("Please select a state");
          return;
        } else {
          const { countryId, stateCode, stateId, stateName } = values;
          const { signal } = createSignal();
          const { data, error } = await editStates(
            { countryId, stateName, stateCode },
            stateId,
            signal
          );
          if (!error) {
            toast.success(data.message);
            resetForm();
            getState();
          } else {
            toast.error(data.message);
          }
        }
      } else {
        if (!values?.countryId) {
          toast.warning("Country is required");
          return;
        } else if (!values?.stateName) {
          toast.warning("State is required");
          return;
        } else {
          const { countryId, stateName, stateCode } = values;
          const { signal } = createSignal();
          const { data: resData, error } = await addStates(
            { countryId, stateName, stateCode },
            signal
          );
          if (!error) {
            toast.success(resData.message);
            resetForm();
            getState();
          } else {
            toast.error(resData.message);
          }
        }
      }
    },
  });

  const handleStateChange = (stateId: any) => {
    const stat: StateInterface | undefined = state.states.find(
      (val: StateInterface) => val.value === stateId
    );
    if (stat) {
      setValues({
        ...values,
        countryId: stat.countryId,
        stateId,
        stateCode: stat.stateCode,
        stateName: stat.name,
      });
    }
    // handleChange(event)
  };

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a country");
      return;
    } else {
      const { signal } = createSignal();
      const { data, error } = await deleteStates(id, signal);
      if (!error) {
        toast.success(data.message);
        getState();
        resetForm();
      } else {
        toast.error(data.message);
      }
    }
    setModalData({ ...modalData, open: false })
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            State
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
                <InputLabel id="demo-simple-select-standard-label">
                  Select Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  name="countryId"
                  value={values?.countryId}
                  onChange={handleChange}
                  label="country"
                  variant="filled"
                  size="small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {state?.courseCountry &&
                    state?.courseCountry.map((country: any) => (
                      <MenuItem key={country.value} value={country.value}>
                        {country?.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText
                  className={
                    touched?.countryId && errors?.countryId ? "text-danger" : ""
                  }
                >
                  {touched?.countryId && errors?.countryId}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  name="stateCode"
                  label="State Code"
                  value={values?.stateCode}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.stateCode && errors?.stateCode ? "text-danger" : ""
                  }
                >
                  {touched?.stateCode && errors?.stateCode}
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
              <FormControl fullWidth variant="standard">
                <TextField
                  name="stateName"
                  label="State Name"
                  value={values?.stateName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.stateName && errors?.stateName ? "text-danger" : ""
                  }
                >
                  {touched?.stateName && errors?.stateName}
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
        body={state?.states}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleStateChange}
      />
    </>
  );
};
