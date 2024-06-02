import "./styles.css";
import { useNavigate } from "react-router-dom";

import { CarouselDataType } from "../../store";
import { usePreLoginState } from "../../hooks";
import { Button } from "../UI";
// import CusCarousel from "react-multi-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CusCarousel } from "react-responsive-carousel";
import { Typography } from "@mui/material";
import { CONFIG } from "../../config";

export const Carousel = ({
  carouselData,
}: {
  carouselData: CarouselDataType[];
}) => {
  const { dispatch } = usePreLoginState();

  const navigate = useNavigate();

  return carouselData && carouselData.length !== 0 ? (
    <CusCarousel showIndicators={false} autoPlay showThumbs={false}>
      {carouselData.map((item: CarouselDataType) => (
        <div key={item.id} className="carouselContainer">
          <img
            loading="lazy"
            onClick={() => navigate(`/services/${item.id}`)}
            width="100%"
            height="100%"
            className="d-block w-100 home-carousel-image"
            src={item.image}
            alt={CONFIG.alt}
          />
          <div className="applyBtn">
            <Typography
              component="p"
              sx={{ mb: 2, fontSize: 35, color: "white" }}
            >
              {item.text}
            </Typography>
            <Button
              size="medium"
              sx={{
                border: "3px solid white",
                color: "white",
                fontSize: { md: 22 },
                fontWeight: 600,
                p: { md: 1, lg: 1, xl: 1 },
                px: { md: 2, lg: 2, xl: 2 },
              }}
              style={{ backgroundColor: "transparent" }}
              onClick={(e: any) => {
                dispatch("TOGGLE_AUTH", null);
                e.stopPropagation();
              }}
            >
              APPLY NOW
            </Button>
          </div>
        </div>
      ))}
    </CusCarousel>
  ) : (
    <div className="loadingBanner carouselContClass">Loading banner images</div>
  );
};
