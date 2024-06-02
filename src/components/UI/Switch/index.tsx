import React from 'react';
import {
  FormControlLabel,
  Switch,
  FormControl,
  FormHelperText,
  useTheme,
  Theme,
  createTheme,
  Box,
  ThemeProvider,
  FormControlLabelProps,
} from '@mui/material';

type FormControlLabelPlacement = "top" | "bottom" | "start" | "end";

interface CustomFormControlLabelProps extends Omit<FormControlLabelProps, 'control'> {
  control?: React.ReactNode | any;
  labelPlacement?: FormControlLabelPlacement;
  margin?: 'normal' | 'dense' | 'none';
  helperText?: string;
  themeOverrides?: Partial<Theme>;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
}

export const LabelledSwitch = ({
  value,
  control,
  label,
  onChange,
  labelPlacement,
  margin,
  color,
  helperText,
  themeOverrides,
  ...otherProps
}: CustomFormControlLabelProps) => {
  const theme = useTheme();
  const customTheme = createTheme({
    ...theme,
    ...themeOverrides,
  });

  return (
    <ThemeProvider theme={customTheme}>
      <FormControl margin={margin}>
        {/* <FormLabel>{label}</FormLabel> */}
        <FormControlLabel
          label={label}
          value={value}
          control={<Switch color={color} />}
          labelPlacement={labelPlacement}
          onChange={onChange}
          {...otherProps}
        />
        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
      {/* Additional styling using Box */}
      <Box sx={{ mt: 2 }}>
        {/* Add custom styling or components here */}
      </Box>
    </ThemeProvider>
  );
};