import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const Datepicker: React.FC<DatePickerProps<Date>> = ({ ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker {...props} />
    </LocalizationProvider> as React.ReactElement<any,any>);
};

export default Datepicker;
