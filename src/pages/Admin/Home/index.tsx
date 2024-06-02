import "./styles.css"
import { Card, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom'
 
const Home = () => {

    const dashboardItem = [
        {
            name: "All Leads",
            value: "all"
        },
        {
            name: "Ongoing Leads",
            value: "ongoing"
        },
        {
            name: "Rejected Leads",
            value: "rejected"
        },
        {
            name: "Disbursed Leads",
            value: "completed"
        },
    ]

    return (
        <div className='mx-4'>
            <Card className='cardBg'>
                <div className='text-center h3'>
                    <b>
                        Welcome To QuickkLoans Admin Panel
                    </b>
                </div>
            </Card>
            <Card style={{ padding: 0 }} className='leadSection mt-2 cardBg'>
                <div className='text-center h3'>
                    Lead Section
                </div>
            </Card>
            <Card className='mt-2' style={{ height: '75vh' }}>
                <Grid container spacing={[26, 26]}>
                    {dashboardItem.map((item, index) => (
                        <Grid item md={12} sm={24} xs={24} key={index}>
                            <NavLink to={`/admin/getAllLeads/${item.value}`} target='_blank'>
                            <Card className='d-flex justify-content-center align-items-center h1 cardBg' style={{ height: '34vh' }}>
                                {item.name}
                            </Card>
                            </NavLink>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </div>
    )
}

export default Home;
