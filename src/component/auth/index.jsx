import { useState } from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function Authcomponent() {
  // Get authentication state from Redux
  const error = useSelector((state) => state.tasks.error);
  const [isLogin, setIsLogin] = useState(true);


  // You can still keep your error logic if needed
  if (
    error !== "Request failed with status code 401" &&
    error !== "Request failed with status code 403"  
  ) {
    return null;
  }



  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Box sx={{ width: "50vw", height: "50vh" }}>
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} />
        )}
      </Box>
    </Box>
  );
}
