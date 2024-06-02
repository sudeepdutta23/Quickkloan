import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useApplyFormState } from "../../../../../hooks";
import {
  addDocuments,
  deleteDocuments,
  editDocuments,
  getDocuments,
  getLoanType,
} from "../../../../../services";
import { DocumentsInterface, LoanTypeInterface } from "../../../../../store";
import { MasterTable } from "../Table";
import { createSignal } from "../../../../../utils";
import { PopUp } from "../../../../../components";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Document = () => {
  const { state, dispatch } = useApplyFormState();
  const tableHeader = [
    "Sl No",
    "Document Type",
    "Document Name",
    "Loan Type",
    "Individual Type",
    "Required For",
    "Action",
  ];
  const excludedBody = ["id", "value"];
  const individualType = ["Borrower", "Cosigner"];
  const [modalData, setModalData] = useState<{
    open: boolean;
    data: number | string | null;
  }>({ open: false, data: null });

  const documentSchema = yup.object().shape({
    documentName: yup.string().required("Document name is required"),
    loanType: yup
      .array()
      .min(1, "Please select atleast one loan type")
      .required("LoanType is required"),
    individualType: yup
      .array()
      .min(1, "Please select atleast one individual type")
      .required("Individual type is required"),
  });

  const theme = useTheme();

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      Promise.all([getDocuments(signal), getLoanType(signal)]).then((data) => {
        data.forEach(({ data, error }, index: number) => {
          if (data.abort) return;
          if (!error)
            dispatch(index === 0 ? "SET_DOCUMENTS" : "SET_LOAN_TYPE", data);
        });
      });
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    handleChange,
    setValues,
    setFieldValue,
    values,
    resetForm,
    errors,
    touched,
  }: any = useFormik({
    initialValues: {
      documentName: "",
      loanType: [],
      id: "",
      individualType: [],
      requiredIndividualType: [],
    },
    validationSchema: documentSchema,
    onSubmit: async (values) => {
      const { documentName, loanType, individualType, requiredIndividualType } =
        values;
      if (values?.id) {
        const { signal } = createSignal();
        const { data, error } = await editDocuments(
          {
            documentName,
            loanType: loanType.toString(),
            individualType: individualType.toString(),
            requiredIndividualType: requiredIndividualType
              ? requiredIndividualType.toString()
              : null,
          },
          values?.id,
          signal
        );
        if (!error) {
          const { signal } = createSignal();
          toast.success(data.message);
          dispatch("SET_DOCUMENTS", (await getDocuments(signal)).data);
          resetForm();
        } else {
          toast.error(data.message);
        }
      } else {
        const { signal } = createSignal();
        const { data, error } = await addDocuments(
          {
            documentName,
            loanType: loanType.toString(),
            individualType: individualType.toString(),
            requiredIndividualType: requiredIndividualType
              ? requiredIndividualType.toString()
              : null,
          },
          signal
        );
        if (!error) {
          toast.success(data.message);
          const { signal } = createSignal();
          dispatch("SET_DOCUMENTS", (await getDocuments(signal)).data);
          resetForm();
        } else {
          toast.error(data.message);
        }
      }
    },
  });

  const onDelete = async (id: any) => {
    if (!id) {
      toast.warning("Please select a document");
      return;
    } else {
      const { signal } = createSignal();
      const { data, error } = await deleteDocuments(id, signal);
      if (!error) {
        toast.success(data.message);
        const { signal } = createSignal();
        dispatch("SET_DOCUMENTS", (await getDocuments(signal)).data);
        resetForm();
      } else {
        toast.error(data.message);
      }
    }
    setModalData({ ...modalData, open: false });
  };

  const handleDocumentChange = (docId: number) => {
    // handleChange(e)
    const document: DocumentsInterface | undefined = state?.documents.find(
      (val: DocumentsInterface) => val.id === Number(docId)
    );
    if (document) {
      setValues({
        documentName: document.documentName,
        individualType: document.individualType
          ? document.individualType.split(",")
          : null,
        id: document.id,
        loanType: document.loanType
          ? document.loanType
              .split(",")
              .map(
                (val: any) =>
                  state.loanTypes.find(
                    (value: LoanTypeInterface) => value.name === val
                  )?.value
              )
          : null,
        requiredIndividualType: document.requiredIndividualType
          ? document.requiredIndividualType.split(",")
          : null,
      });
    }
  };

  function getStyles(name: string, loanType: string[], theme: Theme) {
    return {
      fontWeight:
        loanType && loanType.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      display: "flex",
      justifyContent: "space-between",
    };
  }

  const getNameById = (id: any) =>
    state.loanTypes.find((val: any) => val.value === id)?.name;

  const handleLoan = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setFieldValue("requiredIndividualType", value);
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", mb: 2, py: 1, px: 1 }}>
        <div className="text-center my-2">
          <span style={{ fontSize: 30, textDecoration: "underline" }}>
            Documents
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
                  name="documentName"
                  label="Document Name"
                  value={values?.documentName}
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                  error={touched?.documentName && Boolean(errors?.documentName)}
                  helperText={touched?.documentName && errors?.documentName}
                />
              </FormControl>
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel
                  className={
                    touched?.individualType && errors?.individualType
                      ? "text-danger"
                      : ""
                  }
                  sx={{ ml: 2 }}
                >
                  Individual Types
                </InputLabel>
                <Select
                  multiple
                  value={values?.individualType}
                  size="small"
                  onChange={(e) => {
                    handleChange(e);
                    handleLoan(e);
                  }}
                  name="individualType"
                  MenuProps={MenuProps}
                  renderValue={(selected) =>
                    selected.map((val: any) => val).join(", ")
                  }
                  label="individual"
                  variant="filled"
                  error={
                    touched?.individualType && Boolean(errors?.individualType)
                  }
                >
                  {individualType.map((individual: any) => (
                    <MenuItem
                      key={individual}
                      style={getStyles(
                        individual,
                        values?.individualType,
                        theme
                      )}
                      value={individual}
                    >
                      {individual}
                      {values?.individualType.indexOf(individual) !== -1 ? (
                        <DoneIcon sx={{ color: "green" }} />
                      ) : (
                        ""
                      )}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  className={
                    touched?.individualType && errors?.individualType
                      ? "text-danger"
                      : ""
                  }
                >
                  {touched?.individualType && errors?.individualType}
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
                <InputLabel
                  id="demo-multiple-name-label"
                  className={
                    touched?.loanType && errors?.loanType ? "text-danger" : ""
                  }
                  sx={{ ml: 2 }}
                >
                  Loan Types
                </InputLabel>
                <Select
                  multiple
                  value={values?.loanType}
                  size="small"
                  onChange={handleChange}
                  name="loanType"
                  MenuProps={MenuProps}
                  renderValue={(selected) =>
                    selected.map((val: any) => getNameById(val)).join(", ")
                  }
                  variant="filled"
                  error={touched?.loanType && Boolean(errors?.loanType)}
                >
                  {state?.loanTypes &&
                    state.loanTypes.map((loanType: any) => (
                      <MenuItem
                        key={loanType.value}
                        value={loanType.value}
                        style={getStyles(
                          loanType.value,
                          values?.loanType,
                          theme
                        )}
                      >
                        {loanType.name}
                        {values?.loanType.indexOf(loanType.value) !== -1 ? (
                          <DoneIcon sx={{ color: "green" }} />
                        ) : (
                          ""
                        )}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText
                  className={
                    touched?.loanType && errors?.loanType ? "text-danger" : ""
                  }
                >
                  {touched?.loanType && errors?.loanType}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xl={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ ml: 2 }}
                >
                  Required For
                </InputLabel>
                <Select
                  multiple
                  value={values?.requiredIndividualType || []}
                  size="small"
                  onChange={handleChange}
                  name="requiredIndividualType"
                  MenuProps={MenuProps}
                  renderValue={(selected) =>
                    selected.map((val: any) => val).join(", ")
                  }
                  label="requiredIndividualType"
                  variant="filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {individualType.map((individual: any) => (
                    <MenuItem
                      key={individual}
                      style={getStyles(
                        individual,
                        values?.requiredIndividualType,
                        theme
                      )}
                      value={individual}
                    >
                      {individual}
                      {values?.requiredIndividualType &&
                      values?.requiredIndividualType.indexOf(individual) !==
                        -1 ? (
                        <DoneIcon sx={{ color: "green" }} />
                      ) : (
                        ""
                      )}
                    </MenuItem>
                  ))}
                </Select>
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
        body={state?.documents}
        excludedBody={excludedBody}
        onDelete={(id: number | string) =>
          setModalData({ open: true, data: id })
        }
        handleEdit={handleDocumentChange}
      />
    </>
  );
};
