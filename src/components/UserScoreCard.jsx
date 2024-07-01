import React, { useState, useEffect } from "react";
import { useTestContext } from "../Context/TestContext";
import { GrScorecard } from "react-icons/gr";

const UserScoreCard = () => {
  const { start_Test, userResponse, countDown } = useTestContext();
  const [score, setScore] = useState({ rightAns: 0, wrongAns: 0, skipped: 0 });
  const style = {
    boxShadow: "5px 5px 10px rgba(0,0,0, 0.3)", // Shadow on bottom-right
    padding: "15px",
    marginBottom: "15px", // Adding some margin at the bottom for spacing
    borderRadius: "5px", // Adding border radius for rounded corners
    backgroundColor: "#ffffff", // Adding background color to the div
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Calculate scores when start_Test or userResponse changes
  useEffect(() => {
    if (!start_Test || !userResponse) return;

    let rightCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    Object.entries(start_Test.test).forEach(([questionNo, value]) => {
      const ansData = userResponse?.testAnswer[questionNo];

      if (ansData?.answer && value.answer !== ansData?.answer) {
        wrongCount++;
      } else if (value?.answer === ansData?.answer) {
        rightCount++;
      } else {
        skippedCount++;
      }
    });

    setScore({
      rightAns: rightCount,
      wrongAns: wrongCount,
      skipped: skippedCount,
    });
  }, [start_Test, userResponse]);

  const roundedScore = (score.rightAns - score.wrongAns * (1 / 3)).toFixed(2);
  let bgColor;
  let percentage = (roundedScore / Object.keys(start_Test.test).length) * 100;

  if (percentage < 33) {
    bgColor = "#DB5353";
  } else if (percentage >= 33 && percentage < 50) {
    bgColor = "#DB9153";
  } else if (percentage >= 50 && percentage < 75) {
    bgColor = "#53C0DB";
  } else if (percentage >= 75 && percentage < 95) {
    bgColor = "#53DB5B";
  } else if (percentage > 95) {
    bgColor = "#E7E556";
  }
  const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds} s`;
  };
  const accuracy =
    score?.rightAns != 0
      ? ((score?.rightAns / (score?.rightAns + score?.wrongAns)) * 100).toFixed(
          2
        )
      : "0.00";

  return (
    <div
      className="row m-1 mt-2 mb-2"
      style={{
        ...style,
        background: `linear-gradient(to bottom, white,${bgColor})`,
      }}
    >
      <div className="col-10">
        <h5>
          <GrScorecard /> User score card
        </h5>
        <hr />
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col-12 col-md-3">
              <h5 className="row">Question Status</h5>
              {screenSize.width < 760 ? null : (
                <div>
                  <hr />
                </div>
              )}

              <div className="row">
                Total Question - {Object.keys(start_Test?.test).length}
              </div>
              <div className="row">
                Attempted - {score?.rightAns + score?.wrongAns}
              </div>
              <div className="row">Skipped - {score?.skipped}</div>
            </div>
            <div className="col-12 col-md-3">
              {screenSize.width < 760 ? (
                <div>
                  <hr />
                </div>
              ) : null}

              <h5 className="row">Your attempts</h5>
              {screenSize.width < 760 ? null : (
                <div>
                  <hr />
                </div>
              )}

              <div className="row">Right - {score?.rightAns}</div>
              <div className="row">Wrong - {score?.wrongAns}</div>
            </div>
            <div className="col-12 col-md-3">
              {screenSize.width < 760 ? (
                <div>
                  <hr />
                </div>
              ) : null}

              <h5 className="row">Score</h5>
              {screenSize.width < 760 ? null : (
                <div>
                  <hr />
                </div>
              )}

              <div className="row">For right ans. +{score?.rightAns}</div>
              <div className="row">
                For Wrong ans. - {(score.wrongAns * (1 / 3)).toFixed(2)}
              </div>
              <div className="row">Percentage. {percentage.toFixed(2)}%</div>
            </div>
            <div className="col-12 col-md-3">
              {screenSize.width < 760 ? (
                <div>
                  <hr />
                </div>
              ) : null}

              <h5 className="row">Time & Accuracy</h5>
              {screenSize.width < 760 ? null : (
                <div>
                  <hr />
                </div>
              )}

              <div className="row">
                Time for test - {countDown?.testTiming}:00 s
              </div>
              <div className="row">
                Time used in test -{" "}
                {convertSecondsToMinutesAndSeconds(countDown?.timeTaken)}
              </div>
              <div className="row">Accuracy - {accuracy}%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 mr-2  justify-content-center align-items-center text-center">
        <h5 className="">Final score</h5>
        <hr />
        <b className="final-score row justify-content-center align-items-center text-center">
          {roundedScore}
        </b>
      </div>
      <style jsx>{`
        .final-score {
          font-size: 70px;
        }
        @media (max-width: 1200px) {
          .final-score {
            font-size: 60px;
          }
        }
        @media (max-width: 992px) {
          .final-score {
            font-size: 50px;
          }
        }
        @media (max-width: 768px) {
          .final-score {
            font-size: 40px;
          }
        }
        @media (max-width: 576px) {
          .final-score {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserScoreCard;
