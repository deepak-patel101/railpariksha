import React from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { PiExamFill } from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useTestContext } from "../Context/TestContext";
const SelectTestToDo = ({ testType, bgColor }) => {
  const { subject, setSubject } = useGlobalContext();
  const { test_loading, test_data, test_error } = useTestContext();

  return (
    <div className="row overflow-auto" style={{ maxHeight: "500px" }}>
      {test_data != null ? (
        <>
          {Object.entries(test_data).map(([key, value]) => {
            return (
              <>
                {key === testType ? (
                  <>
                    {Object.keys(value).length === 0 ? (
                      <h5 style={{ color: "red" }}>
                        {" "}
                        <MdOutlineErrorOutline /> No Tests Found
                      </h5>
                    ) : (
                      <>
                        {Object.entries(value).map(([setNo, test], index) => {
                          return (
                            <div
                              key={index}
                              className="col-md-3 mb-3 parent "
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <div
                                className="card Subject underline"
                                style={{
                                  background: `linear-gradient(to bottom, white,${bgColor})`,
                                }}
                              >
                                <div className="card-body  m-2">
                                  <div class="d-flex position-relative justify-content-between">
                                    <div
                                      className=" "
                                      style={{
                                        fontSize: "14px",
                                        marginBottom: "0",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      {subject.department}
                                    </div>{" "}
                                    <div style={{ fontSize: "14px" }}>
                                      {setNo}
                                    </div>
                                  </div>{" "}
                                  {/* <div className="position-absolute top-50 end-0 d-flex arrow justify-content-center align-items-center text-center">
                                  <IoMdArrowDropright />
                                </div> */}
                                  <div className="row">
                                    <div className="col-12 col-sm-12">
                                      <div className="container text-center">
                                        <div className="row  pb-1">
                                          <ul
                                            className="col m-1 text-start"
                                            style={{ fontSize: "14px" }}
                                          >
                                            {" "}
                                            <hr />
                                            <li>
                                              Subject - {subject.subject}
                                            </li>{" "}
                                            <li>
                                              Topic - {subject.selectedTopic}
                                            </li>
                                            <li>Question - {test.length}</li>
                                            <li>Language - English</li>
                                            <li>
                                              Difficulty -{" "}
                                              {testType === "easy"
                                                ? "Easy"
                                                : testType === "tough"
                                                ? "Tough"
                                                : testType === "moderate"
                                                ? "Moderate"
                                                : "Mixed"}
                                            </li>
                                            <li>
                                              quiz Time -{" "}
                                              {testType === "easy" ||
                                              testType === "tough" ||
                                              testType === "moderate"
                                                ? "10:00"
                                                : testType === "random"
                                                ? "15:00"
                                                : "30:00"}
                                            </li>{" "}
                                            <hr />
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="container text-center">
                                        <div className="row">
                                          <div className="col btn btn-outline-danger m-1">
                                            <PiExamFill /> Start Test
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
                      </>
                    )}
                  </>
                ) : null}
              </>
            );
          })}
        </>
      ) : (
        <h3 style={{ color: "red" }}>Something went wrong</h3>
      )}
    </div>
  );
};
export default SelectTestToDo;
