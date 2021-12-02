import React, { useState } from "react";
import { Grid, Typography, Button, Box, TextField, Paper } from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const Addbookissued = (props) => {
  const [bookissued, setUser] = useState({
    issueDate: "",
    dueDate: "",
    bookid: "",
    userid: "",
  });
  const [errors, setErrors] = useState({
    issueDate: "",
    dueDate: "",
    bookid: "",
    userid: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    issueDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    bookid: Joi.number().required(),
    userid: Joi.number().required(),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(bookissued, schema, { abortEarly: false });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...bookissued };
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
      .post("http://localhost:8080/lms/add", bookissued)
      .then((res) => props.history.push("/bookissued"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3"></Typography>
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
                  type="date"
                  variant="outlined"
                  fullWidth
                  label="issue Date"
                  value={bookissued.issueDate}
                  name="issueDate"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.issueDate}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="date"
                  variant="outlined"
                  fullWidth
                  label="dueDate"
                  value={bookissued.dueDate}
                  name="dueDate"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.dueDate}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="Bookid"
                  value={bookissued.bookid}
                  name="bookid"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.bookid}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="number"
                  variant="outlined"
                  fullWidth
                  label="userid"
                  value={bookissued.userid}
                  name="userid"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.userid}</Typography>
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

export default Addbookissued;
