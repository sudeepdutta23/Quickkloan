import "./index.css";
import { useEffect } from "react";
import { CONFIG, STYLES } from "../../config";
import { usePreLoginState } from "../../hooks";
import { Auth, Header, Footer, Button } from "../../components";
import { createSignal } from "../../utils";
import { getAbout } from "../../services";
import { Container, Grid } from "@mui/material";

export const AboutUs = () => {
  const {
    state: { about },
    dispatch,
  } = usePreLoginState();

  const toggleSignup = () => dispatch("TOGGLE_AUTH", null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const { controller, signal } = createSignal();

    (async () => {
      const { data, error } = await getAbout(signal);
      if (data?.abort) return;
      if (!error) dispatch("SET_ABOUT", data);
    })();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <section
        className="pt-18 pb-10"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(0, 0, 0, 0.2) url(${CONFIG.images.ABOUT}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className="bg-white p-5 rounded-top-md">
                <div className="align-items-center">
                  <h1 style={{ textAlign: "center" }} className="mb-0">
                    About Us
                  </h1>
                  <br />
                  <br />
                  <br />
                  <div
                    className="about-us-div"
                    dangerouslySetInnerHTML={{
                      __html: about?.about
                        ? about.about
                        : "Loading content...",
                    }}
                  />
                  <div className="text-center mt-5">
                    <Button style={{
                      ...STYLES.button,
                      backgroundColor: STYLES.primaryColor,
                    }}
                      onClick={toggleSignup}>Apply Now</Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Auth />
      <Footer />
    </>
  );
};
