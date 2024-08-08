import React, { useState, useEffect } from "react";
import { useTestContext } from "../Context/TestContext";
import TestControls from "../components/TestControls";
import QuestionPaper from "../components/QuestionPaper";
import { useGlobalContext } from "../Context/GlobalContextOne";

const StartTest = () => {
  const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("starttest");
  }, []);
  const [startTest, setStartTest] = useState(false);
  const { start_Test, userResponse } = useTestContext();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      {!startTest ? (
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
            onClick={() => setStartTest(true)} // Stop click event propagation
          >
            <div className="m-3">
              {" "}
              <p>Get ready for the Test...</p>
              <p>Best of luck.</p>
            </div>

            <button
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)" }}
              className="btn btn-outline-success m-3"
            >
              start the test
            </button>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center text-center">
            <TestControls />
          </div>
          <div className="col-12 col-md-8 d-flex">
            <QuestionPaper />
          </div>
        </div>
      )}
    </div>
  );
};
export default StartTest;
