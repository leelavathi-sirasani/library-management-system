import React, { useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
const ariaLabel = { "aria-label": "description" };
const AddReaders = (props) => {
  const [reader, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileno: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileno: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    mobileno: Joi.number().integer().required(),
  };
  const validate = () => {
    const errors = {};
    const result = Joi.validate(reader, schema, { abortEarly: false });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };
  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...reader };
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
      .post("http://localhost:8080/lms/register", reader)
      .then((res) => props.history.push("/book"))
      .catch((err) => {
        console.log(err.res.data.message);
        setErrMsg(err.res.data.message);
      });
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <Paper elevation={3}>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="FirstName"
                  value={reader.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.firstName}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type=" text"
                  variant="outlined"
                  fullWidth
                  label="LastName"
                  value={reader.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.lastName}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="tel"
                  variant="outlined"
                  fullWidth
                  label="mobileno"
                  value={reader.mobileno}
                  name="mobileno"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.mobileno}</Typography>
                )}
              </Box>
              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="email"
                  variant="outlined"
                  fullWidth
                  label="Email"
                  value={reader.email}
                  name="email"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.email}</Typography>
                )}
              </Box>
              <Box mt={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddReaders;
