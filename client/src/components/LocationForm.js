import React, { Component } from "react";
import axios from "axios";
import { format } from "date-fns";

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({ latitude, longitude });
        },
        (error) => {
          this.setState({ error: error.message });
        }
      );
    } else {
      this.setState({ error: "Geolocation is not supported by this browser." });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude } = this.state;

    try {
      await axios.post("http://localhost:5000/location", {
        latitude,
        longitude,
      });
      alert("Location stored successfully.");
    } catch (error) {
      console.error("Error storing location:", error);
      alert("Error storing location.");
    }
  };

  render() {
    const { latitude, longitude, error } = this.state;
    const currentDateTime = format(new Date(), "MMMM dd, yyyy - HH:mm:ss");

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (latitude && longitude) {
      return (
        <div>
          <p>
            <strong>Current Date and Time:</strong> {currentDateTime}
          </p>
          <p>
            <strong>Latitude:</strong> {latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {longitude}
          </p>
          <form onSubmit={this.handleSubmit}>
            <button className="btn btn-outline-primary" type="submit">
              Store Elephant Time & Location
            </button>
            <p className="forgot-password text-right">
          <a href="/userHome">Back To Home</a>
        </p>
          </form>
        </div>
      );
    }

    return <p>Loading...</p>;
  }
}

export default LocationForm;
