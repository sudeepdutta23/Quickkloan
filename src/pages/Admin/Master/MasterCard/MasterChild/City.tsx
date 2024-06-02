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
  addCity,
  deleteCity,
  editCity,
  getCity,
  getStates,
} from "../../../../../services";
import { CityInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import Select from "../../../../../components/UI/TextInput/Select";
import { PopUp } from "../../../../../components";

export const City = () => {
  const { state, dispatch } = useApplyFormState();
  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });
  const tableHeader = ["Sl No", "City Code", "City Name", "State Id", "Action"];
  const excludedBody = ["value"];

  const citySchema = yup.object().shape({
    stateId: yup.string().required("Please select a state"),
    cityName: yup.string().required("City name is required"),
  });

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      Promise.all([getStates(signal), getCity(8, signal)]).then((data) => {
        data.forEach(({ data, error }, index: number) => {
          if (data.abort) return;
          if (!error) dispatch(index === 0 ? "SET_STATE" : "SET_CITY", data);
        });
      });
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStateChange = async (event: any, handleChange: any) => {
    // resetForm()
    handleChange(event);
    const { signal } = createSignal();
    dispatch("SET_CITY", (await getCity(event.target.value, signal)).data);
  };

  const handleCityChange = (cityId: string) => {
    const city: CityInterface | undefined = state.city.find(
      (val: CityInterface) => val.value === cityId
    );
    if (city) {
      setValues({
        ...values,
        cityCode: city.cityCode,
        cityName: city.name,
        cityId,
        stateId: city.stateId,
      });
    }
  };

  const {
    handleSubmit,
    handleChange,
    setValues,
    setFieldValue,
    values,
    resetForm,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      stateId: "8",
      cityId: "",
      cityCode: "",
      cityName: "",
    },
    validationSchema: citySchema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-lone-blocks
      {
        if (values.cityId) {
          if (!values?.stateId) {
            toast.warning("State is required");
            return;
          } else if (!values?.cityId) {
            toast.warning("Please select a city");
            return;
          } else {
            const { signal } = createSignal();
            const { data: resData, error } = await editCity(
              values,
              values?.cityId,
              signal
            );
            if (!error) {
              toast.success(resData.message);
              const { signal } = createSignal();
              dispatch(
                "SET_CITY",
                (await getCity(values.stateId, signal)).data
              );
              resetForm();
              setFieldValue("stateId", "");
            } else {
              toast.error(resData.message);
            }
          }
        } else {
          if (!values?.stateId) {
            toast.warning("State is required");
            return;
          } else if (!values?.cityName) {
            toast.warning("City is required");
            return;
          } else {
            const { stateId, cityCode, cityName } = values;
            const { signal } = createSignal();
            const { data: resData, error } = await addCity(
              { stateId, cityCode, cityName },
              signal
            );
            if (!error) {
              toast.success(resData.message);
              const { signal } = createSignal();
              dispatch(
                "SET_CITY",
                (await getCity(values.stateId, signal)).data
              );
              resetForm();
              setFieldValue("stateId", "");
            } else {
              toast.error(resData.message);
            }
          }
        }
      }
    },
  });

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a state");
      return;
    } else {
      const { signal } = createSignal();
      const { data: resData, error } = await deleteCity(id, signal);
      if (!error) {
        toast.success(resData.message);
        let stateId = values?.stateId ? values?.stateId : 1;
        const { signal } = createSignal();
        dispatch("SET_CITY", (await getCity(stateId, signal)).data);
        resetForm();
      } else {
        toast.error(resData.message);
      }
    }
    setModalData({ ...modalData, open: false })
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            City
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <Select
                label="Select State"
                variant="filled"
                size="small"
                name="stateId"
                value={values?.stateId}
                onChange={(e: any) => handleStateChange(e, handleChange)}
                options={state?.states}
              />
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <TextField
                  name="cityCode"
                  label="City Code"
                  value={values?.cityCode}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
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
                  name="cityName"
                  label="City Name"
                  value={values?.cityName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.cityName && errors?.cityName ? "text-danger" : ""
                  }
                >
                  {touched?.cityName && errors?.cityName}
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
                setFieldValue("stateId", "");
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
        body={state?.city}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleCityChange}
      />
    </>
  );
};
