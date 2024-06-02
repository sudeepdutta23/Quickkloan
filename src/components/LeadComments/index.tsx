import { Button, Card, CardActions, CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getLeadComments, setLeadComments } from '../../services/Individual'
import { LeadCommentsModal } from '../Modal/LeadCommentsModal'
import { TextInput } from '../UI'
import { createSignal } from '../../utils'

export const LeadComments = ({ leadId }: any) => {
    const [comments, setLeadComment] = useState('')
    const [leadCommentsData, setCommentsData] = useState<any>([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        (async () => {
            await fetchLeadComments();
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchLeadComments = async () => {
        const { signal } = createSignal();
        const { data, error } = await getLeadComments({ leadId }, signal)
        if (!error) {
            setCommentsData(data)
        }
    }

    const putLeadComments = async () => {
        if (comments) {
            const { signal } = createSignal();
            const { data, error } = await setLeadComments({ leadId, comments }, signal)
            if (!error) {
                toast.success(data?.message)
                await fetchLeadComments();
                setLeadComment('')
            }
        } else {
            toast.warning("Comments cannot be empty")
        }
    }

    return (
        <div className='d-flex justify-content-center mt-6'>
            <Card className='comment-section my-4 shadow'>
                <CardContent>
                    <TextInput
                        label="Lead Comments"
                        multiline
                        fullWidth
                        minRows={2}
                        value={comments}
                        onChange={(e) => setLeadComment(e.target.value)}
                    />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button className='mx-1' variant='contained' onClick={putLeadComments}>Add</Button>
                    <Button className='mx-1' variant='text' onClick={() => setLeadComment('')}>Cancel</Button>
                    <Button className='mx-1' variant='outlined' onClick={() => setShow(true)}>Show</Button>
                </CardActions>
            </Card>
            <LeadCommentsModal show={show} setShow={setShow} data={leadCommentsData} />
        </div>
    )
}
