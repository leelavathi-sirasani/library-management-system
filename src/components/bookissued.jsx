import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Bookissued extends React.Component {
  state = {
    booksissued: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/view")
      .then((res) => {
        console.log(res);
        this.setState({ booksissued: res.data });
      })
      .catch((err) => console.log(err));
  }
  handleDelete = (Id) => {
    axios.delete(`http://localhost:8080/lms/delete/${Id}`).then((res) => {
      const booksissue = this.state.booksissued.filter((d) => d.issueId != Id);
      this.setState({ booksissued: booksissue });
    });
  };
  render() {
    return (
      <div className="container">
        <Link to="/booksissued/add"></Link>
        <table className="table table-info table-striped mt-5">
          <thead>
            <tr>
              <th>IssueId</th>
              <th>IssueDate</th>
              <th>DueDate</th>
              <th>BookId</th>
              <th>UserId</th>
              {this.props.login.loggedIn &&
                this.props.login.role == "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.booksissued.map((bookissued) => (
              <tr key={bookissued.issueId}>
                <td>{bookissued.issueId}</td>
                <td>{bookissued.issueDate}</td>
                <td>{bookissued.dueDate}</td>
                <td>{bookissued.books.bookid}</td>
                <td>{bookissued.users.userid}</td>
                {this.props.login.loggedIn && this.props.login.role == "admin" && (
                  <td>
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-outline-danger"
                      onClick={() => this.handleDelete(bookissued.issueId)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Bookissued);
