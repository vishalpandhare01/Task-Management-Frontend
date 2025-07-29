import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Notification({ notification }) {
  const [open, setOpen] = useState(false);
  console.log("notification render");
  useEffect(() => {
    if (notification) {
      setOpen(true);
    }
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (!notification) return null;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000} // 5 seconds
      onClose={handleClose}
      sx={{
        marginTop: 2,
        marginRight: 2,
        boxShadow: 3, // floating effect
        borderRadius: 2,
      }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        <strong>🔔</strong> task <strong>{notification.message}</strong> status
        is <strong>{notification.title} </strong>
      </Alert>
    </Snackbar>
  );
}

export default Notification;
