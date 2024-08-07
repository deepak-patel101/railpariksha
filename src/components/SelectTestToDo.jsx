import React from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { PiExamFill } from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useTestContext } from "../Context/TestContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const SelectTestToDo = ({ testType, bgColor }) => {
  const { subject } = useGlobalContext();
  const {
    test_loading,
    temp_test_data: test_data,
    test_error,
    SetStartTestData,
  } = useTestContext();
  const navigate = useNavigate();

  const startTest = (testDataToStartTest) => {
    SetStartTestData(testDataToStartTest);
    navigate("/TestSeries/Start-Test");
  };
  return (
    <div className="row overflow-auto" style={{ maxHeight: "500px" }}>
      {test_loading ? (
        <h4>
          loading tests <Loading />
        </h4>
      ) : (
        <div>
          {test_data != null ? (
            <div>
              {Object.entries(test_data).map(([key, value]) => {
                if (key === testType) {
                  return (
                    <div key={key}>
                      {Object.keys(value).length === 0 ? (
                        <h5 style={{ color: "red" }}>
                          <MdOutlineErrorOutline /> No Tests Found
                        </h5>
                      ) : (
                        <div className="row">
                          {Object.entries(value).map(([setNo, test], index) => (
                            <div
                              key={index}
                              className="col-md-3 mb-3"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="card Subject underline"
                                style={{
                                  background: `linear-gradient(to bottom, white,${bgColor})`,
                                }}
                              >
                                <div className="card-body m-2">
                                  <div className="d-flex position-relative justify-content-between">
                                    <div
                                      className="text-muted"
                                      style={{
                                        fontSize: "14px",
                                        marginBottom: "0",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      {subject.department}
                                    </div>
                                    <div style={{ fontSize: "14px" }}>
                                      {setNo}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-sm-12">
                                      <div className="container text-center">
                                        <div className="row pb-1">
                                          <ul
                                            className="col m-1 text-start"
                                            style={{ fontSize: "14px" }}
                                          >
                                            <hr />
                                            <li>Subject - {subject.subject}</li>
                                            <li>
                                              Topic - {subject.selectedTopic}
                                            </li>
                                            <li>Question - {test.length}</li>
                                            <li>
                                              Language - English , Hindi... etc
                                            </li>
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
                                              Quiz Time - {`${test.length}:00`}
                                            </li>
                                            <hr />
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="container text-center">
                                        <div className="row">
                                          <div
                                            onClick={() =>
                                              startTest({
                                                set: test,
                                                timing: test.length,
                                              })
                                            }
                                            className={`col btn btn-outline-${
                                              testType === "easy"
                                                ? "success"
                                                : testType === "tough"
                                                ? "danger"
                                                : testType === "moderate"
                                                ? "info"
                                                : testType === "random"
                                                ? "warning"
                                                : "danger"
                                            } m-1`}
                                          >
                                            <PiExamFill /> Start Test
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <h3 style={{ color: "red" }}>Something went wrong</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectTestToDo;
