import { Grid, Typography } from "@mui/material";
import { H1 } from "..";

export const SectionHeader = ({ title } : { title : string }) => (
  <Grid container>
    <Grid item xl={12} md={12} sm={12} xs={12}>
      <Typography component="div" className="mb-10 text-center ">
        <H1 text={title} />
      </Typography>
    </Grid>
  </Grid>
);