import React, { Component } from "react";
import axios from "axios";

class UpdateReaders extends React.Component {
  state = {
    reader: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      mobileno: "",
    },
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/lms/viewreaderbyid/${this.props.match.params.id}`
      )
      .then((res) => {
        const reader = { ...this.state.reader };
        reader.firstName = res.data.firstName;
        reader.lastName = res.data.lastName;
        reader.password = res.data.password;
        reader.email = res.data.email;
        reader.mobileno = res.data.mobileno;
        console.log(res.data);
        console.log(reader);
        this.setState({ reader: reader });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const reader = { ...this.state.reader };
    reader[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ reader: reader });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const reader = {
      firstName: this.state.reader.firstName,
      lastName: this.state.reader.lastName,
      password: this.state.reader.password,
      email: this.state.reader.email,
      mobileno: this.state.reader.mobileno,
      id: this.props.match.params.id,
    };
    axios
      .put("http://localhost:8080/lms/updateReader", reader)
      .then((res) => {
        this.props.history.push("/readers");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              FirstName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              value={this.state.reader.firstName}
              name="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              LastName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.reader.lastName}
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputName"
              value={this.state.reader.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.reader.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              MobileNo
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.reader.mobileno}
              name="mobileno"
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateReaders;
