import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const Cards = ({ blog }: any) => {
    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={blog?.image}
                alt='blog-img'
                onError={(e: any) => {
                    e.target.src = '/images/default-image.jpg';
                  }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent className='blog-content'>
                    <Typography component="div" color="text.dark" sx={{ fontWeight: 600, fontSize: '25px' }}>
                    {blog?.title}
                    </Typography>
                    <Typography color="text.secondary" component="div">
                    {blog?.name}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}