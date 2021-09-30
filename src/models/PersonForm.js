import React ,{useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const PersonForm = ({ addPerson }) => {
  const [inputName, setName] = useState("");
  const [numbers, setNumbers] = useState("");
  const onChangeNumbers = (event) => {
    setNumbers(event.target.value);
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
   const addNewNumber = (event) => {
    event.preventDefault()
    addPerson({
        name : inputName,
        number: numbers
    })
    setName("");
    setNumbers("");
  };
  return (
    <form onSubmit={addNewNumber}>
      <Box
        sx={{
          width: "400",
          height: "300",
          border: "1px solid black",
          borderRadius: 2,
          bgcolor: "#f5fffa",
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
          value={inputName}
        />

        <TextField
          size="small"
          id="person-form-number"
          label="Number"
          variant="outlined"
          onChange={onChangeNumbers}
          input
          required
          value={numbers}
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
