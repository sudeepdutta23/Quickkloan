import "./style.css";
import React from "react";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Person, Logout } from "@mui/icons-material";

import { Sidenav, LAHeader } from "../../components";
import { ApplyFormProvider } from "../../store";
import { createSignal } from "../../utils";
import { logout } from "../../services";

 
const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

  const SidenavList = (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={localStorage.getItem("user")} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={userLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              paddingTop: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              height: "100vh",
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
