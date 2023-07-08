import React, { Component } from "react";
import Ele from "../images/ele.jpg";

export default class UserHome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
         
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0.25, 0.25, 0.25)", // Add boxShadow CSS property
                borderRadius: "15px", // Add borderRadius CSS property
                transition: "transform 0.3s", // Add transition CSS property for smooth animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
              }}
            >
              <div className="card-body text-center">
              <a href="/locationMap"> <div className="circle-image">
                  <img src={Ele} alt="Card 1" />
                </div></a>
                <h5 className="card-title">View</h5>
                <p className="card-text">Find the elephant locations</p>
              </div>
            </div>
           
          </div>
          <div className="col-md-6">
            <div
              className="card mb-3"
              style={{
                backgroundColor: "#D3D3D3",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.25)", // Add boxShadow CSS property
                borderRadius: "15px", // Add borderRadius CSS property
                transition: "transform 0.3s", // Add transition CSS property for smooth animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
              }}
            >
              <div className="card-body text-center">
              <a href="/locationForm"><div className="circle-image">
                  <img src={Ele} alt="Card 2" />
                </div></a>
                <h5 className="card-title">Add</h5>
                <p className="card-text">Add the elephant locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
