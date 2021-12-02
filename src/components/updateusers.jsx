import React, { Component } from "react";
import axios from "axios";

class UpdateUsers extends React.Component {
  state = {
    users: {
      firstName: "",
      lastName: "",
      mobileno: "",
      email: "",
      password: "",
      dateofbirth: "",
      role: "",
    },
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/lms/viewUserById/${this.props.match.params.userid}`
      )
      .then((res) => {
        const users = { ...this.state.users };
        users.firstName = res.data.firstName;
        users.lastName = res.data.lastName;
        users.mobileno = res.data.mobileno;
        users.dateofbirth = res.data.dateofbirth;
        users.email = res.data.login.email;
        users.password = res.data.login.password;
        users.role = res.data.role;
        console.log(res.data);
        console.log(users);
        this.setState({ users: users });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const users = { ...this.state.users };
    users[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ users: users });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const users = {
      mobileno: this.state.users.mobileno,
      firstName: this.state.users.firstName,
      lastName: this.state.users.lastName,
      dateofbirth: this.state.users.dateofbirth,
      email: this.state.users.email,
      password: this.state.users.password,
      role: this.state.users.role,
      userid: this.props.match.params.userid,
    };
    axios
      .put("http://localhost:8080/lms/updateUser/", users)
      .then((res) => {
        this.props.history.push("/users");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>Update users</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.users.firstName}
              name="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.users.lastName}
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputmobileno" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputmobileno"
              aria-describedby="emailHelp"
              value={this.state.users.mobileno}
              name="mobileno"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputDateOfBirth" className="form-label">
              Date OF Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputDateOfBirth"
              value={this.state.users.dateofbirth}
              name="dateofbirth"
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
              value={this.state.users.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.users.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            value={this.state.users.role}
            name="role"
            onChange={this.handleChange}
          >
            <option selected>Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
export default UpdateUsers;
