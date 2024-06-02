import { Box, Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useApplyFormState } from '../../../../../hooks';
import { addLoanType, deleteLoanType, editLoanType, getLoanType } from '../../../../../services';
import { LoanTypeInterface } from '../../../../../store';
import { MasterTable } from '../Table';
import { createSignal } from '../../../../../utils';
import { PopUp } from '../../../../../components';

export const LoanType = () => {

    const { state, dispatch } = useApplyFormState();
    const [modalData, setModalData] = useState<{
        open: boolean;
        data: number | string | null;
      }>({ open: false, data: null });

    const tableHeader = ["Sl No", "Loan Type", "Order By", "Action"];
    const excludedBody = ['value'];

    const loanSchema = yup.object().shape({
        loanType: yup.string().required('Loan name is required'),
        orderBy: yup.number().required("Order by is required")
    })

    useEffect(() => {
        const { controller, signal } = createSignal();
        (async () => {
            const { data, error } = await getLoanType(signal);
            if (data?.abort) return;
            if (!error) dispatch("SET_LOAN_TYPE", data);
        })();

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { handleSubmit, handleChange, setValues, values, resetForm, touched, errors } = useFormik({
        initialValues: {
            loan: '',
            loanType: '',
            orderBy: ''
        },
        validationSchema: loanSchema,
        onSubmit: async (values) => {
            if (values?.loan) {
                if (!values?.loan) {
                    toast.warning("Please select a loan type");
                    return
                } else if (!values?.loanType) {
                    toast.warning("Loan name is required");
                    return
                } else if (!values?.orderBy) {
                    toast.warning("Please select order");
                    return
                } else {
                    const { signal } = createSignal();
                    const { data, error } = await editLoanType({ name: values?.loanType, orderBy: values?.orderBy }, values?.loan, signal)
                    if (!error) {
                        toast.success(data.message);
                        const { signal } = createSignal();
                        dispatch('SET_LOAN_TYPE', (await getLoanType(signal)).data);
                        resetForm()
                    } else {
                        toast.error(data.message);
                    }
                }
            } else {
                if (!values?.loanType) {
                    toast.warning("Loan name is required");
                    return
                } else {
                    const { signal } = createSignal();
                    const { data, error } = await addLoanType({ name: values?.loanType, orderBy: values?.orderBy }, signal)
                    if (!error) {
                        toast.success(data.message)
                        const { signal } = createSignal();
                        dispatch('SET_LOAN_TYPE', (await getLoanType(signal)).data);
                        resetForm()
                    } else {
                        toast.error(data.message);
                    }
                }
            }
        },
    });

    const handleLoanTypeChange = (loan: string) => {
        const loanType: LoanTypeInterface | undefined = state?.loanTypes.find((val: LoanTypeInterface) => val.value === loan);
        if (loanType) {
            setValues({ ...values, loan, loanType: loanType.name, orderBy: loanType.orderBy })
        }
    }

    const onDelete = async (id: any) => {
        if (!id) {
            toast.warning("Please select a loan type");
            return
        } else {
            const { signal } = createSignal();
            const { data, error } = await deleteLoanType(id, signal)
            if (!error) {
                toast.success(data.message)
                const { signal } = createSignal();
                dispatch('SET_LOAN_TYPE', (await getLoanType(signal)).data);
                resetForm()
            } else {
                toast.error(data.message);
            }
        }
        setModalData({ ...modalData, open: false })
    }

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', mb: 2, py: 1, px: 1 }}>
                <div className='text-center my-2'>
                    <span style={{ fontSize: 30, textDecoration: 'underline' }}>Loan Type</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Grid item xl={3} md={3} sm={6} xs={6}>
                            <FormControl fullWidth variant="standard">
                                <TextField name="loanType" label="Loan Type" value={values?.loanType} onChange={handleChange} variant="filled" size='small' />
                                <FormHelperText className={touched?.loanType && errors?.loanType ? 'text-danger' : ''}>{touched?.loanType && errors?.loanType}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Grid item xl={3} md={3} sm={6} xs={6}>
                            <FormControl fullWidth variant="standard">
                                <TextField name="orderBy" type='number' label="Order By" value={values?.orderBy} onChange={handleChange} variant="filled" size='small' />
                                <FormHelperText className={touched?.orderBy && errors?.orderBy ? 'text-danger' : ''}>{touched?.orderBy && errors?.orderBy}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <Button variant='contained' type='submit'>
                            Save
                        </Button>
                        &nbsp;
                        <Button onClick={() => resetForm()}>
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
                body={state?.loanTypes}
                excludedBody={excludedBody}
                onDelete={(id: number | string) =>
                    setModalData({ open: true, data: id })
                }
                handleEdit={handleLoanTypeChange} />
        </>
    )
}
