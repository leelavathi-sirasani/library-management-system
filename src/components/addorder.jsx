import React, { useState } from "react";
import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const AddOrder = (props) => {
  const [bookorder, setUser] = useState({
    orderStatus: "",
    quantity: "",
    orderDate: "",
    bookid: "",
  });
  const [errors, setErrors] = useState({
    orderStatus: "",
    quantity: "",
    orderDate: "",
    bookid: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    orderStatus: Joi.string().required(),
    quantity: Joi.number().integer().required(),
    orderDate: Joi.date().required(),
    bookid: Joi.number().integer().required(),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(bookorder, schema, { abortEarly: false });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...bookorder };
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
      .post("http://localhost:8080/lms/placeOrder", bookorder)
      .then((res) => props.history.push("/booksorder"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3">Order Form</Typography>
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
                type=" text"
                variant="outlined"
                fullWidth
                label="OrderStatus"
                value={bookorder.orderStatus}
                name="orderStatus"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.orderStatus}</Typography>
              )}
            </Box>
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="number"
                variant="outlined"
                fullWidth
                label="Quantity"
                value={bookorder.quantity}
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
                type="date"
                inputFormat="yyyy/MM/dd"
                variant="outlined"
                fullWidth
                label="OrderDate"
                value={bookorder.orderDate}
                name="orderDate"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.orderDate}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="number"
                variant="outlined"
                fullWidth
                label="Bookid"
                value={bookorder.bookid}
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

export default AddOrder;
