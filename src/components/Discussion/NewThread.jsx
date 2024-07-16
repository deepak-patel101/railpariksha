import React, { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function NewThread() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  const { setThreadData } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php",
        {
          uid: user?.id,
          uname: user?.name,
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Thread created:", response.data);
        setTitle("");
        setContent("");
        fetchThreads();
        setError(null);
      })
      .catch((error) => {
        console.error("There was an error creating the thread!", error);
        setError(error.message);
      });
  };

  const fetchThreads = () => {
    axios
      .get("https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php")
      .then((response) => {
        setThreadData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the threads!", error);
        setError(error.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="btn btn-success" type="submit">
        Create Thread
      </Button>
      {error && (
        <Alert variant="danger" className="mt-3">
          Error: {error}
        </Alert>
      )}
    </Form>
  );
}

export default NewThread;
