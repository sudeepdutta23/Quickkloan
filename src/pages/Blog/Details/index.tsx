import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

import {
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet-async";

import { Button, Footer, Header, Image } from "../../../components";
import { STYLES } from "../../../config";
import { usePreLoginState } from "../../../hooks";
import { getBlogListById } from "../../../services";
import { BlogDetailsInterface } from "../../../store";
import { copyToClipBoard, createSignal, shareInWhatsapp, sspecialCharConversion } from "../../../utils";

export const BlogDetails = () => {
  const [showMore, setMore] = useState(true);

  const {
    state: { blogDetails },
    dispatch,
  } = usePreLoginState();
  const navigate = useNavigate();

  const { blogId } = useParams();

  const breadcrumbs = (title: string, id: number) => [
    <Link key="1" to="/" className="nodec">
      Home
    </Link>,
    <Link
      key="2"
      to="/blogs"
      className="nodec"
    // onClick={handleClick}
    >
      Blogs
    </Link>,
    <Link key="3" to={`/blogs/${id}`} className="nodec">
      {title}
    </Link>,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const { controller, signal } = createSignal();

    (async () => {
      const { data, error } = await getBlogListById(blogId, signal);
      if (data?.abort) return;
      if (!error) dispatch("SET_BLOG_DETAILS", data);
    })();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);
  

  return (
    <>
      <Helmet>
        <title>
          {blogDetails.title} | Quickk Loans Blogs | Hassle Free Loan Service
        </title>
        <meta name="keywords" content={blogDetails?.seoKeywords?.toString()} />
      </Helmet>
      <Header />
      <Container maxWidth="xl" sx={{ py: 5, my: 10 }}>
        <Breadcrumbs
          sx={{ py: 2 }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs(blogDetails.title, blogDetails.id)}
        </Breadcrumbs>
        <Typography
          component="div"
          variant="h6"
          sx={{ py: 2, fontWeight: 600, fontSize: "1.75rem" }}
        >
          {blogDetails.title}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          &nbsp;
          <CalendarTodayIcon sx={{ fontSize: 15, color: "#a1a3ad" }} />
          <Typography component="span" sx={{ color: "#a1a3ad" }}>
            11 December 2023
          </Typography>
          &nbsp;&nbsp;&nbsp;
          <WatchLaterIcon sx={{ fontSize: 20, color: "#a1a3ad" }} />
          &nbsp;
          <Typography component="span" sx={{ color: "#a1a3ad" }}>
            {blogDetails.timeToRead} min read
          </Typography>
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Card sx={{ my: 2 }}>
              <Image src={blogDetails?.media?.[0]?.media} style={{ width: '100%' }} />
            </Card>
            <Divider sx={{ py: 1 }} />
            <Typography variant="body1" sx={{ py: 3 }}>
              <WhatsAppIcon sx={{ mx: 1, color: "green", fontSize: 30, cursor: "pointer" }} onClick={() => shareInWhatsapp(window.location.href)} />
              {/* <FacebookIcon sx={{ mx: 1, color: "blue", fontSize: 30, cursor: "pointer" }} /> */}
              {showMore && (
                <>
                  {/* <TwitterIcon sx={{ mx: 1, color: "#72cce8", fontSize: 30, cursor: "pointer" }} />
                  <LinkedInIcon
                    sx={{ mx: 1, color: "darkblue", fontSize: 30, cursor: "pointer" }}
                  />
                  <TelegramIcon
                    sx={{ mx: 1, color: "#09b5eb", fontSize: 30, cursor: "pointer" }}
                  /> */}
                  <ContentCopyIcon sx={{ mx: 2, fontSize: 30, cursor: "pointer" }} onClick={() => copyToClipBoard(window.location.href)} />
                </>
              )}
              {showMore ? (
                <KeyboardArrowLeftIcon
                  className="pointer"
                  onClick={() => setMore(!showMore)}
                />
              ) : (
                <KeyboardArrowRightIcon
                  className="pointer"
                  onClick={() => setMore(!showMore)}
                />
              )}
            </Typography>
          </Grid>

          <Grid item md={4}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              elevation={3}
            >
              <Image src="//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/loggedOutStateImage.b40891fd.svg" />

              <Typography style={{ padding: "5px 0 5px 0" }} variant="body1">
                Safe & Secure loans?
              </Typography>
              <Typography style={{ padding: "5px 0 5px 0" }} variant="body2">
                Open a QuickkLoans account & start your financial journey safe
                and hasslefree.
              </Typography>
              <Button
                style={{ ...STYLES.button, padding: "5px 0 5px 0" }}
                variant="contained"
                fullWidth
                onClick={() => dispatch("TOGGLE_AUTH", null)}
              >
                Apply Loan
              </Button>
            </Card>
            <TableContainer component={Paper} sx={{ my: 2 }} elevation={3}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Recent Posts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogDetails?.latestBlog?.map(
                    (post: BlogDetailsInterface, index: number) => (
                      <TableRow key={index} className="pointer">
                        <TableCell onClick={() => navigate(`/blogs/${post.id}`)}>{post.title}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* <Typography dangerouslySetInnerHTML={{
            __html: blogDetails?.longDesc
          }} component="p" className="mg" style={{ textAlign: 'justify' }} sx={{ px: 3 }} /> */}
          <div 
            dangerouslySetInnerHTML={{
              __html: blogDetails?.longDesc ? sspecialCharConversion(blogDetails?.longDesc) : blogDetails?.longDesc
            }} 
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
};
