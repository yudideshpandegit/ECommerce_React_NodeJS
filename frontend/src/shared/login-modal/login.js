import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./login.css";

import { Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import { login, register } from "../../global-state/actions/userLoginActions";
import FormContainer from "../form-container/FormContainer";

const LoginScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  console.log(props.history, props.location);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  const submitForm = (e) => {
    e.preventDefault();

    if (loginMode) {
      dispatch(login(email, password));
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="login__content">
      <h1>Sign-In</h1>
      {error && <Message varient="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={(e) => submitForm(e)}>
        {!loginMode && (
          <Form.Group controlId="name">
            <Form.Label>Email Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
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

        <div className="w-100">
          <Button type="submit" varient="primary" className = "login__button">
            {loginMode ? "Login" : "Register"}
          </Button>
        </div>
      </Form>

      <Row className="py-5">
        <Col>
          {loginMode ? (
            <p>
              New Customer
              <span onClick={() => setLoginMode(false)}>Register</span>
            </p>
          ) : (
            <p>
              Already a customer
              <span onClick={() => setLoginMode(true)}>Login</span>
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LoginScreen;
