import React, { useState } from 'react'
import { Country } from './MasterCard/MasterChild/Country'
import { State } from './MasterCard/MasterChild/State'
import { City } from './MasterCard/MasterChild/City'
import 'react-toastify/dist/ReactToastify.css';
import { Courses } from './MasterCard/MasterChild/Courses'
import { Employment } from './MasterCard/MasterChild/Employment'
import { LoanType } from './MasterCard/MasterChild/LoanType'
import { Testimonials } from './MasterCard/MasterChild/Testimonials'
import { Box, Tab, Tabs, useTheme } from '@mui/material'
import { TabPanel } from './MasterCard/TabUtils';
import { Document } from './MasterCard/MasterChild/Document'
import { Relationship } from './MasterCard/MasterChild/Relationship'
function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Master = () => {
    const tabHeader = ['COUNTRY', 'STATE', 'CITY', 'COURSES', 'EMPLOYMENT', 'LOAN TYPE', 'TESTIMONIALS','Documents', 'Relationship'];

    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const getTabPanel = () => {
        switch (value) {
            case 0:
                return <TabPanel value={value} index={0} dir={theme.direction}><Country /></TabPanel>;
            case 1:
                return <TabPanel value={value} index={1} dir={theme.direction}><State /></TabPanel>;
            case 2:
                return <TabPanel value={value} index={2} dir={theme.direction}><City /></TabPanel>;
            case 3:
                return <TabPanel value={value} index={3} dir={theme.direction}><Courses /></TabPanel>;
            case 4:
                return <TabPanel value={value} index={4} dir={theme.direction}><Employment /></TabPanel>;
            case 5:
                return <TabPanel value={value} index={5} dir={theme.direction}><LoanType /></TabPanel>;
            case 6:
                return <TabPanel value={value} index={6} dir={theme.direction}><Testimonials /></TabPanel>;
            case 7:
                return <TabPanel value={value} index={7} dir={theme.direction}><Document /></TabPanel>;
            case 8:
                return <TabPanel value={value} index={8} dir={theme.direction}><Relationship /></TabPanel>;
        }
    }

    return (
        <div>
                <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: "center", mx:3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        aria-label="visible arrows tabs example"
                        scrollButtons
                        // centered
                    >
                        {tabHeader.map((header, index) => <Tab key={header} label={header} {...a11yProps(index)} />)}
                    </Tabs>
                </Box>
            {getTabPanel()}
        </div>
    )
  
}

export default  Master;
