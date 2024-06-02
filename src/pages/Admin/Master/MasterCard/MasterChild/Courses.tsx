import { Box, Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useApplyFormState } from '../../../../../hooks';
import { addCourses, deleteCourses, editCourses, getCourses } from '../../../../../services';
import { CoursesInterface } from '../../../../../store';
import { MasterTable } from '../Table';
import { createSignal } from '../../../../../utils';
import { PopUp } from '../../../../../components';

export const Courses = () => {
    const { state, dispatch } = useApplyFormState();
    const [modalData, setModalData] = useState<{
        open: boolean;
        data: number | string | null;
    }>({ open: false, data: null });

    useEffect(() => {
        const { controller, signal } = createSignal();
        (async () => {
            const { data, error } = await getCourses(signal);
            if (data?.abort) return;
            if (!error) dispatch("SET_COURSES", data);
        })();

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tableHeader = ["Sl No", "Course Name", "Action"];
    const excludedBody = ['value'];

    const courseSchema = yup.object().shape({
        courseName: yup.string().required('Course name is required')
    })

    const { handleSubmit, handleChange, setValues, values, resetForm, touched, errors } = useFormik({
        initialValues: {
            course: '',
            courseName: '',
        },
        validationSchema: courseSchema,
        onSubmit: async (values) => {
            if (values.course) {
                if (!values?.course) {
                    toast.warning("Please select a course");
                    return
                } else if (!values?.courseName) {
                    toast.warning("Course name is required");
                    return
                } else {
                    const { signal } = createSignal();
                    const { data: resData, error } = await editCourses({ courseName: values?.courseName }, values?.course, signal)
                    if (!error) {
                        toast.success(resData.message)
                        resetForm()
                        const { signal } = createSignal();
                        dispatch('SET_COURSES', (await getCourses(signal)).data);
                    } else {
                        toast.error(resData.message);
                    }
                }
            } else {
                if (!values?.courseName) {
                    toast.warning("Course name is required");
                    return
                } else {
                    const { signal } = createSignal();
                    const { data, error } = await addCourses({ courseName: values?.courseName }, signal)
                    if (!error) {
                        toast.success(data.message)
                        resetForm()
                        const { signal } = createSignal();
                        dispatch('SET_COURSES', (await getCourses(signal)).data);
                    } else {
                        toast.error(data.message);
                    }
                }
            }
        },
    });

    const handleCourseChange = (course: string) => {
        const crs: CoursesInterface | undefined = state.courses.find((val: CoursesInterface) => val.value === course);
        if (crs) {
            setValues({ course, courseName: crs.name });
        }
    }

    const onDelete = async (id: any) => {
        if (!id) {
            toast.warning("Please select a course");
            return
        } else {
            const { signal } = createSignal();
            const { data, error } = await deleteCourses(id, signal)
            if (!error) {
                toast.success(data.message)
                const { signal } = createSignal();
                dispatch('SET_COURSES', (await getCourses(signal)).data);
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
                    <span style={{ fontSize: 30, textDecoration: 'underline' }}>Course</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Grid item xl={3} md={3} sm={6} xs={6}>
                            <FormControl fullWidth variant="standard">
                                <TextField name="courseName" label="Course Name" value={values?.courseName} onChange={handleChange} variant="filled" size='small' />
                                <FormHelperText className={touched?.courseName && errors?.courseName ? 'text-danger' : ''}>{touched?.courseName && errors?.courseName}</FormHelperText>
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
                body={state.courses}
                excludedBody={excludedBody}
                onDelete={(id: number | string) =>
                    setModalData({ open: true, data: id })
                }
                handleEdit={handleCourseChange}
            />
        </>
    )
}
