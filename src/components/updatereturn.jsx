import React, { Component } from "react";
import axios from "axios";

class UpdateReturn extends React.Component {
  state = {
    bookreturned: {
      returnedDate: "",
      delayedDays: "",
      penalty: "",
      penaltyStatus: "",
      bookid: "",
      userid: "",
    },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/lms/viewReturnedBooksById/${this.props.match.params.id}`
      )
      .then((res) => {
        const bookreturned = { ...this.state.bookreturned };
        bookreturned.returnedDate = res.data.returnedDate;
        bookreturned.delayedDays = res.data.delayedDays;
        bookreturned.penalty = res.data.penalty;
        bookreturned.penaltyStatus = res.data.penaltyStatus;
        bookreturned.bookid = res.data.books.bookid;
        bookreturned.userid = res.data.users.userid;
        console.log(res.data);
        console.log(bookreturned);
        this.setState({ bookreturned: bookreturned });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const bookreturned = { ...this.state.bookreturned };
    bookreturned[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bookreturned: bookreturned });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const bookreturned = {
      returnedDate: this.state.bookreturned.returnedDate,
      delayedDays: this.state.bookreturned.delayedDays,
      penalty: this.state.bookreturned.penalty,
      penaltyStatus: this.state.bookreturned.penaltyStatus,
      books: {
        bookid: this.state.bookreturned.bookid,
      },
      users: {
        userid: this.state.bookreturned.userid,
      },
      id: this.props.match.params.id,
    };
    axios
      .put("http://localhost:8080/lms/updatereturnbdetails", bookreturned)
      .then((res) => {
        this.props.history.push("/bookreturn");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              ReturnDate
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPh"
              value={this.state.bookreturned.returnedDate}
              name="returnedDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              DelayedDays
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.bookreturned.delayedDays}
              name="delayedDays"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Penalty
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.bookreturned.penalty}
              name="penalty"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              PenaltyStatus
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.bookreturned.penaltyStatus}
              name="penaltyStatus"
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
              value={this.state.bookreturned.bookid}
              name="bookid"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              UserId
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.bookreturned.userid}
              name="userid"
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

export default UpdateReturn;
