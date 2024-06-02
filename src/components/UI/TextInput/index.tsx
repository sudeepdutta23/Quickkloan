import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';

// All Interfaces For Input Types

type TextInputType = TextFieldProps & {
  position?: 'start' | 'end' | null;
  icon?: React.ReactElement;
};


export const TextInput = (props: TextInputType ) => {

  return (
      <TextField
        {...props}
        value={props.value ? props.value : ''}
        aria-label={`Enter ${props?.label} here`}
        style={{...props?.style, marginBottom: 15}}
        autoComplete="off"
        InputProps={props?.position ? {
          [`${props.position}Adornment`]: <InputAdornment position={props.position}>{props?.icon}</InputAdornment>,
        } : {}}
      />
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.element, // You can pass an icon component as a prop
  position: PropTypes.oneOf(['start', 'end']),
  className: PropTypes.string,
  style: PropTypes.object,
}