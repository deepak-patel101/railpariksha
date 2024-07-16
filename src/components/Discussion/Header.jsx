import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="bg-success text-white py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <h1>What is in your mind???</h1>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
