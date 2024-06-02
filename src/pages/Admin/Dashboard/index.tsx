import { Logout, Person } from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import NextWeekIcon from '@mui/icons-material/NextWeek';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Sidenav, LAHeader } from "../../../components";
import { CONFIG } from "../../../config";
import { usePreLoginState } from "../../../hooks";
import { logout } from "../../../services";
import { ApplyFormProvider } from "../../../store";
import { createSignal } from "../../../utils";

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navItems, setNav] = React.useState<any>([]);
  const navigate = useNavigate();
  const { blogFeatureId } = CONFIG;

  const navArray = [
    {
      id: 1,
      name: localStorage.getItem("adminUser"),
      path: "",
      icon: <Person />,
    },
    {
      id: 2,
      name: "Home",
      path: "/admin/getAllLeads/all",
      icon: <HomeIcon />,
    },
    {
      id: 3,
      name: "Master",
      path: "/admin/master",
      icon: <AccessibilityNewIcon />,
    },
    {
      id: 4,
      name: "Services",
      path: "/admin/services",
      icon: <NextWeekIcon />,
    },
    {
      id: 5,
      name: "About Us",
      path: "/admin/aboutUs",
      icon: <ContactMailIcon />,
    },
    {
      id: 6,
      name: "Home Banner",
      path: "/admin/banner",
      icon: <FlagIcon />,
    },
    {
      id: 7,
      name: "Blogs",
      featureId: blogFeatureId,
      path: "/admin/blogs",
      icon: <AssessmentIcon />,
    },
    { id: 8, name: "Logout", path: "/adminLogin", icon: <Logout /> },
  ];

  const { state: { feature } } = usePreLoginState();

  useEffect(() => {
    const featureIds: number[] = [];
    if (feature) {
      feature.forEach(
        (feature: any) =>
          Number(feature.isActive) === 0 && featureIds.push(feature.id)
      );
      featureIds.forEach((value) => {
        let featureIdIndex = navArray.findIndex(
          (arr) => arr?.featureId == value
        );
        if (featureIdIndex !== -1) navArray.splice(featureIdIndex, 1);
      });
    }
    setNav(navArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature]);

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userLogout = async () => {
    const { signal} = createSignal();
    const { error, data } = await logout(signal);
    if (!error) {
      localStorage.clear();
      navigate("/adminLogin");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleNavClick = (list: any) => {
    switch (list.path) {
      case "/adminLogin":
        userLogout();
        break;
      case "":
        break;
      default:
        navigate(list.path);
        break;
    }
  };

  const SidenavList = (
    <List>
      {navItems.length > 0 &&
        navItems.map((list: any, index: number) => (
          <ListItem
            key={list.id}
            disablePadding
            onClick={() => handleNavClick(list)}
          >
            <ListItemButton>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ApplyFormProvider>
        <>
          <LAHeader
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
          <Sidenav
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
            children={SidenavList}
          />
          <Box
            sx={{
              width: "100vw",
              py: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#efefef",
              // height: "100vh",
            }}
          >
            <Outlet />
          </Box>
        </>
      </ApplyFormProvider>
      <ToastContainer />
    </Box>
  );
};

export default Dashboard;
