import React, { Component } from "react";
import axios from "axios";

class UpdateAuthor extends React.Component {
  state = {
    author: {
      firstName: "",
      lastName: "",
      email: "",
      contactno: "",
    },
  };

  componentDidMount() {
    // this.props.match.params.authorId;
    axios
      .get(
        `http://localhost:8080/lms/viewAuthorbyId/${this.props.match.params.authorId}`
      )
      .then((res) => {
        const auth = { ...this.state.author };
        auth.firstName = res.data.firstName;
        auth.lastName = res.data.lastName;
        auth.email = res.data.email;
        auth.contactno = res.data.contactno;
        console.log(res.data);
        console.log(auth);
        this.setState({ author: auth });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const auth = { ...this.state.author };
    auth[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ author: auth });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const auth = {
      firstName: this.state.author.firstName,
      lastName: this.state.author.lastName,
      email: this.state.author.email,
      contactno: this.state.author.contactno,
      authorId: this.props.match.params.authorId,
    };
    axios
      .put("http://localhost:8080/lms/updateAuthor", auth)
      .then((res) => {
        this.props.history.push("/author");
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
              value={this.state.author.firstName}
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
              value={this.state.author.lastName}
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.author.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              ContactNo
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.author.contactno}
              name="contactno"
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

export default UpdateAuthor;
