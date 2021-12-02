import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class BooksOrder extends React.Component {
  state = {
    booksorder: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewOrderList")
      .then((response) => {
        console.log(response);
        this.setState({ booksorder: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/lms/cancelOrder/${id}`).then((res) => {
      const booksorder = this.state.booksorder.filter((au) => au.orderId != id);
      this.setState({ booksorder: booksorder });
    });
  };
  render() {
    return (
      <div className="container">
        <Link
          to="/bookorder/add"
          className="btn btn-secondary btn-large mt-3 float-end"
        >
          Add
        </Link>
        <h1>Order Page</h1>
        <table className="table w-75 mx-auto mt-5">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>OrderStatus</th>
              <th>Quantity</th>
              <th>OrderDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.booksorder.map((bookorder) => (
              <tr>
                <td>{bookorder.orderId}</td>
                <td>{bookorder.orderStatus}</td>
                <td>{bookorder.quantity}</td>
                <td>{bookorder.orderDate}</td>
                <td>
                  <Link to={`/booksorder/update/${bookorder.orderId}`}>
                    <input
                      type="button"
                      value="Edit"
                      className="btn btn-secondary me-2"
                    />
                  </Link>
                  <input
                    type="button"
                    value="Cancel"
                    className="btn btn-outline-danger"
                    onClick={() => this.handleDelete(bookorder.orderId)}
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

export default BooksOrder;
