import React, { useState, useEffect } from "react";
import axios from "axios";
import ReplyFrom from "./ReplyFrom"; // Corrected typo from ReplyFrom to ReplyForm
import { useGlobalContext } from "../../Context/GlobalContextOne";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

function ThreadList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setThreadData, thread: threads } = useGlobalContext();

  const fetchThreads = () => {
    axios
      .get("https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php")
      .then((response) => {
        setThreadData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the threads!", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div>
      {threads?.map((thread) => (
        <Card key={thread.id} className="mb-3">
          <Card.Body>
            <Card.Title>{thread.title}</Card.Title>
            <Card.Text>{thread.content}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">Replies</Card.Subtitle>
            <div>
              {thread.replies.map((reply) => (
                <Card key={reply.id} className="mb-2">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <strong className="me-2">{reply.uname}:</strong>
                      <Card.Text className="mb-0">{reply.content}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <ReplyFrom
              threadId={thread.id}
              onReplyPosted={() => fetchThreads()}
            />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ThreadList;
