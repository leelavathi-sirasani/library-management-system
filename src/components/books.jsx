import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, TextField, Box } from "@mui/material";
class Books extends React.Component {
  state = {
    search: "",
    books: [],
    filteredBooks: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewAllBooks")
      .then((response) => {
        console.log(response);
        this.setState({ books: response.data });
        this.setState({ filteredBooks: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleChange = (event) => {
    this.setState({ search: event.target.value });
    const books = this.state.books.filter((prod) =>
      prod.title.includes(this.state.search)
    );
    this.setState({ filteredBooks: books });
  };
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/lms/removeBook/${id}`).then((res) => {
      const books = this.state.books.filter((au) => au.bookid != id);
      this.setState({ books: books });
    });
  };
  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-2">
            <div class="list-group active">
              {this.props.login.loggedIn && this.props.login.role == "admin" && (
                <Link
                  to="/bookreturn"
                  class="list-group-item list-group-item-action-primary"
                >
                  Book Return
                </Link>
              )}
              {this.props.login.loggedIn && this.props.login.role == "admin" && (
                <Link
                  to="/booksorder"
                  class="list-group-item list-group-item-action-primary"
                >
                  Books Order
                </Link>
              )}
              {this.props.login.loggedIn && this.props.login.role == "admin" && (
                <Link
                  to="/bookissued"
                  class="list-group-item list-group-item-action-primary"
                >
                  Books Issue
                </Link>
              )}
              {this.props.login.loggedIn && this.props.login.role == "admin" && (
                <Link
                  to="/damagedbook"
                  class="list-group-item list-group-item-action-primary"
                >
                  Damaged Books
                </Link>
              )}
            </div>
          </div>
          <div className="col-md-10">
            {this.props.login.loggedIn && this.props.login.role == "admin" && (
              <Link
                to="/book/add"
                className="btn btn-secondary btn-large mt-3 float-end"
              >
                Add
              </Link>
            )}
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              {this.props.login.loggedIn && this.props.login.role == "user" && (
                <Link to={"/booksissued/add"}>
                  <input
                    type="button"
                    value="Issue"
                    className="btn btn-primary btn-large float-end my-3"
                  />
                </Link>
              )}
              {this.props.login.loggedIn && this.props.login.role == "user" && (
                <Link to="/booksreturn/add">
                  <input
                    type="button"
                    value="Return"
                    className="btn btn-primary btn-large float-end my-3 "
                  />
                </Link>
              )}
            </div>
            <Box mb={3}>
              <form>
                <TextField
                  id="filled-search"
                  label="Search By Title"
                  type="search"
                  variant="outlined"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </form>
            </Box>
            <table className="table table-info table-striped">
              <thead>
                <tr>
                  <th>BookId</th>
                  <th>Book Title</th>
                  <th>ISBN Code</th>
                  <th>Subject</th>
                  <th>Shelf Details</th>
                  <th>Published Year</th>
                  <th>Quantity</th>
                  <th>Book Cost</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  {this.props.login.loggedIn &&
                    this.props.login.role == "admin" && (
                      <th colSpan="2">Actions</th>
                    )}
                </tr>
              </thead>
              <tbody>
                {this.state.filteredBooks.map((book) => (
                  <tr>
                    <td>{book.bookid}</td>
                    <td>{book.title}</td>
                    <td>{book.isbncode}</td>
                    <td>{book.subject}</td>
                    <td>{book.shelfdetails}</td>
                    <td>{book.publishedyear}</td>
                    <td>{book.quantity}</td>
                    <td>{book.bookcost}</td>
                    <td>{book.author.firstName}</td>
                    <td>{book.publisher.publisherName}</td>
                    {this.props.login.loggedIn &&
                      this.props.login.role == "admin" && (
                        <td>
                          <Link to={`/book/update/${book.bookid}`}>
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
                            onClick={() => this.handleDelete(book.bookid)}
                          />
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// funtion to get updates from store
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Books); // connect component to store
