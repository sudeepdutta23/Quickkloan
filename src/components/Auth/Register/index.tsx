import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useContext, useEffect } from 'react';
import { Button, TextInput } from '../../UI';
import Select from '../../UI/TextInput/Select';

import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from '..';
import { CustomFormik } from '../..';
import { signUp } from '../../../services/Auth';
import { registerSchecma } from '../AuthValidationSchema';
 
import { SALUATATIONS, STYLES } from '../../../config';
import { createSignal } from '../../../utils';

const Register = () => {
    const location = useLocation();
    const isAdmin = location.pathname.includes('/admin');
    const initialValues = { salutation: '', firstName: '', middleName: '', lastName: '', mobileNo: '', emailId: '' }
    const { setAuth, setTitle, setUser }:any = useContext(AuthContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{ setTitle(isAdmin ? 'Create Lead' : 'Registration') },[]);

    const register = async (values: any) => {
        const { signal} = createSignal();
        const { data, error } = await signUp(values, signal);
        toast[!error ? 'success': 'error'](data?.message);
        if(!error){
            setAuth('otp'); 
            setUser(values?.emailId);
        }
      };


    const RegisterForm = () =>{
        const { handleChange, values, touched, errors, handleSubmit }: any = useFormikContext();

        const handleSelectChange = (event: any) =>{
            const e = {
                target: {
                    name: 'salutation',
                    value: event.target.value
                }
            }
            handleChange(e);
        }
        return(
            <>
            <Select
                autoFocus={true}
                name="salutation"
                label="Salutation"
                variant="outlined"
                value={values?.salutation}
                options={SALUATATIONS}
                onChange={handleSelectChange}
                style={{ marginBottom: '16px' }}
            />

            <TextInput
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.firstName}
                error={touched?.firstName && errors?.firstName ? true : false}
                helperText={touched?.firstName && errors?.firstName}
            />

            <TextInput
                name="middleName"
                label="Middle Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.middleName}
                error={touched?.middleName && errors?.middleName ? true : false}
                helperText={touched?.middleName && errors?.middleName}
            />

            <TextInput
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.lastName}
                error={touched?.lastName && errors?.lastName ? true : false}
                helperText={touched?.lastName && errors?.lastName}
            />

            <TextInput
                name="mobileNo"
                label="Mobile Number"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.mobileNo}
                error={touched?.mobileNo && errors?.mobileNo ? true : false}
                helperText={touched?.mobileNo && errors?.mobileNo}
            />

            <TextInput
                name="emailId"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.emailId}
                error={touched?.emailId && errors?.emailId ? true : false}
                helperText={touched?.emailId && errors?.emailId}
            />
            <Typography component="div" sx={{ textAlign: "center", py: 2 }}>
                <Button style={{ backgroundColor: STYLES.primaryBackground }} size='medium' onClick={handleSubmit}>
                    {!isAdmin ? 'Register' : 'Create'}
                </Button>
            </Typography>
            {!isAdmin &&<Typography onClick={()=>setAuth('login')} className="mt-3 pointer" style={{ cursor: "pointer", color: STYLES.primaryColor, textAlign: 'center' }}>
                Existing User? Log in
            </Typography>}
        </>
        )
    }

    return (
        <CustomFormik initialValues={initialValues} validationSchema={registerSchecma} onSubmit={register} enableReinitialize={true} >
            <RegisterForm />
        </CustomFormik>
    )
}

export default Register;
