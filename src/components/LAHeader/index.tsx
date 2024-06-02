import React from "react";
import "./style.css";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { STYLES } from "../../config";

export const LAHeader = ({
  drawerWidth,
  handleDrawerToggle,
}: {
  drawerWidth: number,
  handleDrawerToggle: Function;
}) => {

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: STYLES.button.backgroundColor }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => handleDrawerToggle()}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Quickk Loans
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
