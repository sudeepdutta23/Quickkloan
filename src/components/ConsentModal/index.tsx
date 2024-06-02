import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from '../UI';
import OTPInput from '../UI/TextInput/OTPInput';
import { resendOtp } from '../../services/Auth';
import { CONFIG } from '../../config';
import { createSignal } from '../../utils';

const theme = createTheme({
  palette: {
    secondary: {
      main: grey[100],
    },
  },
});

export const ConsentModal = ({ show, handleOk, handleCancel, currentCosigner, values, verifyCosignerOTP }: any) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState("OO:10");
  const [intrval, setIntrval] = useState<any>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    if (show){
      (async () => {
        const { signal} = createSignal();
        await resendOtp({ individualId: currentCosigner?.id, leadId: values?.leadId }, signal)
      })()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const timerCAll = () => {
    let timer = 10;
    let interval = setInterval(() => {
      timer--;
      let newTimer =
        timer.toString().length === 1
          ? `0${timer.toString()}`
          : timer.toString();
      setTimer("00:" + newTimer);
      if (timer === 0) {
        clearInterval(interval);
        setTimer("00:10");
        setIsOtpSent(false)
      }
    }, 1000);
    if (interval) setIntrval(interval);
  };

  const handleResend = async () => {
    setIsOtpSent(true)
    timerCAll();
    const { signal} = createSignal();
    const { data, error } = await resendOtp({ individualId: currentCosigner?.id, leadId: values?.leadId }, signal)
    if (!error) {
      toast.success(data?.message)
      resetAndCancel()
    } else {
      toast.error(data?.message)
    }
  }

  const verifyOTP = async () => {
    const { data, error } = await verifyCosignerOTP({ userName: currentCosigner?.id, otp: Number(`${otp[0]}${otp[1]}${otp[2]}${otp[3]}`), leadId: values?.leadId })
    if (!error) {
      toast.success(data?.message)
      resetAndCancel()
      handleCancel()
    } else {
      toast.error(data?.message)
    }
  }

  const getVerifyButton = () => {
    if (otp.length === CONFIG.otpLength) return <Button sx={{ mt: 3 }} variant='contained' color='secondary' onClick={verifyOTP}>Verify</Button>
    else return ''
  }

  const resetAndCancel = () => {
    setOtp("")
    clearInterval(intrval)
    setIntrval(null)
    setTimer('00:10')
    setIsOtpSent(false)
  }

  return (
    <Modal
      title={"Consent for Cosigner"}
      open={show}
      toggleModal={() => { resetAndCancel(); handleCancel(); }}
    >
      <div className='text-center'>
        OTP Consent For Cosigner ({`${currentCosigner?.firstName} ${currentCosigner?.lastName}`})
      </div>
      <div className="d-flex justify-content-center mt-4">
        <OTPInput 
          length={CONFIG.otpLength}
          name='otp'
          value={otp}
          onChange={setOtp}
          autoFocus
        />
      </div>
      <ThemeProvider theme={theme}>
        <div className='mt-3 d-flex justify-content-center'>
          <Button variant='contained' onClick={handleResend} sx={{ mt: 3 }} disabled={isOtpSent}>Resend</Button>&nbsp;
          {getVerifyButton()}
        </div>
      </ThemeProvider>
      {isOtpSent && <div className="text-center mt-2">{timer}</div>}
    </Modal>
  )
}
