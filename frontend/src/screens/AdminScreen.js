import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Button } from 'react-bootstrap';

import "./AdminScreen.css";

class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  async componentDidMount() {
    console.log(this.props.userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/all-users/${this.props.userInfo._id}`,
      config
    );

    this.setState({
      users: data.users,
    });
  }

  render() {
    return (
      <div className="admin-screen">
        <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SR</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">DATE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((orderItem, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{orderItem.name}</td>
                    <td>{orderItem.email}</td>
                    <td>{orderItem.updatedAt}</td>
                    <td>
                      <p className = "edit__link">EDIT</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userLogin.userInfo,
  };
};

const mapDispatchToProps = {
  // ... normally is an object full of action creators
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
