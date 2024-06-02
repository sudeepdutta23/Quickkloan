import React from 'react'
import { Step4 } from '../MainApplicationForm/StepChild'
import LeadDetails  from '../Admin/LeadDetails'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { decryptData } from '../../utils'

const CompleteForm = () => {
    const params = useParams();
    let data = decryptData(params.data).split('/')
    const stepData = {
        leadId: data[0],
        stageId: data[1],
        stageName: data[2],
        statusName: data[3],
    }
    return (
        <div className='mt-5'>
            <Container sx={{ mb: 5 }}>
                <Step4 values={stepData} />
            </Container>
            <LeadDetails leadId={data[0]} isAdmin={false} />
        </div>
    )
}

export default CompleteForm;
