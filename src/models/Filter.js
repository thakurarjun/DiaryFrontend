import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const Filter = ({ filterName, onChangeFilter }) => {
  return (
    // <Box
    //   sx={{
    //     width: "400",
    //     height: "300",
    //     border: "1px solid grey",
    //     borderRadius: 2,
    //   }}
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   minHeight="10vh"
    // >
    <TextField
      fullWidth
      size="small"
      id="filter-input"
      label="Filter By Name"
      variant="outlined"
      placeholder="Example Arjun"
      value={filterName}
      onChange={onChangeFilter}
    />
    // </Box>
  );
};
export default Filter;
