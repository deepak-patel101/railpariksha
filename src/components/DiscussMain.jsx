import React, { useState } from "react";
import Header from "./Discussion/Header";
import ThreadList from "./Discussion/ThreadList";
import NewThread from "./Discussion/NewThread";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DiscussMain() {
  const [showThreadList, setShowThreadList] = useState(false);

  const handleClick = () => {
    setShowThreadList(true);
  };

  return (
    <Container fluid onClick={handleClick} style={{ padding: "20px" }}>
      <Row className="mb-3">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={{ span: 6, offset: 3 }}>
          <NewThread />
        </Col>
      </Row>
      {showThreadList && (
        <Row>
          <Col>
            <ThreadList />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DiscussMain;
