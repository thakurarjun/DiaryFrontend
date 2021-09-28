import React from "react";
import Alert from '@mui/material/Alert';
const Notification = ({ message, type }) => {
  if (message === "") {
    return <div></div>
  }
  //return <div className={type}>{message}</div>;
  return <Alert severity="success">{message}</Alert>
};

export default Notification;
