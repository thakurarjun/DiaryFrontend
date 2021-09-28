import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const Togglable = (props) => {
  const [visible, setVisible] = useState("false");
  const showLoginButton = { display: visible ? "none" : "" };
  const hideLoginForm = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <Box
      sx={{
        width: 300,
        height: 200,
        border: "1px solid grey",
        borderRadius: 1,
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
    >
      <div style={showLoginButton}>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={hideLoginForm}>
        {props.children}
        <br></br>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </Box>
  );
};
export default Togglable;
