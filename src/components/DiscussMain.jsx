import React, { useState } from "react";
import Header from "./Discussion/Header";
import ThreadList from "./Discussion/ThreadList";
import NewThread from "./Discussion/NewThread";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DiscussMain() {
  const [showNewThread, setNewThread] = useState(false);

  const handleClick = () => {
    setNewThread(true);
  };

  return (
    <Container style={{ padding: "20px" }}>
      <Row className="mb-3">
        <Col md={{ span: 6, offset: 3 }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClick}
          >
            New Post
          </button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Header />
        </Col>
      </Row>
      {showNewThread && (
        <Row>
          <Col>
            <NewThread />
          </Col>
        </Row>
      )}

      <ThreadList />
    </Container>
  );
}

export default DiscussMain;
