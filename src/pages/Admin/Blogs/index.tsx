import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { STYLES } from '../../../config';
import { addUpdateBlogList, deleteBlogListById, getBlogList } from '../../../services/Admin';
import BlogList from './BlogList';
import CreateUpdateBlog from './CreateUpdateBlog';
import "./style.css";
import { createSignal } from '../../../utils';
import { INITIAL_SEARCH_VALUES } from '../../../config/Constants';
import { Button, PopUp } from '../../../components';

const Blogs = () => {
    const [showAddUpdate, setAddUpdate] = useState(false);
    const initialValue: any = { title: '', shortDesc: '', longDesc: '', media: '', hashTags: [], timeToRead: '', blogCategory: '', seoKeywords: '' }
    const [editedBlog] = useState(initialValue);
    const [blogList, setBlogs] = useState<any>('')

    const [modalData, setModalData] = useState<{
        open: boolean;
        data: number | string | null;
      }>({ open: false, data: null });

    const fetchBlogs = async (signal: AbortSignal, param?: string) => {
        const { data, error } = await getBlogList(param ? param : INITIAL_SEARCH_VALUES, signal);
        if (data?.abort) return;
        if (!error) setBlogs(data)
    }

    const addEditBlog = async (blogData: any, resetForm: any) => {
        const formData: any = new FormData();
        Object.keys(blogData).forEach((key: any, i: number) => {
            if (key === "media") {
                for (let i = 0; i < blogData?.[key]?.length; i++) {
                    formData.append('media[]', blogData?.[key]?.[i]);
                }
            } else if (key === "hashTags" || key === "seoKeywords") {
                formData.append(key, `[${blogData[key]}]`);
            }
            else {
                formData.append(key, blogData[key])
            }
        });
        const { signal } = createSignal();
        const { data, error } = await addUpdateBlogList(formData, signal);
        if (data?.abort) return;
        toast[!error ? 'success' : 'error'](data.message)
        if (!error) {
            resetForm();
            fetchBlogs(signal);
            toggleShow();
        }
    }

    useEffect(() => {
        const { controller, signal } = createSignal();
        fetchBlogs(signal);
        return () => controller.abort();
    }, [])

    const toggleShow = () => setAddUpdate(!showAddUpdate);

    // const handleBlogEdit = (blog: any) => {
    //     let blogObj = { title: blog.title, shortDesc: blog.shortDesc, longDesc: blog.longDesc, media: '', hashTags: [], timeToRead: '', blogCategory: '', seoKeywords: '', isVideo: blog.isVideo }
    //     setEdit(blogObj)
    //     toggleShow()
    // }

    const handleBlogDelete = async (blogId: any) => {
        const { signal } = createSignal();
        const { data, error } = await deleteBlogListById(blogId, signal);
        toast[!error ? 'success' : 'error'](data.message);
        if (!error) setBlogs({ ...blogList, data: [...blogList.data.filter((blog: any) => blog.id != blogId)] })
        setModalData({ ...modalData, open: false })
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: any) => {
        const { signal } = createSignal();
        fetchBlogs(signal, value.split('?')[1])
    };

    return (
        <div>
            <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', mx: 2, p: 2 }}>
                <Typography component='div' sx={{ fontSize: 30, fontWeight: 600 }}>
                    Blogs
                </Typography>
                {!showAddUpdate ? <Button variant='contained' style={STYLES.button} onClick={toggleShow}>Add Blog</Button> :
                    <Button variant='outlined' style={STYLES.outlinedBtn} onClick={toggleShow}>Back</Button>}
            </Box>
            {!showAddUpdate ? <BlogList blogList={blogList} handleChange={handleChange} handleBlogDelete={(id: number | string) =>
                setModalData({ open: true, data: id })
            } /> :
                <CreateUpdateBlog editedBlog={editedBlog} addEditBlog={addEditBlog} />}
            <PopUp
                open={modalData.open}
                toggleModal={() => setModalData({ ...modalData, open: false })}
                modalType="warning"
                title="Delete"
                content={`Are you sure you want to delete?`}
                okText="Yes"
                onOk={() => handleBlogDelete(modalData.data)}
            />
        </div>
    )
}

export default Blogs
