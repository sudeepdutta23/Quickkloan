import "./index.css";
import { Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Image, SectionHeader } from "..";
import { CONFIG, STYLES } from "../../config";
import { AboutUsType } from "../../store";

export const AboutUs = ({ about }: { about: AboutUsType }) => {

  const navigate = useNavigate();

  return (
    <section className="py-10" id="about">
      <Container>
        <Typography
        component="div"
        sx={{
          mx: 5,
          display: { md: "none", lg: "none", xl: "none" },
          textAlign: "center",
        }}
      >
        <Image src={CONFIG.images.ABOUT} style={{ width: "100%" }} loading="lazy"/>
      </Typography>
        <SectionHeader title="About Us" />
        <Container maxWidth="xl">
          <Grid item md={12}>
            <div
            className="about-us-div"
            dangerouslySetInnerHTML={{
              __html: about?.about
                ? `${about?.about?.split("</p>").splice(0, 2).join("<p/>")}</p>`
                : "Loading content...",
            }}
          />
          <Typography
            sx={{ color: STYLES.primaryColor, cursor: "pointer" }}
            component="div"
            onClick={() => navigate("aboutUs")}
          >
            Show more...
          </Typography>
        </Grid>
      </Container>
    </Container>
    </section>
  );
};
