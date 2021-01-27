import React from "react";

import { Row, Col, Form, Button, Container } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm = {12} md={8}>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
