import React, { Component } from "react";
import axios from "axios";

class UpdateBooks extends React.Component {
  state = {
    book: {
      title: "",
      isbncode: "",
      subject: "",
      shelfdetails: "",
      publishedyear: "",
      quantity: "",
      bookcost: "",
      authorId: "",
      publisherId: "",
    },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/lms/viewBookbyId/${this.props.match.params.bookid}`
      )
      .then((res) => {
        const book = { ...this.state.book };
        book.title = res.data.title;
        book.isbncode = res.data.isbncode;
        book.subject = res.data.subject;
        book.shelfdetails = res.data.shelfdetails;
        book.publishedyear = res.data.publishedyear;
        book.quantity = res.data.quantity;
        book.bookcost = res.data.bookcost;
        book.authorId = res.data.author.authorId;
        book.publisherId = res.data.publisher.publisherId;
        console.log(res.data);
        console.log(book);
        this.setState({ book: book });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const book = { ...this.state.book };
    book[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ book: book });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const book = {
      title: this.state.book.title,
      isbncode: this.state.book.isbncode,
      subject: this.state.book.subject,
      shelfdetails: this.state.book.shelfdetails,
      publishedyear: this.state.book.publishedyear,
      quantity: this.state.book.quantity,
      bookcost: this.state.book.bookcost,
      authors: {
        authorId: this.state.book.authorId,
      },
      publishers: {
        publisherId: this.state.book.publisherId,
      },
      bookid: this.props.match.params.bookid,
    };
    axios
      .put("http://localhost:8080/lms/updateBookDetails", book)
      .then((res) => {
        this.props.history.push("/book");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              value={this.state.book.title}
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              ISBNCode
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.book.isbncode}
              name="isbncode"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.book.subject}
              name="subject"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              ShelfDetails
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={this.state.book.shelfdetails}
              name="shelfdetails"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              PublishedYear
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.book.publishedyear}
              name="publishedyear"
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
              value={this.state.book.quantity}
              name="quantity"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              BookCost
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.book.bookcost}
              name="bookcost"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              AuthorId
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.book.authorId}
              name="authorId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPh" className="form-label">
              PublisherId
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPh"
              value={this.state.book.publisherId}
              name="publisherId"
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

export default UpdateBooks;
