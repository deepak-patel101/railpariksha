import React, { useState, useEffect } from "react";
import ThreadList from "./Discussion/ThreadList";
import NewThread from "./Discussion/NewThread";
import GoBackCom from "./GoBackCom";
import DiscussionControl from "./Discussion/DiscussionControl";
import WhatsNew from "./Discussion/WhatsNew";
import { FaRegNewspaper } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";

function DiscussMain() {
  const [showNewThread, setNewThread] = useState(false);
  const [threadsUpdated, setThreadsUpdated] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNews, setOpenNews] = useState(false);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleThreadCreated = () => {
    setNewThread(false);
    setThreadsUpdated((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Initial set of screen size
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const handleBtnClick = (btn) => {
    if (btn === "menu") {
      setOpenMenu(!openMenu);
    }
    if (btn === "news") {
      setOpenNews(!openNews);
    }
  };

  return (
    <div className="container">
      <GoBackCom link={"/"} page={"Discussion"} />

      <div className="row papaDiv">
        {screenSize.width < 770 ? (
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-outline-darK"
              onClick={() => handleBtnClick("menu")}
            >
              <GiHamburgerMenu />
            </button>
            <h6>Let them Know, What is in your mind..?</h6>
            <button
              className="btn btn-sm btn-outline-darK"
              onClick={() => handleBtnClick("news")}
            >
              <FaRegNewspaper />
            </button>
          </div>
        ) : (
          <div className="col-12 col-md-3">
            <DiscussionControl />
          </div>
        )}
        {openMenu && (
          <div
            style={{
              margin: "0",
              position: "fixed",
              top: "0",
              left: "0",
              height: "100vh",
              width: "100vw",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
            onClick={() => setOpenMenu(false)}
          >
            <div
              className="position-relative p-2"
              style={{
                boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                background: "white",
                borderRadius: "15px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  background: "white",
                  borderRadius: "50%",
                  zIndex: "100",
                }}
                onClick={() => setOpenMenu(false)}
              >
                <IoCloseCircleSharp
                  style={{
                    color: "red",
                    boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="col-12 col-md-3" style={{ maxWidth: "300px" }}>
                <DiscussionControl />
              </div>
            </div>
          </div>
        )}
        {openNews && (
          <div
            style={{
              margin: "0",
              position: "fixed",
              top: "0",
              left: "0",
              height: "100vh",
              width: "100vw",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
            onClick={() => setOpenNews(false)}
          >
            <div
              className="position-relative p-2"
              style={{
                boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                background: "white",
                borderRadius: "15px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  background: "white",
                  borderRadius: "50%",
                  zIndex: "100",
                }}
                onClick={() => setOpenNews(false)}
              >
                <IoCloseCircleSharp
                  style={{
                    color: "red",
                    boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="col-12 col-md-3">
                <WhatsNew />
              </div>
            </div>
          </div>
        )}
        <div className="col-12 col-md-6">
          <div className="row papaDiv mb-2 m-1">
            {screenSize.width < 770 ? null : (
              <h6>Let them Know, What is in your mind..?</h6>
            )}
            <NewThread onThreadCreated={handleThreadCreated} />
          </div>
          <div className="row">
            <ThreadList threadsUpdated={threadsUpdated} />
          </div>
        </div>

        {screenSize.width < 770 ? null : (
          <div className="col-12 col-md-3">
            <WhatsNew />
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscussMain;
