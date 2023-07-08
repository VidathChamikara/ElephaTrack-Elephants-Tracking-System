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
      currentDateTime: "",
      locationName:"",
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentDateTime = format(new Date(), "MMMM dd, yyyy - HH:mm:ss");
          this.setState({ latitude, longitude, currentDateTime });
        },
        (error) => {
          this.setState({ error: error.message });
        }
      );
    } else {
      this.setState({ error: "Geolocation is not supported by this browser." });
    }
  }

  handleLocationNameChange = (e) => {
    this.setState({ locationName: e.target.value });
  };
  

  handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude, currentDateTime, locationName } = this.state;

    try {
      await axios.post("http://localhost:5000/location", {
        latitude,
        longitude,
        currentDateTime,
        locationName,
      });
      alert("Location stored successfully or already added.");
    } catch (error) {
      console.error("Error storing location:", error);
      alert("Error storing location.");
    }
  };

  render() {
    const currentDateTime = format(new Date(), "MMMM dd, yyyy - HH:mm:ss");
    const { latitude, longitude, error, locationName } = this.state;
   

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
          <div  className="mb-3">
            <label htmlFor="locationName" className="form-label">Location Name:</label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={this.handleLocationNameChange}
              className="form-control"
            />
          </div>
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
