import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { useNavigate } from "react-router-dom";
import { useTestContext } from "../Context/TestContext";

const QuestionPaper = () => {
  const { subject } = useGlobalContext();
  const {
    start_Test,
    updateActiveQuestionStatus,
    updateActiveQuestion,
    userResponse,
    updateUserResponse,
    countDown,
  } = useTestContext();

  const [selectedOption, setSelectedOption] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const [msg, setMsg] = useState(false);
  const [time, setTime] = useState(0); // State to keep track of elapsed time
  const [isRunning, setIsRunning] = useState(false); // State to control timer start/stop
  const [submitTestTimer, setSubmitTestTimer] = useState(false);
  const [submitPopUp, setSubmitPopUp] = useState(false);

  const navigate = useNavigate();

  const submitTest = (action) => {
    if (action === "submit") {
      if (countDown?.remainingTime !== "0:0") {
        const confirmSubmit = window.confirm(
          `Are you sure you want to submit the test? You have ${countDown.remainingTime} minutes left`
        );
        if (!confirmSubmit) {
          return; // Cancel submission if user clicks cancel in the confirmation dialog
        }
      }

      setSubmitPopUp(true);
      setTimeout(() => {
        setSubmitTestTimer(true);
      }, 2000); // Start the timer after 2 seconds
    }
  };

  useEffect(() => {
    // Check if both submitTestTimer and submitPopUp are true for navigation
    if (submitTestTimer && submitPopUp) {
      setSubmitPopUp(false);
      navigate("/TestSeries/Score-card");
    }
  }, [submitTestTimer, submitPopUp]);

  useEffect(() => {
    // Check if countdown reaches "0:0" and submitTestTimer is not true
    if (countDown?.remainingTime === "0:0" && !submitTestTimer) {
      setSubmitPopUp(true);
      setTimeout(() => {
        setSubmitTestTimer(true);
      }, 4000); // Start the timer after 4 seconds (adjust as needed)
    }
  }, [countDown?.remainingTime, submitTestTimer]);

  useEffect(() => {
    setSelectedOption(null);
    setMsg(false);
  }, [questionData]);

  useEffect(() => {
    if (!start_Test?.activeQuestion) {
      setQuestionData(start_Test?.test[0]);
    } else {
      setQuestionData(start_Test?.test[Number(start_Test?.activeQuestion)]);
    }
  }, [start_Test?.activeQuestion]);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const style = {
    boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "500px",
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const testAnswerForQuestion =
    userResponse?.testAnswer[questionIndex]?.timeTaken;
  const handleBtnClicked = (action) => {
    if (action === "Next" || action === "Previous") {
      if (testAnswerForQuestion) {
      }
      const userResp = {
        ...userResponse?.testAnswer[questionIndex],
        timeTaken: !testAnswerForQuestion
          ? time
          : Number(time) + Number(testAnswerForQuestion),
      };

      updateUserResponse(userResp);
      setIsRunning(false);
      if (!questionData.activeQuestionStatus) {
        updateActiveQuestionStatus("Next");
      }

      let nextQuestionIndex;
      if (action === "Next") {
        nextQuestionIndex = Math.min(
          Number(start_Test.activeQuestion) + 1,
          Object.keys(start_Test.test).length - 1
        );
      } else {
        nextQuestionIndex = Math.max(Number(start_Test.activeQuestion) - 1, 0);
      }

      updateActiveQuestion(nextQuestionIndex);
    } else if (action === "Mark&review") {
      const userResp = {
        ...userResponse?.testAnswer[questionIndex],
        timeTaken: !testAnswerForQuestion
          ? time
          : Number(time) + Number(testAnswerForQuestion),
      };
      updateUserResponse(userResp);

      updateActiveQuestionStatus(action);
      setIsRunning(false);
      let nextQuestionIndex = Math.min(
        Number(start_Test.activeQuestion) + 1,
        Object.keys(start_Test.test).length - 1
      );
      updateActiveQuestion(nextQuestionIndex);
    } else if (action === "Save&next") {
      setIsRunning(false);
      if (selectedOption === null) {
        setMsg(true);
      } else {
        const userResp = {
          ...userResponse?.testAnswer[questionIndex],
          answer: selectedOption,
          timeTaken: !testAnswerForQuestion
            ? time
            : Number(time) + Number(testAnswerForQuestion),
        };

        updateUserResponse(userResp);
        updateActiveQuestionStatus(action);

        let nextQuestionIndex = Math.min(
          Number(start_Test.activeQuestion) + 1,
          Object.keys(start_Test.test).length
        );

        if (nextQuestionIndex === Object.keys(start_Test.test).length) {
          nextQuestionIndex = Object.keys(start_Test.test).length - 1;
        }

        updateActiveQuestion(nextQuestionIndex);
      }
    }
  };

  useEffect(() => {
    const qIndex = Math.min(
      Number(start_Test.activeQuestion) + 1,
      Object.keys(start_Test.test).length
    );
    setQuestionIndex(qIndex - 1);
  }, [start_Test.activeQuestion]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Increment the time every second
    } else {
      setTime(0);
    }
    return () => clearInterval(timer); // Cleanup the interval on component unmount or when isRunning changes
  }, [isRunning]);

  useEffect(() => {
    setIsRunning(true);
  }, [start_Test.activeQuestion]);

  return (
    <div className="col-12 col-md-12" style={style}>
      {submitPopUp ? (
        <div>
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
          >
            <div
              style={{
                boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                background: "white",
                borderRadius: "15px",
              }}
              className="position-relative "
            >
              <div className="m-3">
                <div className="spinner-border" role="status"></div>{" "}
                <p>Submitting your test </p>
                <p>Working on your Report Card.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // /////////////////////SECOND PART OF CONDITION ///////////////////////
        <div className="container" style={{ flex: "1" }}>
          <div className="row">
            <div className="justify-content-center align-items-center text-center">
              <h5>{subject.selectedTopic}</h5>
              <hr />
            </div>
          </div>
          <div
            className="row overflow-x"
            style={{
              minHeight: screenSize.width > 770 ? "240px" : "",
              // maxHeight: "auto",
            }}
          >
            <b className="text-start">
              Q.
              {!start_Test?.activeQuestion
                ? "1"
                : Number(start_Test?.activeQuestion) + 1}{" "}
              - {questionData?.question}
            </b>

            <div
              // style={{ paddingBottom: "50px" }}
              className="row m-1 text-start"
            >
              {questionData?.options?.map((option, index) => {
                let selectedAns;

                // Corrected the syntax for Object.entries and assignment logic
                Object.entries(userResponse.testAnswer).map(
                  ([qNo, ansData]) => {
                    if (qNo == start_Test?.activeQuestion) {
                      selectedAns = ansData.answer;
                      return;
                    }
                  }
                );

                return (
                  <div className="form-check m-1" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="optionRadio"
                      id={`flexRadioDefault${index}`}
                      checked={
                        selectedAns
                          ? selectedAns === option
                          : selectedOption === option
                      }
                      onChange={() => handleOptionChange(option)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexRadioDefault${index}`}
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div style={{ marginTop: "20px" }}>
            {screenSize.width >= 500 ? (
              <div className="row">
                <div className="d-flex justify-content-center align-items-center text-center">
                  <div className="">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleBtnClicked("Previous")}
                    >
                      previous
                    </button>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-warning m-1"
                      onClick={() => handleBtnClicked("Mark&review")}
                    >
                      Mark for review
                    </button>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleBtnClicked("Next")}
                    >
                      next
                    </button>
                  </div>
                  <div className="ms-auto">
                    {start_Test.activeQuestion ===
                    Object.keys(start_Test.test).length - 1 ? (
                      <button
                        className="btn btn-success m-1"
                        onClick={() => {
                          handleBtnClicked("Save&next");
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-success m-1"
                        onClick={() => handleBtnClicked("Save&next")}
                      >
                        save & next
                      </button>
                    )}
                    {msg ? (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          margin: "0px",
                          padding: "0px",
                        }}
                      >
                        please select an option first
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="container text-center">
                <div className="row">
                  <div className="col-6 col-sm-3">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleBtnClicked("Previous")}
                    >
                      previous
                    </button>
                  </div>
                  <div className="col-6 col-sm-3">
                    <button
                      className="btn btn-warning m-1"
                      onClick={() => handleBtnClicked("Mark&review")}
                    >
                      Mark for review
                    </button>
                  </div>

                  <div className="w-100"></div>

                  <div className="col-6 col-sm-3">
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleBtnClicked("Next")}
                    >
                      next
                    </button>
                  </div>
                  <div className="col-6 col-sm-3">
                    {start_Test.activeQuestion ===
                    Object.keys(start_Test.test).length - 1 ? (
                      <button
                        className="btn btn-success m-1"
                        onClick={() => {
                          handleBtnClicked("Save&next");
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-success m-1"
                        onClick={() => handleBtnClicked("Save&next")}
                      >
                        save & next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}{" "}
            <hr />
            <div className="row">
              <button
                className="btn btn-danger m-1"
                onClick={() => {
                  submitTest("submit");
                }}
              >
                Submit
              </button>
            </div>
          </div>{" "}
          <p>
            {" "}
            Note: in case of wrong or inappropriate translation please set the
            language to English.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;
