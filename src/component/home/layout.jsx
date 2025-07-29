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

export default function LayoutComponent({ children }) {
  const [taskName, setTaskName] = useState("message");
  const [notification, setNotification] = useState(null);
  const [ws, setWs] = useState(null);
  const [notificationcount, setNotificationConunt] = useState(0);

  // Connect to WebSocket on component mount
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Received notification:", data);
      setNotification(data);
      setNotificationConunt((prev) => prev + 1);
    };

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

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
