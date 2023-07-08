import React, { Component } from "react";

export default class AdminHome extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/getAllUser");
            const data = await response.json();
            if (response.ok) {
                this.setState({ users: data.data });
            } else {
                console.log("Error:", data.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    render() {
        const { users } = this.state;

        return (
            <div className="container">
            <h1 className="mt-4">Welcome Admin</h1>
            <h2>User Details:</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ fontSize: "12px" }}>First Name</th>
                        <th style={{ fontSize: "12px" }}>Last Name</th>
                        <th style={{ fontSize: "12px" }}>Email</th>
                        <th style={{ fontSize: "12px" }}>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ fontSize: "12px" }}>{user.fname}</td>
                            <td style={{ fontSize: "12px" }}>{user.lname}</td>
                            <td style={{ fontSize: "12px" }}>{user.email}</td>
                            <td style={{ fontSize: "12px" }}>{user.mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        );
    }
}
