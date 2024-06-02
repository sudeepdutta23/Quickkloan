import { Container, Grid, Typography } from "@mui/material";
import { PROCESS_DATA, STYLES } from "../../config";
import { usePreLoginState } from "../../hooks";
import "./style.css";
import { Button } from "../UI";
import { SectionHeader } from "../SectionHeader";

export const ApplicationProcess = () => {
  const { dispatch } = usePreLoginState();

  return (
    <section
      className="py-lg-16 py-10 border-bottom border-top"
      id="ourProcess"
    >
      <Container>
        <SectionHeader title="Fast & Easy Application Process" />
        <Grid container spacing={4} sx={{ pt: 4 }}>
          {PROCESS_DATA.map((process, index) => (
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
              <Typography
                component="div"
                className="card text-center mb-6 mt-4"
                sx={{ height: "18vh" }}
              >
                <div
                  className="icon-shape icon-lg bg-white border-2 rounded-circle mx-auto mt-n4"
                  style={{
                    color: STYLES.primaryColor,
                    border: `3px solid ${STYLES.primaryColor}`,
                  }}
                >
                  <span className="fs-3 fw-bold">{index + 1}</span>
                </div>
                <div className="card-body p-3">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                    style={{ textTransform: "capitalize" }}
                  >
                    {process.title}
                  </Typography>
                  <p className="mb-0">{process.description}</p>
                </div>
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
              <Button variant="contained" style={{ backgroundColor: STYLES.primaryBackground }}  onClick={() => dispatch("TOGGLE_AUTH", null)}>Start Today</Button>
            </Grid>
        </Grid>
      </Container>
    </section>
  );
};
