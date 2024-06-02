// MUISelect.tsx
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Select as MUISelect, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

interface MUISelectProps {
  label: string;
  variant?: 'filled' | 'outlined' | 'standard';
  value: string;
  options?: { name: string; value: string }[];
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string; 
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  name?: string;
  fullWidth?: boolean;
  size?: 'medium' | 'small';
}

const Select: React.FC<MUISelectProps> = ({
  label,
  variant = 'outlined',
  value,
  options = [],
  onChange,
  disabled = false,
  error = false,
  helperText,
  className,
  style,
  autoFocus,
  name,
  fullWidth,
  size
}) => {
  return (
    <FormControl fullWidth className={className} sx={{ mb: 2 }} style={style} error={error}>
      <InputLabel>{label}</InputLabel>
      <MUISelect
        variant={variant}
        name={name}
        aria-label={`Enter ${label} here`}
        value={value ? value : ''}
        onChange={onChange}
        label={label}
        disabled={disabled}
        // renderValue={(selected) => (selected as string)}
        input={<OutlinedInput label={label} />}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        size={size}
      >
        {options?.length > 0 && options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </MUISelect>
      {helperText && <span style={selectErrorStyle}>{helperText}</span>}
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  name: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['medium','small'])
};

export default Select;

const selectErrorStyle: any = {
  color: '#d32f2f',
  fontWeight: 400,
  fontSize: '0.75rem',
  lineHeight: 1.66,
  letterSpacing: '0.03333em',
  marginTop: '4px',
  marginLeft: '14px',
  textAlign: 'left',
}