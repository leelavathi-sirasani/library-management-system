import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Publishers extends React.Component {
  state = {
    publishers: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewPublishers")
      .then((response) => {
        console.log(response);
        this.setState({ publishers: response.data });
      })
      .catch((error) => console.log(error));
  }

  handleDelete = (publisherid) => {
    axios
      .delete(`http://localhost:8080/lms/deletePublisher/${publisherid}`)
      .then((res) => {
        const publishers = this.state.publishers.filter(
          (std) => std.publisherId != publisherid
        );
        this.setState({ publishers: publishers });
      });
  };
  render() {
    return (
      <div className="container">
        <h1>Publishers Page</h1>
        <Link
          to="/publisher/add"
          className="btn btn-outline-info btn-large mb-1 float-end"
        >
          Add
        </Link>

        <table className="table table-info table-striped">
          <thead>
            <tr>
              <th>publisherid</th>
              <th>publishername</th>
              <th>contactno</th>
              <th>email</th>
              <th>address</th>
              <th>city</th>
              <th>state</th>
              <th>pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.publishers.map((publisher) => (
              <tr>
                <td>{publisher.publisherId}</td>
                <td>{publisher.publisherName}</td>
                <td>{publisher.contactno}</td>
                <td>{publisher.email}</td>
                <td>{publisher.address}</td>
                <td>{publisher.city}</td>
                <td>{publisher.state}</td>
                <td>{publisher.pincode}</td>
                <td>
                  <Link to={`/publishers/update/${publisher.publisherId}`}>
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
                    onClick={() => this.handleDelete(publisher.publisherId)}
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

export default Publishers;
