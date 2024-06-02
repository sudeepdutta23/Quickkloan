import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Container, Paper, Badge, styled } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

import { Button, Modal, LeadListingTable } from "../../../../components";
import { getOngoingCompleted } from "../../../../services";
import { createSignal } from "../../../../utils";

const Home = () => {
  const [value, setValue] = useState(0);
  const [OCLeads, setOC] = useState<any>({
    onGoing: [],
    completed: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getOngoingCompleted(signal);
      if(data?.abort) return;
      if (!error) setOC(data);
    })();

    return () => controller.abort();
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -6,
      top: -1,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleApply = async () => navigate("/dashboard/appFlow");

  const showModal = () => setOpen(true);

  const hideModal = () => setOpen(false);

  const tabHeaders = ["onGoing", "completed"];

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const onGoingHasActive = () => {
    let activeStep = false;
    if (OCLeads && OCLeads["onGoing"].length > 0) {
      OCLeads.onGoing.forEach((lead: any) => {
        if (lead.step < 4) activeStep = true;
      });
    }
    activeStep ? showModal() : handleApply();
  };

  return (
    <Container>
      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabHeaders.map((tab, index) => (
              <Tab
                label={
                  <StyledBadge
                    badgeContent={OCLeads[tab].length}
                    color="primary"
                  >
                    {tab}
                  </StyledBadge>
                }
                key={index}
              />
            ))}
          </Tabs>
        </Box>
        {tabHeaders.map((tab, i) => (
          <TabPanel value={value} index={i} key={i}>
            <LeadListingTable
              value={OCLeads?.[tab]}
              handleApply={handleApply}
            />
          </TabPanel>
        ))}
      </Paper>
      <div className="text-center mt-5">
        <Button size="large" variant="contained" onClick={onGoingHasActive}>
          Apply For New Loan
        </Button>
        <Modal
          open={open}
          toggleModal={hideModal}
          title={
            <div className="d-flex justify-content-start align-items-center">
              <InfoIcon style={{ color: "#35b839" }} />
              &nbsp; <div>Confirmation</div>
            </div>
          }
          actions={
            <Button size="small" variant="contained" onClick={handleApply}>
              Confirm
            </Button>
          }
        >
          <div className="mb-2">
            You already have an ongoing loan, Proceed with that loan
          </div>
        </Modal>
      </div>
    </Container>
  );
};


export default Home;