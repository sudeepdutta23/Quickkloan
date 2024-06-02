import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { CONFIG, STYLES } from "../../config";
import { SectionHeader } from "../SectionHeader";
import "./style.css";

import { RESPONSIVE } from "../../config";
import { ServiceType } from "../../store";
import { ButtonGroup } from '..'



export const LoanOffers = ({ services } : { services: ServiceType[] }) => {
  
  const navigate = useNavigate();

  return (services && services.length > 0 ?
    <section className="py-lg-16 py-10" id="services">
      <Container>
      <SectionHeader title="Our Services"/>  
        <Carousel
          responsive={RESPONSIVE}
          arrows={false}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
        >
          {services.map((item: any) => {
            return (
              <Card style={container} sx={{ height: '20rem', m: 2 }} key={item?.id}>
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item?.icon}
                    title="green iguana"
                    alt={CONFIG.alt}
                    component="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {item?.name.length <= 64 ? item?.name : `${item?.name.slice(0,60)}...`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.desc.length <= 38 ? item?.desc: `${item?.desc.slice(0,38)}...`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions style={fixedElement}>
                  <Button sx={{  color: STYLES.primaryColor, border: `1px solid${STYLES.primaryColor}`, ':hover': { border: `1px solid${STYLES.primaryColor}` } }} size="small"
                    onClick={() => navigate(`services/${item?.id}`)
                    }>Read More</Button>
                </CardActions>
              </Card>
            );
          })}
        </Carousel>
      </Container>
    </section> :
    null
  );
};

const container: React.CSSProperties = {
  position: 'relative'
}

const fixedElement: React.CSSProperties = {
  position: "fixed",
    bottom: '7%',
    left: '6.5%',
    width: "100%"
}
