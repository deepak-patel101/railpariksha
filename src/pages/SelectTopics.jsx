import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { IoMdArrowDropright } from "react-icons/io";

const SelectTopics = () => {
  const { subject, setSubject, setActivePage } = useGlobalContext();

  useEffect(() => {
    setActivePage("Admin");
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const handleGoBack = () => {
    navigate("/TestSeries");
  };
  const handleTest = (topic, topicCode) => {
    setSubject({
      ...subject,
      selectedTopic: topic,
      selectedTopicCode: topicCode,
    });
    navigate("/TestSeries/Select-Test");
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
    <div className="container text-start mt-12" style={{ minHeight: "90vh" }}>
      {" "}
      <div class="d-flex flex-row  align-items-center mb-3">
        <div class="p-2">
          <IoArrowBackCircleOutline
            className="backBtn "
            style={{
              borderRadius: "100%",
              border: "0px",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={handleGoBack}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = ""; // Reset to default
              e.target.style.color = ""; // Reset to default
            }}
          />
        </div>
        <div class="p-2">
          <h3>Select Topic for {subject.subject}</h3>
        </div>
      </div>
      <hr />
      {/* //////////////////////////////////////////////////////////////// */}
      <div className="row">
        {subject &&
          Object.entries(subject?.topics).map(([key, value]) => {
            const recentCount = countRecentTopics(value);

            return (
              <div key={key} className="col-md-4 mb-3 parent " style={{}}>
                <div className="card Subject underline position-relative">
                  {recentCount > 0 && (
                    <span className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      New
                    </span>
                  )}
                  <div className="card-body  position-relative m-2">
                    <p
                      className="position-absolute top-0 start-0 "
                      style={{ fontSize: "12px" }}
                    >
                      {subject.department}
                    </p>
                    <div className="position-absolute top-50 end-0 d-flex arrow justify-content-center align-items-center text-center">
                      <IoMdArrowDropright />
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12">
                        <div className="container text-center">
                          <div className="row  pb-1">
                            <p className="col m-1">
                              <FaBook /> {value.topic}
                            </p>
                          </div>
                        </div>
                        <div className="container text-center">
                          <div className="row">
                            {/* <button
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
                          </button> */}
                            <div
                              className="col btn btn-outline-danger m-1"
                              onClick={() =>
                                handleTest(value.topic, value.topcode)
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
      {/* //////////////////////////////////////////////////////////////// */}
    </div>
  );
};
export default SelectTopics;
