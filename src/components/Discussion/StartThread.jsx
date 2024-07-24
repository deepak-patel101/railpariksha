import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import axios from "axios";
import GoBackCom from "../GoBackCom";
import ReplyFrom from "./ReplyFrom";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";

const StartThread = () => {
  const { selectedThread } = useGlobalContext();
  const [replies, setReplies] = useState(selectedThread?.replies);
  const [repliesA, setRepliesA] = useState();

  const [threadLikes, setThreadLikes] = useState(selectedThread?.postlike || 0);
  const [threadDislikes, setThreadDislikes] = useState(
    selectedThread?.postdislike || 0
  );
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [userReplyInteractions, setUserReplyInteractions] = useState(
    selectedThread?.replies?.reduce((acc, reply) => {
      acc[reply.id] = { liked: false, disliked: false };
      return acc;
    }, {})
  );

  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `https://railwaymcq.com/railwaymcq/RailPariksha/post_reply_api.php?thread_id=${selectedThread?.id}`
      );
      setReplies(response.data);
      setRepliesA(response.data);
    } catch (error) {
      console.error("There was an error fetching the replies!", error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);
  const handleReplyPosted = (newReply) => {
    setReplies((prevReplies) => [...prevReplies, newReply]);
    // fetchReplies();
  };
  const handleView = () => {
    axios
      .put(
        "https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php",
        {
          id: selectedThread?.id,
          views: true,
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error updating the like count!", error);
      });
  };
  useEffect(() => {
    handleView();
  }, []);
  const handleLike = () => {
    if (!userLiked) {
      const newLikes = userDisliked ? threadLikes + 1 : threadLikes + 1;
      const newDislikes = userDisliked ? threadDislikes - 1 : threadDislikes;

      setThreadLikes(newLikes);
      setThreadDislikes(newDislikes);
      setUserLiked(true);
      setUserDisliked(false);

      axios
        .put(
          "https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php",
          {
            id: selectedThread?.id,
            likes: newLikes,
            dislikes: newDislikes,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error("There was an error updating the like count!", error);
        });
    }
  };

  const handleDislike = () => {
    if (!userDisliked) {
      const newDislikes = userLiked ? threadDislikes + 1 : threadDislikes + 1;
      const newLikes = userLiked ? threadLikes - 1 : threadLikes;

      setThreadDislikes(newDislikes);
      setThreadLikes(newLikes);
      setUserDisliked(true);
      setUserLiked(false);

      axios
        .put(
          "https://railwaymcq.com/railwaymcq/RailPariksha/post_thread_api.php",
          {
            id: selectedThread?.id,
            likes: newLikes,
            dislikes: newDislikes,
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error(
            "There was an error updating the dislike count!",
            error
          );
        });
    }
  };

  const handleReplyLike = (replyId) => {
    if (!userReplyInteractions[replyId]?.liked) {
      const newReplies = replies?.map((reply) => {
        if (reply.id === replyId) {
          const newLikes = reply.likes + 1;
          const newDislikes = userReplyInteractions[replyId]?.disliked
            ? (reply.dislikes || 0) - 1
            : reply.dislikes;

          return { ...reply, likes: newLikes, dislikes: newDislikes };
        }
        return reply;
      });

      setReplies(newReplies);
      setUserReplyInteractions((prevState) => ({
        ...prevState,
        [replyId]: { liked: true, disliked: false },
      }));

      axios
        .put(
          "https://railwaymcq.com/railwaymcq/RailPariksha/post_reply_api.php",
          {
            id: replyId,
            likes: replies?.find((reply) => reply.id === replyId).likes + 1,
            dislikes: userReplyInteractions[replyId].disliked
              ? replies?.find((reply) => reply.id === replyId).dislikes - 1
              : replies?.find((reply) => reply.id === replyId).dislikes,
            replylikeflag: "1",
            replydislikeflag: userReplyInteractions[replyId].disliked
              ? "0"
              : "0",
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error(
            "There was an error updating the reply like count!",
            error
          );
        });
    }
  };

  const handleReplyDislike = (replyId) => {
    if (!userReplyInteractions[replyId]?.disliked) {
      const newReplies = replies?.map((reply) => {
        if (reply.id === replyId) {
          const newDislikes = (reply.dislikes || 0) + 1;
          const newLikes = userReplyInteractions[replyId]?.liked
            ? reply.likes > 0
              ? reply.likes - 1
              : reply.likes
            : reply.likes;

          return { ...reply, dislikes: newDislikes, likes: newLikes };
        }
        return reply;
      });

      setReplies(newReplies);
      setUserReplyInteractions((prevState) => ({
        ...prevState,
        [replyId]: { liked: false, disliked: true },
      }));

      axios
        .put(
          "https://railwaymcq.com/railwaymcq/RailPariksha/post_reply_api.php",
          {
            id: replyId,
            likes: userReplyInteractions[replyId].liked
              ? replies?.find((reply) => reply.id === replyId).likes - 1
              : replies?.find((reply) => reply.id === replyId).likes,
            dislikes:
              replies?.find((reply) => reply.id === replyId).dislikes + 1,
            replylikeflag: userReplyInteractions[replyId].liked ? "0" : "0",
            replydislikeflag: "1",
          }
        )
        .then((response) => {})
        .catch((error) => {
          console.error(
            "There was an error updating the reply dislike count!",
            error
          );
        });
    }
  };

  return (
    <div className="container">
      <GoBackCom page={"Start Discussion"} link={"/MyIdeas"} />
      <div className="card text-white bg-success mb-3">
        <div className="card-body">
          <FaUserCircle style={{ marginRight: "8px", color: "green" }} />
          <strong className="me-2">{selectedThread?.uname}:</strong>
          <strong className="me-3">Title: </strong>{" "}
          <h5 className="card-title">{selectedThread?.title} </h5>
          <strong>Topic:</strong>{" "}
          <p className="card-text">{selectedThread?.content}</p>
          <div className="d-flex align-items-center">
            <SlLike
              size={20}
              onClick={handleLike}
              style={{ cursor: "pointer" }}
            />
            <span className="ms-2">{threadLikes}</span>
            <SlDislike
              size={20}
              onClick={handleDislike}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
            <span className="ms-2">{threadDislikes}</span>
          </div>
          <div className="card text-white bg-secondary mb-3 mt-3">
            {replies?.length > 0 ? (
              replies?.map((reply) => (
                <div key={reply.id} className="card-body">
                  <div className="d-flex align-items-center">
                    <FaUserCircle
                      style={{ marginRight: "8px", color: "green" }}
                    />

                    <strong className="me-2">{reply.uname}:</strong>
                    <div className="card-text mb-0">{reply.content}</div>
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <SlLike
                      size={20}
                      onClick={() => handleReplyLike(reply.id)}
                      style={{ cursor: "pointer" }}
                    />
                    <span className="ms-2">{reply.likes || 0}</span>
                    <SlDislike
                      size={20}
                      onClick={() => handleReplyDislike(reply.id)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                    <span className="ms-2">{reply.dislikes || 0}</span>
                  </div>
                  <div className="text-muted small mt-2">
                    {reply.created_at}
                  </div>
                </div>
              ))
            ) : (
              <div className="card-body">
                <p className="card-text">No replies yet.</p>
              </div>
            )}
          </div>
          <ReplyFrom
            threadId={selectedThread?.id}
            onReplyPosted={handleReplyPosted}
          />
        </div>
      </div>
    </div>
  );
};

export default StartThread;
