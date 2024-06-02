import { Typography } from '@mui/material'
import React from 'react'

export const H1 = ({ text }: { text : string }) => {
    return (
        <Typography component="h1" sx={{ textAlign: 'center', fontSize: { xl: 40, lg: 40, md: 30, sm: 20, xs: 20 }, fontWeight: 600 }}>
            {text}
        </Typography>
    )
}

export const H2 = ({ text }: any) => {
    return (
        <Typography component="h2" sx={{ textAlign: 'center', fontSize: 30, fontWeight: 600 }}>
            {text}
        </Typography>
    )
}