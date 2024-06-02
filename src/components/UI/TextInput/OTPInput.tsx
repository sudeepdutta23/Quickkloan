import React, { useRef, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

interface OTPInputProps {
    value: string;
    name: string;
    onChange: (otp: string) => void;
    length: number;
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    helperText?: string;
  }

const OTPInput: React.FC<OTPInputProps> = (props) => {
    const {
        value,
        name,
        onChange,
        length,
        autoFocus = false,
        disabled = false,
        className,
        style,
        helperText
      } = props;
      const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
      const OTP_LENGTH = length;
    
      useEffect(() => {
        if (autoFocus) {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }
      }, [autoFocus]);
    
      const handleInputChange = (index: number, inputValue: string) => {
        if (inputValue.length <= 1) {
          // Allow only one character
          onChange(updateOTPValue(index, inputValue));
          if (inputValue && index < OTP_LENGTH - 1) {
            // Move to the next input box if there is an input
            inputRefs.current[index + 1]?.focus();
          }
        }
      };
    
      const handleBackspace = (index: number, inputValue: string) => {
        if (!inputValue && index > 0) {
          // Move to the previous input box if backspace is pressed and the box is empty
          inputRefs.current[index - 1]?.focus();
        }
      };
    
      const updateOTPValue = (index: number, inputValue: string) => {
        const newOtpValue = value.split('');
        newOtpValue[index] = inputValue;
        return newOtpValue.join('');
      };
    
      return (
        <>
        <div className={className} style={style}>
          {[...Array(OTP_LENGTH)].map((_, index) => (
            <TextField
              key={index}
              name={name}
              inputRef={(el) => (inputRefs.current[index] = el)}
              type="tel"
              variant="outlined"
              size="small"
              value={value[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  handleBackspace(index, value[index]);
                }
              }}
              autoFocus={autoFocus && index === 0}
              disabled={disabled}
              style={{ width: '3em', margin: '0 0.5em' }}
            />
          ))}
        </div>
        {helperText && <span style={otpErrorStyle}>{helperText}</span>}
        </>
      );
}

OTPInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
  };

export default OTPInput;

const otpErrorStyle: any = {
  color: '#d32f2f',
  fontWeight: 400,
  fontSize: '0.75rem',
  lineHeight: 1.66,
  letterSpacing: '0.03333em',
  marginTop: '10px',
  textAlign: 'center',
}

