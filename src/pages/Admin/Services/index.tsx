import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { STYLES } from '../../../config';
import { deleteServices, getServices } from '../../../services/LoanServices';
import { getLoanType } from '../../../services/Master';
import CreateUpdateService from './CreateUpdateService';
import ServiceList from './ServiceList';
import "./style.css";
import { createSignal } from '../../../utils';
import { PopUp } from '../../../components';

export const initialValue = { id: '', loanType: '', desc: '', icon: {}, percentStart: '', percentEnd: '' }
const Services = () => {
    const [showAddUpdate, setAddUpdate] = useState(false);
    const [editedBlog, setEdit] = useState(initialValue);
    const [services, setServices] = useState<any>([]);
    const [loanTypes, setLoanTypes] = useState<any>([]);
    const [editingImage, setEditImage] = useState('');
    const [modalData, setModalData] = useState<{
        open: boolean;
        data: number | string | null;
      }>({ open: false, data: null });

    const getAllServices = async (init: boolean) => {
        if ((!init) || (init && services.length === 0)) {
            const { signal } = createSignal();
            const service = await getServices(signal);
            if (!service?.error) setServices(service.data)
        }
    }

    const getLoanTypes = async () => {
        const { signal } = createSignal();
        const { error, data } = await getLoanType(signal);
        if (!error) {
            setLoanTypes(data)
        }
    }

    useEffect(() => {
        getAllServices(true);
        getLoanTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleShow = () => {
        if (showAddUpdate) setEdit(initialValue)
        setAddUpdate(!showAddUpdate);
    }

    const handleServiceEdit = (service: any) => {

        let serviceObj = { id: service.id, loanType: service.loanType, desc: service.desc, icon: '', percentStart: service.percentStart, percentEnd: service.percentEnd }
        setEdit(serviceObj)
        setEditImage(service.icon)
        toggleShow()
    }

    const handleServiceDelete = async (blog: any) => {
        const { signal } = createSignal();
        const { data, error } = await deleteServices(blog?.id, signal)
        if (!error) {
            toast.success(data.message);
            getAllServices(false);
        } else {
            toast.error(data.message);
        }
        setModalData({ ...modalData, open: false })
    }

    return (
        <div>
            <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', mx: 2, p: 2 }}>
                <Typography component='div' sx={{ fontSize: 30, fontWeight: 600 }}>
                    Services
                </Typography>
                {!showAddUpdate ? <Button variant='contained' style={STYLES.button} onClick={toggleShow}>Add Services</Button> :
                    <Button variant='outlined' style={STYLES.outlinedBtn} onClick={toggleShow}>Back</Button>}
            </Box>
            {!showAddUpdate ? <ServiceList services={services} handleServiceEdit={handleServiceEdit} handleServiceDelete={(id: number | string) =>
                setModalData({ open: true, data: id })
            } /> :
                <CreateUpdateService editedBlog={editedBlog} loanTypes={loanTypes} getAllServices={getAllServices} editingImage={editingImage} toggleShow={toggleShow} setEdit={setEdit} />}
            <PopUp
                open={modalData.open}
                toggleModal={() => setModalData({ ...modalData, open: false })}
                modalType="warning"
                title="Delete"
                content={`Are you sure you want to delete?`}
                okText="Yes"
                onOk={() => handleServiceDelete(modalData.data)}
            />
        </div>
    )
}

export default Services
