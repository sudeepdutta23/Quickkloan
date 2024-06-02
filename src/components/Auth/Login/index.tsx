import { CircularProgress, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '..';
import { CustomFormik } from '../..';
import { STYLES } from '../../../config';
import { login } from '../../../services/Auth';
import { Button, TextInput } from '../../UI';
import { loginSchecma } from '../AuthValidationSchema';
import { createSignal } from '../../../utils';

const Login = () => {    
    const initialValues = { userName: '' }
    const { setAuth, setTitle, setUser }:any = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> setTitle('Login'),[]);

    const signin = async (values: any) => {
        setLoading(true);
        const { signal} = createSignal();
        const { data, error } = await login({ userName: values.userName }, signal)
        toast[!error ? 'success': 'error'](data?.message);
        setLoading(false);
        if(!error){
            setAuth('otp'); 
            setUser(values?.userName);
        }
      };

    const LoginForm = () =>{
        const { handleChange, values, touched, errors, handleSubmit }: any = useFormikContext()
        return(
            <>
                <TextInput
                autoFocus
                name="userName"
                label={`User Name (If already registered)`}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                value={values?.userName}
                style={{ marginTop: 20 }}
                error={touched?.userName && errors?.userName ? true : false}
                helperText={touched?.userName && errors?.userName}
            />
            <Typography component="div" sx={{ textAlign: "center", py: 2 }}>
                <Button startIcon={loading && <CircularProgress size={20} color="inherit" />} disabled={loading} size='medium' style={{ backgroundColor: STYLES.primaryBackground }} onClick={handleSubmit} >
                    Send OTP
                </Button>
            </Typography>
            <Typography onClick={()=>setAuth('registration')} className="mt-3 pointer" style={{ cursor: "pointer", color: STYLES.primaryColor, textAlign: 'center' }}>
                New to QuickkLoans? Create an account
            </Typography>
            </>
        )
    }
    return(
        <CustomFormik initialValues={initialValues} validationSchema={loginSchecma} onSubmit={signin} enableReinitialize={true} >
            <LoginForm />
        </CustomFormik>
    )
};

export default Login
