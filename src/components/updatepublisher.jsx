import React, { Component } from "react";
import axios from "axios";

class UpdatePublishers extends React.Component {
  state = {
    publisher: {
      contactno: "",
      email: "",
      publisherName: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
    },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8081/lms/viewPublishersbyId/${this.props.match.params.id}`
      )
      .then((res) => {
        const publisher = { ...this.state.publisher };
        publisher.publisherName = res.data.publisherName;
        publisher.contactno = res.data.contactno;
        publisher.email = res.data.email;
        publisher.address = res.data.address;
        publisher.state = res.data.state;
        publisher.city = res.data.city;
        publisher.pincode = res.data.pincode;
        console.log(res.data);
        console.log(publisher);
        this.setState({ publisher: publisher });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const publisher = { ...this.state.publisher }; // copying student object
    publisher[event.target.name] = event.target.value; // student[fullName] = "ab"
    //student.fullName = "ab";
    //student[fullName]="ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ publisher: publisher });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const publisher = {
      contactno: this.state.publisher.contactno,
      email: this.state.publisher.email,
      publisherName: this.state.publisher.publisherName,
      address: this.state.publisher.address,
      state: this.state.publisher.state,
      city: this.state.publisher.city,
      pincode: this.state.publisher.pincode,
      publisherId: this.props.match.params.id,
    };
    axios
      .put("http://localhost:8081/lms/updatePublisher", publisher)
      .then((res) => {
        this.props.history.push("/publisher");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3> Publisher update Section</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputpublisherName" className="form-label">
              publisherName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputpublisherName"
              value={this.state.publisher.publisherName}
              name="publisherName"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              aria-describedby="emailHelp"
              value={this.state.publisher.address}
              name="address"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              value={this.state.publisher.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputContactNo" className="form-label">
              Contactno
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputContactNo"
              aria-describedby="emailHelp"
              value={this.state.publisher.contactno}
              name="contactno"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCity"
              aria-describedby="emailHelp"
              value={this.state.publisher.city}
              name="city"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputState" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputState"
              aria-describedby="emailHelp"
              value={this.state.publisher.state}
              name="state"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPincode" className="form-label">
              Pincode
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPincode"
              aria-describedby="emailHelp"
              value={this.state.publisher.pincode}
              name="pincode"
              onChange={this.handleChange}
            />
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePublishers;
