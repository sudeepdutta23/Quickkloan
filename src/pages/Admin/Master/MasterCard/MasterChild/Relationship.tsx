import { Box, Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useApplyFormState } from '../../../../../hooks';
import { addRelationship, deleteRelationship, editRelationship, getAllRelationship } from '../../../../../services/Master';
import { RelationInterface } from '../../../../../store';
import { MasterTable } from '../Table';
import { createSignal } from '../../../../../utils';
import { PopUp } from '../../../../../components';

export const Relationship = () => {
    const { state, dispatch } = useApplyFormState();

    const [modalData, setModalData] = useState<{
        open: boolean;
        data: number | string | null;
      }>({ open: false, data: null });

    const tableHeader = ["Sl No", "Relation Name", "Action"];
    const excludedBody = ['value'];

    const relationSchema = yup.object().shape({
        name: yup.string().required('Relation name is required')
    })

    useEffect(() => {
        const { controller, signal } = createSignal();
        (async () => {
            const { data, error } = await getAllRelationship(signal);
            if (data?.abort) return;
            if (!error) dispatch("SET_RELATIONS", data);
        })();

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { handleSubmit, handleChange, setValues, values, resetForm, touched, errors } = useFormik({
        initialValues: {
            name: '',
            value: ''
        },
        validationSchema: relationSchema,
        onSubmit: async (values) => {
            if (values?.value) {
                if (!values?.name) {
                    toast.warning("Relation is required");
                    return
                } else {
                    const { name, value } = values
                    const { signal } = createSignal();
                    const { data, error } = await editRelationship({ relationship: name }, value, signal)
                    if (!error) {
                        toast.success(data.message)
                        resetForm()
                        const { signal } = createSignal();
                        dispatch('SET_RELATIONS', (await getAllRelationship(signal)).data);
                    } else {
                        toast.error(data.message);
                    }
                }
            } else {
                if (!values?.name) {
                    toast.warning("Relation is required");
                    return
                } else {
                    const { name } = values
                    const { signal } = createSignal();
                    const { data: resData, error } = await addRelationship({ relationship: name }, signal)
                    if (!error) {
                        toast.success(resData.message)
                        resetForm()
                        const { signal } = createSignal();
                        dispatch('SET_RELATIONS', (await getAllRelationship(signal)).data);
                    } else {
                        toast.error(resData.message);
                    }
                }
            }
        },
    });

    const handleRelationChange = (relation: string) => {
        const rel = state.relation.find((val: RelationInterface) => val.value === relation);
        if (rel) {
            setValues({ ...values, name: rel.name, value: rel.value });
        }
    }

    const onDelete = async (id: any) => {
        if (!id) {
            toast.warning("Please select a relationship");
            return
        } else {
            const { signal } = createSignal();
            const { data, error } = await deleteRelationship(id, signal)
            if (!error) {
                toast.success(data.message)
                dispatch('SET_RELATIONS', (await getAllRelationship(signal)).data);
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
                    <span style={{ fontSize: 30, textDecoration: 'underline' }}>Relationship</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Grid item xl={3} md={3} sm={6} xs={6}>
                            <FormControl fullWidth variant="standard">
                                <TextField name="name" label="Relation Name" value={values?.name} onChange={handleChange} variant="filled" size='small' />
                                <FormHelperText className={touched?.name && errors?.name ? 'text-danger' : ''} >{touched?.name && errors?.name}</FormHelperText>
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
                body={state?.relation}
                excludedBody={excludedBody}
                onDelete={(id: number | string) =>
                    setModalData({ open: true, data: id })
                }
                handleEdit={handleRelationChange} />
        </>
    )
}
