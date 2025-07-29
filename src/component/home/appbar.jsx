import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Badge,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";

const AppBarTop = ({ handleDrawerToggle, notificationCount = 0 }) => {

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#121212" }}>
      <Toolbar>
        {/* Menu Icon for Drawer */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title or Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        {/* Notification Icon with Badge */}
        <IconButton color="inherit">
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Name or Profile */}

        {/* Settings Icon */}
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarTop;
