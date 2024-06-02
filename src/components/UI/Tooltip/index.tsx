import React from 'react';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Button, Tooltip as MuiTooltip } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener';

export interface TooltipPropsType {
    title: React.ReactNode;
    children: React.ReactElement;
    handleTooltipClose: () => void;
    handleTooltipOpen: () => void;
    open: boolean;
}


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        minWidth: 130,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export const Tooltip = (props: TooltipPropsType) => {
    return (
        <ClickAwayListener onClickAway={props.handleTooltipClose}>
            <span>
                <HtmlTooltip
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    PopperProps={{
                        disablePortal: true
                    }}
                    onClose={props.handleTooltipClose}
                    open={props.open}
                    title={
                        <>
                            {props.title}
                        </>
                    }
                    placement='left'
                >
                    <Button onClick={props.handleTooltipOpen}>{props.children}</Button>
                </HtmlTooltip>
            </span>
        </ClickAwayListener>
    )
}
