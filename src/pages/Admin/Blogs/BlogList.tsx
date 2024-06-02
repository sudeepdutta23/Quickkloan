import React from 'react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paginate } from '../../../components';

const BlogList = ({ handleChange, blogList, handleBlogDelete }: any) => {
    const tableHeader = ["Title", "Short Description", "Reading time (in mins)", "Hash Tags", "Seo Keywords", "Actions"]

    return (
        <Box sx={{ bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', mx: 2, p: 2, mt: 2 }}>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
                Blog Lists
            </Typography>
            <TableContainer style={{ maxHeight: 500 }}>
                <Table sx={{ minWidth: 950 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHeader.map(header => <TableCell key={header} className="text-center">{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogList?.data && blogList?.data?.map((blog: any, index: number) => {
                            return <TableRow
                                key={blog?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className="text-center">{blog.title}</TableCell>
                                <TableCell className="text-center">{blog.shortDesc}</TableCell>
                                <TableCell className="text-center">{blog.timeToRead}</TableCell>
                                <TableCell className="text-center">{blog.hashTags.join(', ')}</TableCell>
                                <TableCell className="text-center">{blog.seoKeywords.join(', ')}</TableCell>
                                <TableCell className="text-center">
                                    <Button onClick={()=>handleBlogDelete(blog?.id)} variant="outlined" size='small' startIcon={<DeleteForeverIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {blogList?.data ? <Paginate links={blogList?.links} path={blogList?.path} handleChange={handleChange} /> : null}
        </Box>
    )
}

export default BlogList
