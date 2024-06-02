import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { Helmet } from "react-helmet-async";
import { Button, Footer, Header, Image, Paginate } from "../../components";
import { STYLES } from "../../config";
import { CONFIG, INITIAL_SEARCH_VALUES } from "../../config/Constants";
import { getBlogList } from "../../services";
import { createSignal } from "../../utils";

export const Blogs = () => {
  const [filter] = useState({...INITIAL_SEARCH_VALUES, pageOffset: 12 });
  const [blogData, setBlogData] = useState<any>(null);

  const handleChange = async (event: any, value: any) => {
    const { signal } = createSignal();
    const { data, error } = await getBlogList(value.split('?')[1], signal);
    if (data?.abort) return;
    if (!error) setBlogData(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const { controller, signal } = createSignal();
    (async () => {
      const { data, error } = await getBlogList(filter, signal);
      if (data?.abort) return;
      if (!error) setBlogData(data);
    })();

    return () => controller.abort();
  }, [filter]);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Quickk Loans Blogs | Hassle Free Loan Service</title>
        <meta
          name="keywords"
          content="Blogs, Quick Loan Blogs, Quickk Loans Blogs, Quick Loan, Quick Loans, Loans, Personal loans, Business loans, Education loans, Student loans, Installment loans, Quick loans, Unsecured loans, Loan application, Loan approval, Quickk educationloan, online abroad loan, quickkabroad loan"
        />
      </Helmet>
      <Header />
      <Container maxWidth={"xl"} sx={{ py: 5, mt: 10 }}>
        <Grid container spacing={4}>
          <Grid item md={12} xs={12} lg={12}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 600, textAlign: "center", py: 5 }}
            >
              Quickk Loans Blogs
            </Typography>
            <Grid container spacing={4}>
              {blogData?.data ? (
                blogData?.data?.map((blog: any) => (
                  <Grid
                    key={blog?.id}
                    item
                    xl={3}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    onClick={() => navigate(`/blogs/${blog?.id}`)}
                  >
                    {/* <Card sx={{ my: 2, height: 200  }} className="card-ind" elevation={2}>
                      <Image
                        src={blog?.media[0]?.media}
                        style={{
                          display: "block",
                          backgroundSize: "cover",
                          width: "100%",
                          height: "200px",
                        }}
                      />
                      <CardContent>
                        <div className="blog-box-item">
                          <div className="blog-content">
                            <h5>{blog.title}</h5>
                            <p>{blog.shortDesc}</p>

                            <div className="blog-auteher-title">
                              <span>By {blog?.name}</span>
                              <span className="float-lg-right">
                                {blog.addedAt}
                              </span>
                            </div>
                            <div
                              style={{
                                textAlign: "right",
                                color: STYLES.primaryColor,
                                fontSize: 13,
                              }}
                            >
                              Read More
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card> */}
                    <Card style={container} sx={{ height: '22rem', m: 2 }} key={blog?.id}>
                      <CardActionArea>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={blog?.media[0]?.media}
                          // title=""
                          alt={CONFIG.alt}
                          component="img"
                          onError={(e:any)=> e.target.src = CONFIG.images.DEFAULT_IMAGE}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                            {blog?.title.length <= 64 ? blog?.title : `${blog?.title.slice(0, 60)}...`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {blog.shortDesc.length <= 38 ? blog.shortDesc : `${blog.shortDesc.slice(0, 38)}...`}
                          </Typography>
                          <Typography component="span">
                            {blog.addedAt}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions style={fixedElement}>
                      <Button variant="outlined" sx={{  color: STYLES.primaryColor, border: `1px solid${STYLES.primaryColor}`, ':hover': { border: `1px solid${STYLES.primaryColor}` } }} size="small" >Read More</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <div className="loadingblogs">Loading Blogs</div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {blogData?.data ? <Paginate links={blogData?.links} path={blogData?.path} handleChange={handleChange} /> : null}
      <Footer />
    </>
  );
};

const container: React.CSSProperties = {
  position: 'relative'
}

const fixedElement: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%"
}
