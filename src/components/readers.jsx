import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Readers extends React.Component {
  state = {
    readers: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewreaderlist")
      .then((response) => {
        console.log(response);
        this.setState({ readers: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/lms/deleteReader/${id}`)
      .then((response) => {
        const readers = this.state.readers.filter((reader) => reader.id != id);
        this.setState({ readers: readers });
      });
  };
  render() {
    return (
      <div className="container">
        <Link to="/readers/add"></Link>
        <table className="table table-info table-striped mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>MobileNo</th>
              <th>Email</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.readers.map((reader) => (
              <tr key={reader.id}>
                <td>{reader.id}</td>
                <td>{reader.firstName}</td>
                <td>{reader.lastName}</td>
                <td>{reader.mobileno}</td>
                <td>{reader.email}</td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-outline-danger"
                    onClick={() => this.handleDelete(reader.id)}
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

export default Readers;
