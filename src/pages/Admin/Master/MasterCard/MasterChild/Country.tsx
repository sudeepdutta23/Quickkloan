import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
  addCountries,
  deleteCountries,
  editCountries,
  getCountries,
} from "../../../../../services";
import { CountryInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import { PopUp } from "../../../../../components";

export const Country = () => {
  const { state, dispatch } = useApplyFormState();

  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const excludedBody = ["value"];

  const tableHeader = [
    "Sl No",
    "Country Code",
    "Country Name",
    "Show On Address",
    "Action",
  ];

  const countrySchema = yup.object().shape({
    countryName: yup.string().required("Country name is required"),
    countryCode: yup.string().required("Country code is required"),
  });

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getCountries(signal);
      if (data?.abort) return;
      if (!error) dispatch("SET_COUNTRY", data);
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
    setFieldValue,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      countryId: "",
      countryCode: "",
      countryName: "",
      showOnAddress: "NO",
    },
    validationSchema: countrySchema,
    onSubmit: async (values) => {
      if (values?.countryId) {
        if (!values?.countryName) {
          toast.warning("Country name is required");
          return;
        } else if (!values?.countryId) {
          toast.warning("Please select a country");
          return;
        } else {
          const { countryName, countryCode, countryId, showOnAddress } = values;
          const { signal } = createSignal();
          const { data, error } = await editCountries(
            { countryName, countryCode, showOnAddress },
            countryId,
            signal
          );
          if (!error) {
            toast.success(data.message);
            resetForm();
            const { signal } = createSignal();
            dispatch("SET_COUNTRY", (await getCountries(signal)).data);
          } else {
            toast.error(data.message);
          }
        }
      } else {
        if (!values?.countryName) {
          toast.warning("Country name is required");
          return;
        } else {
          const { countryName, countryCode, showOnAddress } = values;
          const { signal } = createSignal();
          const { data, error } = await addCountries(
            { countryName, countryCode, showOnAddress },
            signal
          );
          if (!error) {
            toast.success(data.message);
            resetForm();
            const { signal } = createSignal();
            dispatch("SET_COUNTRY", (await getCountries(signal)).data);
          } else {
            toast.error(data.message);
          }
        }
      }
    },
  });

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a country");
      return;
    } else {
      const { signal } = createSignal();
      const { data, error } = await deleteCountries(id, signal);
      if (!error) {
        toast.success(data.message);
        resetForm();
        const { signal } = createSignal();
        dispatch("SET_COUNTRY", (await getCountries(signal)).data);
      } else {
        toast.error(data.message);
      }
    }
    setModalData({ ...modalData, open: false })
  };

  const handleCountryChange = (countryId: any) => {
    const country: CountryInterface | undefined = state.country.find(
      (val: CountryInterface) => Number(val.value) === Number(countryId)
    );
    if (country) {
      setValues({
        ...values,
        countryId,
        countryCode: country.countryCode,
        countryName: country.name,
        showOnAddress: country.showOnAddress,
      });
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            Country
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
                  name="countryCode"
                  label="Country Code"
                  value={values?.countryCode}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.countryCode && errors?.countryCode
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.countryCode && errors?.countryCode}
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
                  name="countryName"
                  label="Country Name"
                  value={values?.countryName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
                <FormHelperText
                  className={
                    touched?.countryName && errors?.countryName
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.countryName && errors?.countryName}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Grid item xl={2} md={2} sm={6} xs={6}>
              <FormControlLabel
                name="showOnAddress"
                onChange={() =>
                  values?.showOnAddress === "YES"
                    ? setFieldValue("showOnAddress", "NO")
                    : setFieldValue("showOnAddress", "YES")
                }
                value={values?.showOnAddress}
                control={<Checkbox checked={values.showOnAddress === "YES"} />}
                label="Show on address"
              />
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
        body={state?.country}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleCountryChange}
      />
    </>
  );
};
