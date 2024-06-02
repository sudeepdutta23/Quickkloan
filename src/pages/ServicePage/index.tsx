import "./style.css";
import {
  Breadcrumbs,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import { Button, Footer, Header } from "../../components";
import { STYLES } from "../../config";
import { usePreLoginState } from "../../hooks";
import { getServiceById } from "../../services";
import { createSignal, copyToClipBoard, shareInWhatsapp } from "../../utils";
import { Image, SectionHeader } from "../../components";

export const ServicePage = () => {
  const { state : { service }, dispatch } = usePreLoginState();
  const navigate = useNavigate();
  const params = useParams();
  const [scrollY, setScrollY] = useState(0);

  const containerRef: any = useRef(null);

  const toggleSignup = () => dispatch("TOGGLE_AUTH", null);

  const [width, setWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    const handleResize = () => {
      // Show the button when the user scrolls beyond a certain point
      setWidth(document.documentElement.clientWidth);
    };

    // Add an event listener for the scroll event
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const breadcrumbs = (name: string) => [
    <div className="pointer" onClick={() => navigate("/")}>
      Home
    </div>,
    <div>{name}</div>,
  ];

  const handleScroll = () => {
    if (containerRef.current.getBoundingClientRect().bottom > 600) {
      if (width > width) {
        setScrollY(window.scrollY);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getServiceById(params.id, signal);
      if(data?.abort) return;
      if (!error) dispatch("SET_SINGLE_SERVICE", data);
    })();

    document.addEventListener("scroll", handleScroll);

    return () => {
      controller.abort();
      document.removeEventListener("scroll", handleScroll);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const imageStyle = {
    transform: `translateY(${scrollY}px)`,
    // transition: 'transform 0.3s ease-in-out',
    maxWidth: "100%",
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {service ? (
          <Grid sx={{ py: 16 }} container spacing={4}>
            <Grid item md={12}>
              <Breadcrumbs sx={{ mb: 5 }} separator="›" aria-label="breadcrumb">
                {breadcrumbs(`${service.name}`)}
              </Breadcrumbs>
            </Grid>
            <Grid ref={containerRef} item md={6}>
              <div style={imageStyle}>
                <Image src={`${service?.icon}`} style={{ width: '100%' }}/>
                <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
                  <ContentCopyIcon
                    onClick={() => copyToClipBoard(window.location.href)}
                    className="pointer"
                    style={{ margin: 6 }}
                  />
                  <WhatsAppIcon
                    onClick={() => shareInWhatsapp(window.location.href)}
                    className="pointer"
                    style={{ margin: 6 }}
                  />
                  {/* <FaLinkedin color='#0a66c2' size={30} style={{ margin: 6 }} /> */}
                </div>
                <div style={{ marginTop: 10, textAlign: "center" }}>
                  <Button
                    onClick={toggleSignup}
                    variant="contained"
                    sx={{
                      backgroundColor: STYLES.primaryBackground,
                      ":hover": { backgroundColor: STYLES.primaryBackground },
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item md={6}>
              <SectionHeader title={service?.name || ""} />
              <Typography
                sx={{ mt: 2, fontSize: 20, pl: 4 }}
                color="GrayText"
                component="div"
              >
                Interest rates between {service?.percentStart}% -{" "}
                {service?.percentEnd}% (T & C applied)
              </Typography>
              <Typography
                sx={{ textAlign: "justify", textIndent: 30, mt: 2 }}
                component="div"
              >
                {service?.desc}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <div className="loadingBanner">Loading Contents...</div>
        )}
      </Container>
      <Footer />
    </>
  );
};
