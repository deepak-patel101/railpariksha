import React, { useState, useEffect } from "react";
import axios from "axios";

function ReplyList({ threadId }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://railwaymcq.com/railwaymcq/RailPariksha/post_Reply_api.php?thread_id=${threadId}`
      )
      .then((response) => {
        setReplies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the replies!", error);
        setError(error.message);
        setLoading(false);
      });
  }, [threadId]);

  if (loading) {
    return <div>Loading replies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {replies.map((reply) => (
        <div key={reply.id}>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ReplyList;
