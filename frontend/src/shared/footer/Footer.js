import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className = "text-center py-3">
            Copyright &copy; Techbiz
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
