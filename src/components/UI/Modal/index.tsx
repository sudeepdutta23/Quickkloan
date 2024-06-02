import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";
import PropTypes from 'prop-types';

interface ModalProps{
    actions?: React.ReactNode;
    title: React.ReactNode;
    open: boolean;
    toggleModal?: ()=> void;
    children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { actions, title, open, toggleModal, children } = props;
    return (
        <Dialog
            // fullScreen={fullScreen}
            open={open}
            onClose={toggleModal}
            aria-labelledby="responsive-dialog-title"
            fullWidth={true}
            maxWidth="sm"
        >
            {title && 
            <DialogTitle className='dialogTitle'>
                <Typography component="div">
                    {title}
                </Typography>
                <IconButton onClick={toggleModal}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>}
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            {actions && <DialogActions>
                {actions}
            </DialogActions>}
        </Dialog>
    )
}

Modal.propTypes = {
    actions: PropTypes.element,
    title: PropTypes.element,
    open: PropTypes.bool,
    toggleModal: PropTypes.func,
    children: PropTypes.element
  };
  

