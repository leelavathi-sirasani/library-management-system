import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class DamagedBooks extends React.Component {
  state = {
    damagedbooks: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewDamagedBooksList")
      .then((response) => {
        console.log(response);
        this.setState({ damagedbooks: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/lms/deleteAuthor/${id}`).then((res) => {
      const damagedbooks = this.state.damagedbooks.filter((au) => au.id != id);
      this.setState({ damagedbooks: damagedbooks });
    });
  };
  render() {
    return (
      <div className="container">
        <Link
          to="/damagedbook/add"
          className="btn btn-secondary btn-large mt-3 float-end"
        >
          Add
        </Link>
        <h1>Damaged Book Page</h1>
        <table className="table w-75 mx-auto mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Quantity</th>
              <th>Description</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.damagedbooks.map((damagedbook) => (
              <tr>
                <td>{damagedbook.id}</td>
                <td>{damagedbook.quantity}</td>
                <td>{damagedbook.description}</td>
                <td>
                  <Link to={`/damagedbook/update/${damagedbook.id}`}>
                    <input
                      type="button"
                      value="Update"
                      className="btn btn-secondary me-2"
                    />
                  </Link>
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-outline-danger"
                    onClick={() => this.handleDelete(damagedbook.id)}
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

export default DamagedBooks;
