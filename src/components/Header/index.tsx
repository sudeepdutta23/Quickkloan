import "./style.css";
import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

import { Auth } from "../Auth";
import { logout } from "../../services";
import { CONFIG, DRAWER_WIDTH, NAVITEMS } from "../../config";
import { usePreLoginState } from "../../hooks";
import { createSignal, scrollTo } from "../../utils";
import { Image } from "..";

interface HeaderType{
  isUploadSection?: boolean;
}

export const Header = ({ isUploadSection = false }: HeaderType) => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [screenWidth, setWidth] = React.useState(992);

  const { dispatch, state: { showSignUp } }: any = usePreLoginState();

  const navigate = useNavigate();

  const userLogout = async () => {
    const { signal } = createSignal();
    const { error, data } = await logout(signal);
    if (!error) {
      localStorage.clear();
      navigate("/");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState: any) => !prevState);
  };

  const logoWidth = () => {
    if (screenWidth > 1200) return "15%";
    else if (screenWidth > 900) return "25%";
    else if (screenWidth > 600) return "35%";
    else return "40%";
  };

  const navColor = () => {
    switch (location.pathname.split("/")[1]) {
      case "services":
      case "blogs":
      case "uploadDocuments":
        return "black";
      default:
        return "#fff";
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <CloseIcon className="sidebarClose" />
      <List sx={{ mt: 6 }}>
        {!isUploadSection && NAVITEMS.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => checkLocation(item.id)}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText className="drawerList" primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {localStorage.getItem("quikk-token") && (
          <ListItem disablePadding>
            <ListItemButton onClick={userLogout} sx={{ textAlign: "center" }}>
              <ListItemText className="drawerList" primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

    React.useEffect(() => {
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

  useEffect(() => {
    if (location?.state && !showSignUp) {
      toast.info("Please login to upload documents");
      dispatch("TOGGLE_AUTH", true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, showSignUp]);

  const checkLocation = (id: any) => {
    if (location.pathname === "/") {
      scrollTo(id);
    } else {
      navigate("/");
      setTimeout(() => scrollTo(id), 100);
    }
  };

  return (
    <Box sx={{ display: "flex" }} id="home">
      <CssBaseline />
      <AppBar
        position="absolute"
        component="nav"
        sx={{ backgroundColor: "transparent" }}
        elevation={0}
      >
        <Toolbar sx={{ my: 2, height: '8vh' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              position: "absolute",
              padding: 2,
            }}
          >
            <MenuIcon sx={{ color: navColor() }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: "block" },
              width: "20%",
              textAlign: screenWidth < 600 ? "center" : "left",
            }}
          >
            <NavLink to={!isUploadSection ? "/" : "#"}>
              <Image
                src={CONFIG.images.LOGO}
                style={{ width: logoWidth() }}
                className="headerLogo"
                loading="eager"
              />
            </NavLink>
            </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {!isUploadSection && NAVITEMS.map((item) => (
              <Button
                key={item.id}
                sx={{ color: navColor(), fontSize: { md: 16, sm: 12 }, mx: 2 }}
                onClick={() => checkLocation(item.id)}
              >
                {item.name}
              </Button>
            ))}
            {localStorage.getItem("quikk-token") && (
              <Button
                sx={{
                  color: "#fff",
                  fontSize: 30,
                  mx: 2,
                  border: "3px solid white",
                }}
                onClick={userLogout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
            color: "black",
            opacity: 0.9,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Auth />
    </Box>
  );
};
