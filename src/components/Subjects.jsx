import React, { useState, useEffect } from "react";
import "./css/Subject.css";
import { FaBook } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { IoMdArrowDropright } from "react-icons/io";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { IoCloseCircleSharp } from "react-icons/io5";
import NotesReader from "./NotesReader";
import { useNavigate } from "react-router-dom";

const Subjects = ({ department }) => {
  const { subject, setSubject } = useGlobalContext();
  const [notesBtnClicked, setNotesBtnClicked] = useState(false);
  const subjectList = department?.subjects;

  const navigate = useNavigate();

  const handleTest = (obj) => {
    setSubject(obj);
    navigate("/TestSeries/Select-Topics");
  };
  const handleNotes = (obj) => {
    setNotesBtnClicked(!notesBtnClicked);
    setSubject(obj);
  };

  const isRecent = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const countRecentTopics = (subject) => {
    let recentCount = 0;

    subject.topics.forEach((topic) => {
      if (isRecent(topic.createdOn)) {
        recentCount++;
      }
    });
    return recentCount;
  };

  return (
    <div className="container mt-5" style={{ fontSize: "14px" }}>
      {notesBtnClicked ? (
        <div
          style={{
            margin: "0",
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            zIndex: "3",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setNotesBtnClicked(!notesBtnClicked)}
        >
          <div
            className="position-relative boxRadios "
            style={{
              boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)",
              borderRadius: "15px",
            }}
            onClick={(e) => e.stopPropagation()} // Stop click event propagation
          >
            <div
              className="position-absolute top-0 end-0 m-2 "
              style={{
                cursor: "pointer",
                background: "white",
              }}
              onClick={() => setNotesBtnClicked(!notesBtnClicked)}
            >
              <IoCloseCircleSharp
                style={{
                  color: "red",
                  boxShadow: "5px 5px 10px rgba(0,0,0, 0.3)",
                  borderRadius: "50%",
                }}
              />
            </div>
            <NotesReader onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      ) : null}
      <div className="row">
        {subjectList &&
          Object.entries(department?.subjects).map(([key, value]) => {
            const recentCount = countRecentTopics(value);

            return (
              <div
                key={key}
                className="col-md-4 mb-3 parent "
                style={{ cursor: "pointer" }}
              >
                <div className="card Subject underline position-relative">
                  {recentCount > 0 && (
                    <span className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {recentCount}
                    </span>
                  )}
                  <div className="card-body  position-relative m-2">
                    <p
                      className="position-absolute top-0 start-0 "
                      style={{ fontSize: "12px" }}
                    >
                      {department.deptt}
                    </p>
                    <div className="position-absolute top-50 end-0 d-flex arrow justify-content-center align-items-center text-center">
                      <IoMdArrowDropright />
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <div className="container text-center">
                          <div className="row  pb-1">
                            <p className="col m-1">
                              <FaBook /> {value.sub}
                            </p>
                          </div>
                        </div>
                        <div className="container text-center">
                          <div className="row">
                            <button
                              className="col btn btn-outline-success m-1"
                              onClick={() =>
                                handleNotes({
                                  department: department.deptt,
                                  departmentCode: department.depttcode,
                                  subject: value.sub,
                                  topics: value.topics,
                                  subjectCode: key,
                                })
                              }
                            >
                              <FaBook /> Notes
                            </button>
                            <div
                              className="col btn btn-outline-danger m-1"
                              onClick={() =>
                                handleTest({
                                  department: department.deptt,
                                  departmentCode: department.depttcode,
                                  subject: value.sub,
                                  topics: value.topics,
                                  subjectCode: key,
                                })
                              }
                            >
                              <PiExamFill /> Test
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Subjects;
