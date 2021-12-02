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

const AddPublisher = (props) => {
  const [publishers, setUser] = useState({
    contactno: "",
    email: "",
    publisherName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({
    contactno: "",
    email: "",
    publisherName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
    publisherName: Joi.string().max(20).required(),
    //contactno:Joi.number().required(),
    contactno: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.number().required(),
    //joi.string().length(10).pattern(/^[0-9]+$/);
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(publishers, schema, { abortEarly: false });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    //errors[contactno]="contactno is required"
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...publishers };
    usr[event.target.name] = event.target.value;

    setUser(usr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit");
    //const errors = validate();
    //console.log(errors);
    setErrors(validate());
    console.log(errors);
    if (errors) return;
    axios
      .post("http://localhost:8080/lms/addPublisher", publishers)
      .then((res) => props.history.push("/publisher"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3">Publisher section</Typography>
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
                type="text"
                variant="outlined"
                fullWidth
                label="PublisherName"
                value={publishers.publisherName}
                name="publisherName"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">
                  {errors.publisherName}
                </Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type=" text"
                variant="outlined"
                fullWidth
                label="Address"
                value={publishers.address}
                name="address"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.address}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="tel"
                variant="outlined"
                fullWidth
                label="Contactno"
                value={publishers.contactno}
                name="contactno"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.contactno}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="email"
                variant="outlined"
                fullWidth
                label="Email"
                value={publishers.email}
                name="email"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.email}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="text"
                variant="outlined"
                fullWidth
                label="State"
                value={publishers.state}
                name="state"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.state}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="text"
                variant="outlined"
                fullWidth
                label="City"
                value={publishers.city}
                name="city"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.city}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="text"
                variant="outlined"
                fullWidth
                label="Pincode"
                value={publishers.pincode}
                name="pincode"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.pincode}</Typography>
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

export default AddPublisher;
