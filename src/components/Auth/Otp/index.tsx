import { CircularProgress, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '..';
import { CustomFormik } from '../..';
import { CONFIG, STYLES } from '../../../config';
import { usePreLoginState } from '../../../hooks';
import { login, verifyOtp } from '../../../services/Auth';
import { Button } from '../../UI';
import OTPInput from '../../UI/TextInput/OTPInput';
import { otpSchema } from '../AuthValidationSchema';
import { createSignal } from '../../../utils';
 
const OTP = () => {
  const location = useLocation();
    const initialValues = { otp: '' };
    const { setTitle, user, setAuth }:any = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const { dispatch  } = usePreLoginState();
    
    const verifyotp = async (values: any) => {
      setLoading(true);
      const { signal} = createSignal();
        const { error, data } = await verifyOtp({
            userName: user,
            otp: values?.otp,
          }, signal);
          setLoading(false)
        if (!error) {
          toast.success(data.message);
          dispatch('TOGGLE_AUTH', false);
          const isAdmin = location.pathname.includes('/admin');
          setAuth(!isAdmin ? 'login' : 'registration');
          setTitle(isAdmin ? 'Login': 'Create Lead')
          if(!isAdmin){
            localStorage.setItem("quikk-token", data.token);
            localStorage.setItem("user", data?.name ? data?.name : "Name");
            localStorage.setItem("xtpt", data?.id);
          }
          if(isAdmin){
            navigate(`leads/${data?.leadId}`)
          }else if(location?.state){
            const path = window.location.origin
            window.location.href = `${path}/#/uploadDocuments/${location?.state}`
            // navigate(`/uploadDocuments/${location?.state}`);
          }else{
            navigate(`/dashboard/home`)
          }
          // navigate(isAdmin ? `leads/${data?.leadId}` : openModal ? `/uploadDocuments/${locationArray[locationArray.length-1]}` : `/dashboard/home` );
        } else {
          toast.error(data.message);
        }
      };

    const OTPForm = () =>{
        const { values, handleSubmit, handleChange, touched, errors }: any = useFormikContext();

        const [timer, setTimer] = useState("OO:30");
        const [activeTimer, setActiveTimer] = useState(true);
        const [intrval, setIntrval] = useState<any>(null);

        const timerCAll = () => {
          setActiveTimer(true);
          let timer = 30;
          let interval = setInterval(() => {
            timer--;
            let newTimer =
              timer.toString().length === 1
                ? `0${timer.toString()}`
                : timer.toString();
            setTimer("00:" + newTimer);
            if (timer === 0) {
              clearInterval(interval);
              setTimer("00:00");
              setActiveTimer(false);
            }
          }, 1000);
          if (interval) setIntrval(interval);
        };

        
      const resendOTP = async () => {
        timerCAll();
        const { controller, signal} = createSignal();
        const { data, error } = await login({ userName: user }, signal)
        toast[!error ? 'success': 'error'](data?.message);
      };
    
      useEffect(()=>{ 
        setTitle('OTP'); timerCAll();
        return () => clearInterval(intrval)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

        const handleInputChange = (value: any) =>{
            const e = {
                target: {
                    name: 'otp',
                    value: value
                }
            }
            handleChange(e);
        }
        return(
            <Typography component="div"  sx={{ minHeight: '11rem' }}>
            <OTPInput name="otp" value={values?.otp} onChange={handleInputChange} length={CONFIG?.otpLength} style={otpContainerStyle} helperText={touched?.otp && errors?.otp} autoFocus />
            {activeTimer && <div className="text-center mt-2" style={{ padding: 3}}>{timer}</div>}
            <Typography component="div" sx={{ textAlign: 'center', py: 2 }}>
                <Button disabled={activeTimer} onClick={resendOTP} size='medium' style={{ backgroundColor: STYLES.primaryBackground }}>
                    Resend OTP
                </Button> &nbsp;
                <Button size='medium' disabled={values?.otp?.length !== CONFIG.otpLength} startIcon={loading && <CircularProgress size={20} color="inherit" />} style={{ backgroundColor: STYLES.primaryBackground }} onClick={handleSubmit}>
                    Verify OTP
                </Button>
            </Typography>
        </Typography>
        )
    }


    return (
        <CustomFormik initialValues={initialValues} validationSchema={otpSchema} onSubmit={verifyotp} enableReinitialize={true} >
            <OTPForm />
        </CustomFormik>
    )
}

const otpContainerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 } 

export default OTP