import { Box, Divider, Grid, Typography } from '@mui/material'
import moment from 'moment'
import { Modal } from '../UI/Modal'


export const LeadCommentsModal = ({ show, setShow, data }: any) => {

  return (
    <Modal
      title="Lead Comments"
      open={show}
      toggleModal={() => setShow(false)}
    >
      {data  && data.length > 0? data.map((comment: any, index: number) => (
        <Box key={index}>
          <Divider />
          <Grid container spacing={2} padding={2}>
            <Grid md={12} item>
              <Typography variant='h6'>
                <b><u>Comment</u></b>
              </Typography>
            </Grid>
            <Grid md={12} item>
              {comment?.comment}
            </Grid>
            <Grid md={6} item>
              <Typography variant='h6'>
                <b><u>Commented On</u></b>
              </Typography>
            </Grid>
            <Grid md={6} item>
              <Typography variant='h6'>
                <b><u>Commented By</u></b>
              </Typography>
            </Grid>
            <Grid md={6} item>
              {moment(comment?.commentedOn).format("YYYY-MM-DD hh:mm:ss a")}
            </Grid>
            <Grid md={6} item>
              {comment?.commentedBy}
            </Grid>
          </Grid>
          <Divider />
        </Box>
      )) : <Typography variant='h6'>
        No Comments Found
      </Typography>}
    </Modal>
  )
}
