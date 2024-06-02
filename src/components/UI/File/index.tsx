import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Loader } from '../../Loader';
import DoneIcon from '@mui/icons-material/Done';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface FileType{
    name?: string;
    id?: string;
    loading?: boolean;
    showFileUpload?: boolean;
    img?: string;
    onChange?: any;
    disabled?: boolean;
}

export const File: React.FC<FileType> = ({
    name,
    id,
    loading,
    showFileUpload,
    img,
    onChange,
    disabled = false
}) => {
  return (
    <IconButton component="label">
        {(!loading && showFileUpload) && <> {!img ?
            <FileUploadIcon style={{ fontSize: 25, cursor: "pointer" }} /> :
            <DoneIcon style={{ fontSize: 25, cursor: "pointer", color: "green" }} />
          }</>}
          {loading && <Loader />}
    {showFileUpload && <input
      type="file"
      id={id}
      hidden
      onChange={onChange}
      name={name}
      disabled={disabled}
    />}
  </IconButton>
  );
};