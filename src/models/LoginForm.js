import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
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
          label="Password"
          margin="normal"
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
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
