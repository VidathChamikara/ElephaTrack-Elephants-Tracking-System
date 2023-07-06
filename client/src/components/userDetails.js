import React, { Component } from "react";
import UserHome from "./userHome";
import AdminHome from "./AdminHome";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      admin: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          this.setState({ admin: true });
        }
        this.setState({ userData: data.data });
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  render() {
    const { admin } = this.state;
    return (
      <div>
      {admin ? <AdminHome /> : <UserHome />}
    </div>
     
    );
  }
}
