import React, { Component } from "react";
import axios from "axios";

class UpdateDamaged extends React.Component {
  state = {
    damagedbook: {
      quantity: "",
      description: "",
      bookid: "",
    },
  };
  componentDidMount() {
    // this.props.match.params.authorId;
    axios
      .get(
        `http://localhost:8080/lms/viewDamagedBookById/${this.props.match.params.id}`
      )
      .then((res) => {
        const damagedbook = { ...this.state.damagedbook };
        damagedbook.quantity = res.data.quantity;
        damagedbook.description = res.data.description;
        damagedbook.bookid = res.data.email;
        console.log(res.data);
        console.log(damagedbook);
        this.setState({ damagedbook: damagedbook });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const damagedbook = { ...this.state.damagedbook };
    damagedbook[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ damagedbook: damagedbook });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const damagedbook = {
      quantity: this.state.damagedbook.quantity,
      description: this.state.damagedbook.description,
      books: {
        bookid: this.state.damagedbook.bookid,
      },

      id: this.props.match.params.id,
    };
    axios
      .put("http://localhost:8080/lms/updateDamagedBooks", damagedbook)
      .then((res) => {
        this.props.history.push("/damagedbook");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              Quantity
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.damagedbook.quantity}
              name="quantity"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.damagedbook.description}
              name="description"
              onChange={this.handleChange}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              BookId
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.damagedbook.bookid}
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

export default UpdateDamaged;
