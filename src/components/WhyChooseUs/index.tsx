import "./style.css";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { SectionHeader } from "../SectionHeader";
import StyledIcon from "../StyledIcon";
import { STYLES } from "../../config";

export const WhyChooseUs = () => {

  const styles = {
    color: STYLES.primaryColor,
    fontSize: 50
  }

  const chooseUs = [
    {
      icon: (
        <StyledIcon icon={FindInPageIcon} style={styles} />
      ),
      description: "Minimum documents required for loan",
    },
    {
      icon: <StyledIcon icon={CurrencyExchangeIcon} style={styles} />,
      description: "Consider agriculture / cash income",
    },
    {
      icon: <StyledIcon icon={CalendarMonthIcon} style={styles} />,
      description: "Loan approved in 3-4 working days",
    },
    {
      icon: <StyledIcon icon={WatchLaterIcon} style={styles} />,
      description: "Loan disbursed in limited period ",
    },
  ];

  return (
    <section className="py-lg-16 py-10 bg-offer-carousel" id="whyUs">
      <Container>
        <SectionHeader title="Easy and fast application approval."/>  
        <Grid container spacing={2}>
          {chooseUs.map((item, i) => {
            return (
              <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={i}>
                <Card
                  className="smooth-shadow-sm border0 mx-3 text-center text-justify"
                  style={{ height: "14rem" }}
                  key={i}
                >
                  <CardContent sx={{ px: { xs: 0.65, sm: 3, md: 4, lg: 4, sx: 4  }, py: 6 }}>
                    <div className="mb-4">{item.icon}</div>
                    <Typography className="mb-4" component="p" sx={{ wordWrap: 'break-word' }}>
                     {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};
