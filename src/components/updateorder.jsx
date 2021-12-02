import React, { Component } from "react";
import axios from "axios";

class UpdateOrder extends React.Component {
  state = {
    bookorder: {
      orderStatus: "",
      quantity: "",
      orderDate: "",
      bookid: "",
    },
  };
  componentDidMount() {
    // this.props.match.params.authorId;
    axios
      .get(
        `http://localhost:8080/lms/viewOrderById/${this.props.match.params.orderId}`
      )
      .then((res) => {
        const bookorder = { ...this.state.bookorder };
        bookorder.orderStatus = res.data.orderStatus;
        bookorder.quantity = res.data.quantity;
        bookorder.orderDate = res.data.orderDate;
        bookorder.bookid = res.data.bookid;
        console.log(res.data);
        console.log(bookorder);
        this.setState({ bookorder: bookorder });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const bookorder = { ...this.state.bookorder };
    bookorder[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bookorder: bookorder });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const bookorder = {
      orderStatus: this.state.bookorder.orderStatus,
      quantity: this.state.bookorder.quantity,
      orderDate: this.state.bookorder.orderDate,
      books: {
        bookid: this.state.bookorder.bookid,
      },
      orderId: this.props.match.params.orderId,
    };
    axios
      .put("http://localhost:8080/lms/updateOrder", bookorder)
      .then((res) => {
        this.props.history.push("/booksorder");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              OrderStatus
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              value={this.state.bookorder.orderStatus}
              name="orderStatus"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              Quantity
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.bookorder.quantity}
              name="quantity"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              OrderDate
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPh"
              value={this.state.bookorder.orderDate}
              name="orderDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              BookID
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.bookorder.bookid}
              name="bookid"
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

export default UpdateOrder;
