import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { SlLike, SlDislike } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import throttle from "lodash/throttle";

function ThreadList({ threadsUpdated }) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopFetching, setStopFetching] = useState(false);
  const { setThreadData, threadControl } = useGlobalContext();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const fetchData = async (offset) => {
    if (stopFetching) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://railwaymcq.com/railwaymcq/RailPariksha/thread_feed_page_api.php?offset=${offset}&limit=5&search=${threadControl.search}&explore=${threadControl.explore}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newItems = await response.json();
      if (newItems.length < 5) {
        setStopFetching(true);
      }
      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setItems([]);
    setOffset(0);
    setStopFetching(false);
  }, [threadControl.search, threadControl.feed, threadControl.explore]);

  useEffect(() => {
    if (!stopFetching) {
      fetchData(offset);
    }
  }, [
    offset,
    stopFetching,
    threadControl.feed,
    threadControl.search,
    threadControl.explore,
  ]);

  const handleScroll = useCallback(
    throttle(() => {
      const container = containerRef.current;
      if (container) {
        if (
          container.scrollHeight - container.scrollTop ===
          container.clientHeight
        ) {
          setOffset((prevOffset) => prevOffset + 5);
        }
      }
    }, 200),
    [stopFetching]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  const handleSelectedThread = (data) => {
    setThreadData({ selectedThread: data });
    navigate("/MyIdeas/Start-Discussion");
  };

  return (
    <div
      className="scrollspy-example-2"
      ref={containerRef}
      style={{
        height: "600px",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <div style={{ height: "600px" }}>
        {items?.map((thread) => (
          <Card key={thread.id} className="mb-3 Subject">
            <div className="d-flex justify-content-between">
              <div>
                <FaUserCircle style={{ marginRight: "8px", color: "green" }} />
                <span>{thread.uname}</span>
              </div>
              <div style={{ fontSize: "10px" }}>
                Posted On {thread.created_at}
              </div>
            </div>
            <Card.Body
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectedThread(thread)}
            >
              <Card.Title>{thread.title}</Card.Title>
              <Card.Text>{thread.content}</Card.Text>
              <hr />
              <div
                className="d-flex justify-content-around"
                style={{ height: "10px" }}
              >
                <div className="d-flex justify-content-center align-item-center">
                  <SlLike
                    className="m-1"
                    size={15}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="ms-2">{thread.likes}</div> &#160;&#160;
                  <SlDislike
                    className="m-1"
                    size={15}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                  <div className="ms-2">{thread.dislikes}</div>
                </div>

                <div>Views {thread.views}</div>
              </div>
            </Card.Body>
          </Card>
        ))}
        {stopFetching ? (
          <div className="alert alert-primary">No more threads</div>
        ) : null}
        {loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadList;
