import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./ProfileScreen.css"

import { Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../shared/loader/Loader";
import Message from "../shared/message/Message";
import {
  userDetailsAction,
  userUpdateDetailsAction,
} from "../global-state/actions/userLoginActions";
import FormContainer from "../shared/form-container/FormContainer";
import OrderItem from "../components/order-item/OrderItem";

const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const [customerOrderDetails, setCustomerOrderDetails] = useState(null);
  const [loadingCustomerDetails, setLoadingCustomerDetails] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const userDetailsUpdate = useSelector((state) => state.userUpdate);

  const { success } = userDetailsUpdate;

  const { loading, userInfo, error } = userLogin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (!userInfo) {
      dispatch(userDetailsAction("profile"));
    } else {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }

    const getOrderDetails = async () => {
      console.log("Data", userInfo.token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const id = {
        user: userInfo._id,
      };

      const { data } = await axios.get(
        `/api/orders/details/${userInfo._id}`,
        config
      );

      setCustomerOrderDetails(data);
      setLoadingCustomerDetails(false);
      console.log("Data", data);
    };

    console.log("UserInfo", userInfo.token);
    getOrderDetails();
  }, [props.history, userInfo, redirect]);

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(
      userUpdateDetailsAction({
        email,
        name,
        password,
      })
    );
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <FormContainer>
            <h1>My Profile</h1>
            {error && <Message varient="danger">{error}</Message>}
            {success && <Message varient="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={(e) => submitForm(e)}>
              <Form.Group controlId="name">
                <Form.Label>Email Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col md={6} className = "customer__orders">
          <h1>My Orders</h1>
          {!loadingCustomerDetails
            ? customerOrderDetails.orderItems.map((item) => {
                return <OrderItem item={item} />;
              })
            : null}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
