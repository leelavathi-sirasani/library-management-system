import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const AddDamagedBook = (props) => {
  const [damagedbook, setUser] = useState({
    quantity: "",
    description: "",
    bookid: "",
  });
  const [errors, setErrors] = useState({
    quantity: "",
    description: "",
    bookid: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    quantity: Joi.number().required(),
    description: Joi.string().required(),
    bookid: Joi.number().required(),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(damagedbook, schema, { abortEarly: false });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...damagedbook };
    usr[event.target.name] = event.target.value;

    setUser(usr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit");
    setErrors(validate());
    console.log(errors);
    if (errors) return;
    axios
      .post("http://localhost:8080/lms/addDamagedBooks", damagedbook)
      .then((res) => props.history.push("/damagedbook"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3">Damaged Book Form</Typography>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              border: "1px solid blue",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="tel"
                variant="outlined"
                fullWidth
                label="Quantity"
                value={damagedbook.quantity}
                name="quantity"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.quantity}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type=" text"
                variant="outlined"
                fullWidth
                label="Description"
                value={damagedbook.description}
                name="description"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.description}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="tel"
                variant="outlined"
                fullWidth
                label="BookId"
                value={damagedbook.bookid}
                name="bookid"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.bookid}</Typography>
              )}
            </Box>
            <Box mt={3}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddDamagedBook;
