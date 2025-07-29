import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import Sidebar from "./sidebar";
import AppBarTop from "./appbar";
import Notification from "../share/notification";

const drawerWidth = 240;

export default function LayoutComponent({
  notificationcount,
  notification,
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarTop
        handleDrawerToggle={handleDrawerToggle}
        notificationCount={notificationcount}
      />

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />

        <Box>
          <Box>
            {notification && <Notification notification={notification} />}
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
