
import React from 'react';
import MUIButton, { ButtonProps } from '@mui/material/Button';
import PropTypes from 'prop-types';


export const Button = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  href,
  ...props
}: ButtonProps) : React.ReactElement => {
  const buttonProps = {
    variant,
    color,
    size,
    disabled
  };

    return (
      <MUIButton component={href ? "a" : 'button'} href={href} {...props} {...buttonProps}>
        {props.children}
      </MUIButton>
    );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};


