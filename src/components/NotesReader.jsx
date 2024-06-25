import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { FaFilePdf } from "react-icons/fa6";
import PdfReader from "./PdfReader";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { PiExamFill } from "react-icons/pi";

const NotesReader = () => {
  const { subject, setSubject } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();

  const handleTest = (topic, topicCode) => {
    setSubject({
      ...subject,
      selectedTopic: topic,
      selectedTopicCode: topicCode,
    });
    navigate("/TestSeries/Select-Test");
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isRecent = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const countRecentTopics = (topic) => {
    let recentCount = 0;

    if (isRecent(topic.createdOn)) {
      recentCount++;
    }

    return recentCount;
  };

  return (
    <div
      className="p-4"
      style={{
        background: "white",
        maxHeight: "80vh",
        maxWidth: "150vh",
        boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
        borderRadius: "10px",
      }}
    >
      {readMore ? (
        <div
          style={{
            margin: "0",
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            zIndex: "1",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
            borderRadius: "15px",
            alignItems: "center",
          }}
          onClick={() => setReadMore(!readMore)}
        >
          <div
            style={
              {
                // boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                // background: "white",
                // borderRadius: "15px",
              }
            }
            className="position-relative "
            onClick={(e) => e.stopPropagation()} // Stop click event propagation
          >
            <div
              className="position-absolute top-0 end-0 d-flex  justify-content-center align-items-center text-center  "
              style={{
                // height: "15px",
                // width: "15px",
                marginTop: "20px",
                cursor: "pointer",
                background: "white",
                borderRadius: "50%",
                // zIndex: "9",
              }}
              onClick={() => setReadMore(!readMore)}
            >
              <IoCloseCircleSharp
                className=" "
                style={{
                  // zIndex: "10",
                  margin: "1px",
                  color: "red",
                  padding: "0",
                  boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                  borderRadius: "50%",
                }}
              />
            </div>
            <PdfReader onClick={(e) => e.stopPropagation()} link={true} />
          </div>
        </div>
      ) : null}
      <div className="row">
        <div
          className="col-4"
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            position: "fix",
          }}
        >
          <nav
            id="navbar-example3"
            className="h-100 flex-column align-items-stretch pe-4 border-end"
            style={{ background: "white", height: "auto" }}
          >
            <nav className="nav nav-pills flex-column" style={{}}>
              {Object.entries(subject?.topics).map(([key, value], index) => {
                const recentCount = countRecentTopics(value);
                return (
                  <a
                    style={{ fontSize: "12px" }}
                    key={key}
                    className="btn btn-sm btn-outline-primary  position-relative m-1"
                    href={`#item-${key}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(`item-${key}`);
                    }}
                  >
                    {value.topic}{" "}
                    {recentCount > 0 && (
                      <span className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        New
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </nav>
        </div>

        <div className="col-8">
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example3"
            data-bs-smooth-scroll="true"
            className="scrollspy-example-2"
            tabIndex="0"
            style={{ maxHeight: "70vh", overflowY: "auto", position: "fix" }}
          >
            {Object.entries(subject?.topics).map(([key, value], index) => {
              return (
                <div id={`item-${key}`} key={key}>
                  <h4>{value.topic}</h4>
                  <p>
                    <ul>
                      <li>
                        <strong>1.7.4 Over Head equipment (OHE)</strong>
                        <br />A system of conductors / equipments carrying
                        traction power from traction sub station to electric
                        locomotive.
                      </li>
                      <li>
                        <strong>1.7.5 Neutral Section (NS)</strong>
                        <br />
                        To separate OHE of two adjoining feed posts. A short
                        neutral section (PTFE) type is provided opposite the
                        Traction Sub Station to avoid the need of lowering the
                        pantograph during extended feed conditions.
                      </li>
                      <li>
                        <strong>1.7.6 Sectioning Post (SP)</strong>
                        <br />
                        <ol>
                          <li>
                            To facilitate the extension of traction power from
                            one feed zone to half of the adjoining feed zone
                            during emergency.
                          </li>
                          <li>
                            Parallel the UP and DN OHE in double the sections.
                          </li>
                        </ol>
                      </li>
                      <li>
                        <strong>
                          1.7.7 Sub-sectioning and paralleling post (SSP)
                        </strong>
                      </li>
                    </ul>
                  </p>{" "}
                  <button
                    className="btn btn-outline-success "
                    onClick={() => setReadMore(!readMore)}
                  >
                    {" "}
                    <FaFilePdf /> Read more
                  </button>{" "}
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleTest(value.topic, value.topcode)}
                  >
                    {" "}
                    <PiExamFill /> Have a test
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesReader;
