import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const PersonForm = ({
  addPerson,
  onChangeName,
  onChangeNumbers,
  name,
  number,
}) => {
  return (
    <form onSubmit={addPerson}>
      <Box
        sx={{
          width: "400",
          height: "300",
          border: "1px solid black",
          borderRadius: 2,
          bgcolor:'#f5fffa'
        }}
        display="grid"
        justifyContent="center"
        alignItems="center"
        minHeight="40vh"
      >
        <TextField
          size="small"
          id="person-form-name"
          label="Name"
          variant="outlined"
          onChange={onChangeName}
          input
          required
          value={name}
        />

        <TextField
          size="small"
          id="person-form-number"
          label="Number"
          variant="outlined"
          onChange={onChangeNumbers}
          input
          required
          value={number}
        />

        <div>
          <Button
            variant="contained"
            size="large"
            color="success"
            type="submit"
          >
            Add
          </Button>
        </div>
      </Box>
    </form>
  );
};
export default PersonForm;
