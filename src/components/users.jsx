import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
  state = {
    users: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewuserslist")
      .then((response) => {
        console.log(response);
        this.setState({ users: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/lms/deleteUser/${id}`).then((res) => {
      const auth = this.state.users.filter((au) => au.userid != id);
      this.setState({ users: auth });
    });
  };
  render() {
    return (
      <div className="container">
        <Link
          to="/users/addusers"
          className="btn btn-primary btn-large mb-1 float-end"
        >
          Add
        </Link>
        <table className="table table-info table-striped">
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>Date Of Birth</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr>
                <td>{user.userid}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.mobileno}</td>
                <td>{user.dateofbirth}</td>
                <td>
                  <Link to={`/users/update/${user.userid}`}>
                    <input
                      type="button"
                      value="Update"
                      className="btn btn-primary me-2"
                    />
                  </Link>
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user.userid)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
