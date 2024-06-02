import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Grid } from '@mui/material'
import Select from '../../../components/UI/TextInput/Select'
import { Image } from '../../../components'

export const SmallUserCard = ({ data, leadStatuses, updateLeadStatus, updateLeadStep }: any) => {
    const [currentStatus, setStatus] = useState("")
    const [currentStep, setStep] = useState("")
    const stepOptions = [
        { name: "One", value: "1" },
        { name: "Two", value: "2" },
        { name: "Three", value: "3" }]
    useEffect(() => {
        if (data && data?.leadStatus) {
            setStatus(data?.leadStatus)
        }
        if (data && data?.step) {
            setStep(data?.step)
        }
    }, [data])
    return (
        <div className=''>
            <Card style={{ backgroundColor: "#e5e5e5" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={4}>
                            <div className='d-flex justify-content-center' style={{ marginBottom: "20px" }}>
                                <Image src={`${process.env.REACT_APP_ADMIN_AVATAR}`} className='avatarSmallUserCard' style={{ marginTop: '25px', width : '100%' }} />
                            </div>
                        </Grid>
                        <Grid item sm={12} md={8} className='d-flex align-items-center'>
                            <Grid container spacing={1}>
                                <Grid md={4} item className='cardText fw-bold'>
                                    Name:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.salutation} {data?.name}
                                </Grid>
                                <Grid md={4} item className='cardText fw-bold'>
                                    LeadId:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.leadId}
                                </Grid>
                                <Grid md={4} item className='cardText fw-bold'>
                                    Loan Type:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.loanType}
                                </Grid>
                                {data?.loanTypeId == 1 && <Grid md={4} item className='cardText fw-bold'>
                                    Course Country:-
                                </Grid>}
                                {data?.loanTypeId == 1 && <Grid md={8} item className='cardText'>
                                    {data?.courseCountry || 'N/A'}
                                </Grid>}
                                <Grid md={4} item className='cardText fw-bold'>
                                    Mobile No:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.mobileNo}
                                </Grid>
                                <Grid md={4} item className='cardText fw-bold'>
                                    Email Id:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.emailId}
                                </Grid>
                                <Grid md={4} item className='cardText fw-bold'>
                                    Loan Amount:-
                                </Grid>
                                <Grid md={8} item className='cardText'>
                                    {data?.loanAmount || 'N/A'}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={5}>
                            <Grid container spacing={2}>
                                <Grid item md={8}>
                                    <Select size='small' name='updateLeadStatus' fullWidth={true} options={leadStatuses} label='Update Lead Status' value={currentStatus} onChange={(e: any) => setStatus(e.target.value)} />
                                </Grid>
                                <Grid item md={4}>
                                    <Button disabled={!currentStatus} variant='contained' onClick={() => updateLeadStatus(currentStatus)}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2}></Grid>
                        <Grid item md={5}>
                            <Grid container spacing={2}>
                                <Grid item md={8}>
                                    <Select size='small' name='updateLeadStep' fullWidth={true} options={stepOptions} label='Update Lead Step' value={currentStep} onChange={(e: any) => setStep(e.target.value)} />
                                </Grid>
                                <Grid item md={4}>
                                    <Button disabled={!currentStep} variant='contained' onClick={() => updateLeadStep(data?.leadId, currentStep)}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}
