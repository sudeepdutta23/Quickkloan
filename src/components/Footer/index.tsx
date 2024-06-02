import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, useNavigate } from "react-router-dom";
import { CONFIG, STYLES } from "../../config";
import { usePreLoginState } from "../../hooks";
import { navigate, navigateToNewTab } from "../../utils";
import "./style.css";
import { Image } from "../Image";
import StyledIcon from "../StyledIcon";

type LI = {
  name: string;
  icon?: any;
  className: any;
  onClick: () => void;
};

const styles = {
  color: STYLES.primaryColor
}

export const Footer = (): React.ReactElement => {
  const [screenWidth, setWidth] = useState(992);
  const routerNavigate = useNavigate();
  const {
    state: { about },
  }: any = usePreLoginState();
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(window.innerWidth);
    };
    resizeListener();
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const LI = ({ name, icon, className, onClick }: LI) => {
    return (
      <li className={`d-flex ${className}`} onClick={onClick}>
        <span className="fs-3" style={{ color: STYLES.primaryColor }}>
          {icon ? (
            React.createElement(icon, {
              style: { marginRight: 8, color: STYLES.primaryColor },
            })
          ) : (
            <ChevronRightIcon />
          )}
          {name}
        </span>
      </li>
    );
  };

  return (
    <div className="footer bg-dark pt-8 ">
      <Container>
        <Grid container className="mb-8" spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography component={"div"} className="mb-4 mb-lg-0" sx={{
              height: 250,
              display: "flex",
              justifyContent: { md: 'flex-start', sm: 'center', xs: 'center' },
              alignItems: "center",
            }}>
              <Link to="/" style={{ width: '50%', height: '40%' }}>
                <Image src={CONFIG.images.LOGO} style={{ width: '100%' }} />
              </Link>
            </Typography>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: 2,
              }}
            >
              <iframe
                width="100%"
                height="250"
                id="gmap_canvas"
                rel="preconnect"
                src="https://maps.google.com/maps?q=UG+60%2C+Somdutt+chamber%2C+Bhikaji+Cama+place%2C+new+delhi+-+110066&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                title={CONFIG.alt}
                loading="lazy"
              // sandbox="allow-scripts"
              ></iframe>
            </Typography>
          </Grid>
        </Grid>
        <hr className="my-6 opacity-25" />
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="text-white-50 mb-3">
              <div
                className="about-us-div"
                dangerouslySetInnerHTML={{
                  __html: about?.about
                    ? `${about?.about
                      ?.split("</p>")
                      .splice(0, 1)
                      .join("<p/>")}</p>`
                    : "Loading content...",
                }}
              />
              <Grid container spacing={2} className="mt-6">
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <div className="d-flex">
                    <StyledIcon icon={PlaceIcon} style={styles}
                      className="pointer"
                      onClick={() =>
                        window.open(
                          "https://maps.google.com/maps?q=UG+60%2C+Somdutt+chamber%2C+Bhikaji+Cama+place%2C+new+delhi+-+110066&t=&z=13&ie=UTF8&iwloc=&output=embed",
                          "_blank"
                        )
                      }
                    />

                    <div className="ms-3">
                      {CONFIG.officeDetails.OFFICE_ADDRESS}
                    </div>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  {CONFIG.officeDetails.NUMBERS?.map(
                    (item: string, index: number) => (
                      <div className="d-flex" key={index}>
                        <StyledIcon icon={CallIcon} style={styles}
                          className="pointer"
                          onClick={() => navigate("tel:9871773053")}
                        />
                        <div
                          className="ms-3 fs-3 pointer"
                          style={{ color: STYLES.primaryColor }}
                          onClick={() => navigate(`tel:${item}`)}
                        >
                          {item}
                        </div>
                      </div>
                    )
                  )}

                  <div className="d-flex mt-3 pointer">
                    <StyledIcon icon={MailOutlineIcon} style={styles}
                      onClick={() => navigate("mailto:care@quickkloans.com")}
                    />
                    <div
                      className="ms-3 fs-3"
                      style={{ color: STYLES.primaryColor }}
                      onClick={() =>
                        navigate(`mailto:${CONFIG.officeDetails.MAIL}`)
                      }
                    >
                      {CONFIG.officeDetails.MAIL}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                <div className="mb-3">
                  <ul className="list-unstyled text-muted">
                    <LI
                      name="Home"
                      className="linkClass pointer"
                      onClick={() => routerNavigate("/")}
                    />
                    <LI
                      name="About Us"
                      onClick={() => routerNavigate("/aboutUs")}
                      className="linkClass pointer"
                    />
                  </ul>
                </div>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                <div className="mb-3">
                  <ul className="list-unstyled text-muted">
                    <LI
                      name="Facebook"
                      icon={FacebookIcon}
                      onClick={() =>
                        navigateToNewTab(
                          "https://www.facebook.com/profile.php?id=61550364166531"
                        )
                      }
                      className="linkClass pointer"
                    />
                    <LI
                      name="Instagram"
                      icon={InstagramIcon}
                      onClick={() =>
                        navigateToNewTab("https://www.instagram.com/quickkLoans")
                      }
                      className="linkClass pointer"
                    />
                    <LI
                      name="Twitter"
                      icon={TwitterIcon}
                      onClick={() =>
                        navigateToNewTab("https://www.twitter.com/QuickkLoans")
                      }
                      className="linkClass pointer"
                    />
                    <LI
                      name="Linked In"
                      icon={LinkedInIcon}
                      onClick={() =>
                        navigateToNewTab(
                          "https://www.linkedin.com/in/quickk-loans-12856228a"
                        )
                      }
                      className="linkClass pointer"
                    />
                  </ul>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{ py: 2  }} item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Typography className="fs-6 text-muted" component={"div"} sx={{ textAlign: 'center'  }}>
              © Copyright {new Date().getFullYear()} | Quickk Loans Company
            </Typography>
          </Grid>
          <Grid sx={{ py: 2  }} item xl={6} lg={6} md={6} sm={6} xs={12} >
            <Typography component={"p"} className="fs-6 text-muted" sx={{ float: { lg: 'right' }, textAlign: 'center' }}>
              <span className="text-inherit">Developed & Maintained By</span> |{" "}
              <span
                className="pointer"
                style={{ color: STYLES.primaryColor }}
                onClick={() => navigateToNewTab("https://ennovatorz.com/")}
              >
                Team Ennovatorz
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
