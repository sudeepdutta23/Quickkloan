import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import MapIcon from '@mui/icons-material/Map';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CallIcon from '@mui/icons-material/Call';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postMail } from "../../services/About";
import "./style.css";
import { CONFIG, STYLES } from "../../config";
import {
  CONTACT_FIELDS,
  CONTACT_US_FIELDS_INTERFACE,
  CONTACT_US_SCHEMA,
  createSignal,
} from "../../utils";
import { SectionHeader } from "../SectionHeader";
import React from "react";
import StyledIcon from "../StyledIcon";

export const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const styles = {
    color: STYLES.primaryColor,
    fontSize: 50
  }

  const CONTACT = [
    {
      icon:  <StyledIcon icon={MapIcon} style={styles} />,
      title: "Office Address",
      details: (
        <p className="mb-4 fade-black" style={{ fontSize: 12 }}>
          {CONFIG.officeDetails.OFFICE_ADDRESS}
        </p>
      ),
    },
    {
      icon: <StyledIcon icon={EmailIcon} style={styles} />,
      title: "Mail Us",
      details: (
        <a
          style={{ color: STYLES.primaryColor }}
          href={`mailto: ${CONFIG.officeDetails.MAIL}`}
        >
          {CONFIG.officeDetails.MAIL}
        </a>
      ),
    },
    {
      icon: <StyledIcon icon={CallIcon} style={styles} />,
      title: "Call Us",
      details: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {CONFIG.officeDetails.NUMBERS?.map((item: string) => (
            <a
              style={{ color: STYLES.primaryColor }}
              href={`tel: ${item}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </div>
      ),
    },
    {
      icon: <StyledIcon icon={AccessTimeFilledIcon} style={styles} />,
      title: "Our Timing",
      details: (
        <p className="mb-4 fade-black" style={{ fontSize: 12 }}>
          {CONFIG.officeDetails.OFFICE_HOURS}
        </p>
      ),
    },
  ];

  const sendMailToContact = async (data: any) => {
    setLoading(true);
    const { signal } = createSignal();
    const contact = await postMail(data, signal);
    if (!contact.error) {
      toast.success(contact.data.message);
      resetForm();
      setLoading(false);
    } else {
      toast.error(contact.data.message);
      setLoading(false);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors, resetForm } =
    useFormik({
      initialValues: { name: "", email: "", comment: "" },
      validationSchema: CONTACT_US_SCHEMA,
      onSubmit: (values) => sendMailToContact(values),
    });

  return (
    <section className="py-lg-16 py-10 bg-offer-carousel border-top">
      <Container>
      <SectionHeader title="Contact Us" />
        <Grid container spacing={4}>
          {CONTACT.map((item, index) => (
            <Grid key={item.title} item xl={3} lg={3} md={6} sm={12} xs={12}>
              <div
                key={index}
                className="card mb-3 mb-lg-0 text-center smooth-shadow-sm"
              >
                <div className="card-body p-4" style={{ height: "12rem" }}>
                  <div className="mb-2">{item.icon}</div>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.title}
                  </Typography>
                  {item.details}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Container maxWidth="md" className="p-3" sx={{ py: 3 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {CONTACT_FIELDS.map(
                    (item: CONTACT_US_FIELDS_INTERFACE, index: number) => (
                      <React.Fragment key={index}>
                        <Grid
                          item
                          md={4}
                          sm={12}
                          xs={12}
                          sx={{ fontWeight: "bold" }}
                        >
                          {item.label}
                        </Grid>
                        <Grid item md={8} sm={12} xs={12}>
                          <TextField
                            className={item.className}
                            name={item.name}
                            onChange={handleChange}
                            placeholder={item.placeHolder}
                            variant="filled"
                            fullWidth
                            value={values[item.name as keyof typeof values]}
                            error={
                              touched[item.name as keyof typeof touched] &&
                              Boolean(errors[item.name as keyof typeof touched])
                            }
                            helperText={
                              touched[item.name as keyof typeof touched] &&
                              errors[item.name as keyof typeof touched]
                            }
                          />
                        </Grid>
                      </React.Fragment>
                    )
                  )}

                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      sx={{
                        borderColor: STYLES.primaryColor,
                        color: STYLES.primaryColor,
                        ":hover": { borderColor: STYLES.primaryColor },
                      }}
                      type="submit"
                      variant="outlined"
                      size="large"
                      disabled={loading}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </section>
  );
};
