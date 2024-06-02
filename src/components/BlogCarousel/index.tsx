import { Button, Card, CardActionArea, CardActions, CardContent, Container, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router";
import { STYLES } from "../../config";
import { SectionHeader } from "../SectionHeader";

import { RESPONSIVE } from "../../config";
import { Image } from "../Image";
import { ButtonGroup } from '..'

export const BlogCarousel = ({ blogData } : { blogData : any }) => { 
    const navigate = useNavigate();
  
    return (blogData && blogData.length > 0 ?
      <section className="py-lg-16 py-10" id="services">
        <Container>
        <SectionHeader title="QuickkLoans's Blogs" />
          <Carousel
            responsive={RESPONSIVE}
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
            // infinite={true}
          >
            {blogData.length > 0 && blogData.map((item: any) => {
              return (
                <Card style={container} sx={{ height: '20rem', m: 2 }} key={item?.id}>
                  <CardActionArea>
                    <Image src={item?.media?.[0]?.media} style={{ height: 140, width: '100%' }} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {item.title.length <= 20 ? item.title : `${item?.title.slice(0,25)}...`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.shortDesc.length <= 38 ? item?.shortDesc: `${item?.shortDesc.slice(0,38)}...`}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  <CardActions style={fixedElement}>
                    <Button sx={{  color: STYLES.primaryColor, border: `1px solid${STYLES.primaryColor}`, ':hover': { border: `1px solid${STYLES.primaryColor}` } }} size="small" 
                      onClick={() =>navigate(`blogs/${item?.id}`)
                    }>Read More</Button>
                  </CardActions>
                </Card>
              );
            })}
          </Carousel>
        <Typography component="div" sx={{ display: 'flex', justifyContent: 'flex-end', color: STYLES.primaryColor, cursor: 'pointer' }} onClick={()=> navigate('/blogs')}>
            Show more...
        </Typography>
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