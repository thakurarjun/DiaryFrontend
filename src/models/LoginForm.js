import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <>
      <Typography variant="h" component="h4" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
         size="small"
          id="username"
          label="User Name"
          variant="outlined"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
        <TextField
         size="small"
          id="password"
          label="Password" margin="normal"
          variant="outlined" 
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
        <Button variant="contained" size="large" onClick={handleSubmit}>
          Log In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
