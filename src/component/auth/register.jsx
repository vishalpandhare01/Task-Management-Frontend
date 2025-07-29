// components/RegisterForm.js
import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/reducer/task";

export default function RegisterForm({ setIsLogin }) {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const data = useSelector((state) => state.tasks.list);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await dispatch(register(form));
      console.log(res)
      if (res.error.message) {
        setErrorMsg(res.error.message);
      }
    } catch (error) {}
  };

  useEffect(()=>{
    setErrorMsg("register successfully")
  },[data])

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
        Register
      </Typography>

      <TextField
        id="email"
        label="Email"
        name="email"
        variant="standard"
        type="email"
        required
        value={form.email}
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
        Register
      </Button>
      {errorMsg != "" && <Typography color="warning">{errorMsg}</Typography>}
      <Typography variant="body2" textAlign="center">
        already have an account?{" "}
        <Button onClick={() => setIsLogin(true)} variant="text">
          Login
        </Button>
      </Typography>
    </Box>
  );
}
