import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducer/task";
import { useRouter } from "next/router";

export default function LoginForm({ setIsLogin }) {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(login(form));
      if (res?.error?.message) {
        setErrorMsg(res.error.message);
      } else {
        location.reload();
      }
    } catch (error) {}
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mx: "auto",
        mt: 6,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Login
      </Typography>

      <TextField
        id="text"
        label="Email"
        name="username"
        variant="standard"
        type="text"
        required
        value={form.username}
        onChange={handleChange}
      />

      <TextField
        id="password"
        label="Password"
        name="password"
        variant="standard"
        type="password"
        required
        value={form.password}
        onChange={handleChange}
      />

      <Button variant="contained" type="submit" size="large">
        Login
      </Button>
      {errorMsg != "" && <Typography color="warning">{errorMsg}</Typography>}
      <Typography variant="body2" textAlign="center">
        Don't have an account?{" "}
        <Button onClick={() => setIsLogin(false)} variant="text">
          Register
        </Button>
      </Typography>
    </Box>
  );
}
