import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { LuAlarmClock } from "react-icons/lu";
import { useTestContext } from "../Context/TestContext";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsDisplay } from "react-icons/bs";

const TestControls = () => {
  const [mint, setMint] = useState(null);
  const [sec, setSec] = useState(null);
  const { subject } = useGlobalContext();
  const { start_Test, updateActiveQuestion, countDown, userResponse } =
    useTestContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  const style = {
    boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
  };

  const btn = {
    boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
    borderRadius: "5px",
  };
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

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleClick = (data) => {
    updateActiveQuestion(data);
  };
  useEffect(() => {
    const qIndex = Math.min(
      Number(start_Test.activeQuestion) + 1,
      Object.keys(start_Test.test).length
    );
    setQuestionIndex(qIndex - 1);
  }, [start_Test.activeQuestion]);
  const timeStringToSeconds = (timeString) => {
    if (!timeString) return 0; // Handle case where timeString is undefined or null

    const [minutes, seconds] = timeString.split(":").map(Number);

    if (isNaN(minutes) || isNaN(seconds)) return 0; // Handle invalid format

    return minutes * 60 + seconds;
  };

  const countDownTimerChange = (countdownTime) => {
    if (!countdownTime) return;
    const [minutes, seconds] = countdownTime.split(":").map(Number);
    if (isNaN(minutes) || isNaN(seconds)) {
      setMint(0);
      setSec("00");
      return;
    }
    setMint(minutes);
    setSec(seconds < 10 ? `0${seconds}` : seconds.toString());
  };

  useEffect(() => {
    countDownTimerChange(countDown.remainingTime);
  }, [countDown.remainingTime]);

  const percentage =
    (timeStringToSeconds(countDown.remainingTime) /
      Number(countDown.testTiming * 3600)) *
    100;
  const interpolateColor = (percentage) => {
    // Calculate RGB values based on percentage
    const r = Math.round(255 * (1 - percentage)); // Red component
    const g = Math.round(255 * percentage); // Green component

    // Generate gradient color string
    return `linear-gradient(to bottom, white, rgba(${r}, ${g}, 0, 0.5))`;
  };

  const backgroundColor = interpolateColor(percentage);

  return (
    <div className="container">
      {" "}
      <div className="row m-1" style={style}>
        <h4>{subject.department}</h4>
      </div>
      <div className="row m-1" style={style}>
        <h5>
          <LuAlarmClock /> Test Timer <hr />
        </h5>
        <div
          className="p-2"
          style={{
            background: backgroundColor,
            borderRadius: "5px",
          }}
        >
          <CountdownTimer className="visually-hidden" />
          <h1>{/* {mint}:{sec} */}</h1>
          {/* {countDownTimerChage(countDown.remainingTime)} */}
          <h1>{countDown.remainingTime}</h1>
        </div>
      </div>
      <div className="row m-1" style={style}>
        <h5>
          <MdOutlineQuestionAnswer /> Questions <hr />
        </h5>
        <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
          {Object.entries(start_Test?.test).map(([key, value], index) => {
            let buttonClass = "outline-dark";

            if (value.activeQuestionStatus === "Mark&review") {
              buttonClass = "warning";
            } else if (value.activeQuestionStatus === "Next") {
              buttonClass = "danger";
            } else if (value.activeQuestionStatus) {
              buttonClass = "success";
            }

            return (
              <div key={index} className="col-sm-2 col-md-2 text-center m-1">
                <button
                  style={questionIndex === Number(key) ? btn : {}}
                  className={`btn-sm btn btn-${buttonClass} ${
                    questionIndex === Number(key) ? "rounded-3" : ""
                  } w-100`}
                  onClick={() => handleClick(key)}
                >
                  {Number(key) + 1}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {screenSize.width > 770 ? (
        <div className="row container m-1" style={style}>
          Note-
          <hr />
          <div className="row">
            <div className="col">
              {" "}
              <button className="btn btn-sm btn-outline-dark">
                Not visited
              </button>
            </div>
            <div className="col">
              {" "}
              <button className="btn btn-sm btn-danger">Not attempted</button>
            </div>
            <div className="w-100"></div>
            <div className="col">
              {" "}
              <button className="btn btn-sm btn-warning">
                Marked for review
              </button>
            </div>
            <div className="col">
              {" "}
              <button className="btn btn-sm btn-success">Answer Saved</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TestControls;
