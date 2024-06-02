import { Button, Divider, Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CONFIG } from "../../config";
import { usePreLoginState } from "../../hooks";
import { Auth } from "../Auth";
import "./style.css";
import AddIcon from "@mui/icons-material/Add";
import { Image } from "../Image";

export const Sidenav = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  children,
}: {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: Function;
  children?: any;
}) => {
  const {
    state: { showSignUp },
    dispatch,
  }: any = usePreLoginState();

  const loccation = useLocation();

  const toggleAuth = () => dispatch("TOGGLE_AUTH", true);

  if (!showSignUp) {
    let style: any = document.body.style;
    style.overflow = null;
  }

  const drawer = (
    <div>
      <Toolbar
        children={<Image style={{ width: "80%" }} src={CONFIG.images.LOGO} />}
      />
      <Divider />
      {loccation.pathname.includes("/admin") && (
        <div
          className="d-flex justify-content-center mt-2"
          style={{ padding: 10 }}
        >
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            style={{
              border: "1px solid #624bff",
              color: "#624bff",
              marginTop: 10,
            }}
            onClick={() => {
              toggleAuth();
              handleDrawerToggle();
            }}
          >
            Create Lead
          </Button>
        </div>
      )}
      {children}
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="navbar"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={() => handleDrawerToggle()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Auth />
    </Box>
  );
};
