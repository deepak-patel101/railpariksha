import React from "react";
import { useEffect, useState } from "react";
import Login from "../components/LogIn";
import "../components/css/SignInUp.css";
import Registration from "../components/registration";

const LogReg = () => {
  const [isSignInActive, setIsSignInActive] = useState(true);

  const handleToggleIn = () => {
    if (!isSignInActive) {
      setIsSignInActive(true);
    }
  };
  const handleToggleUp = () => {
    if (isSignInActive) {
      setIsSignInActive(false);
    }
  };
  console.log(isSignInActive);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <>
      <div
        style={{}}
        className="container-fluid d-flex justify-content-center align-items-center mt-3"
        // style={{ minHeight: "90vh" }}
      >
        <div
          className="content-wrapper"
          style={{
            boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
            padding: "15px",
            marginBottom: "15px", // Adding some margin at the bottom for spacing
            borderRadius: "5px", // Adding border radius for rounded corners ,
            width: "80vw",
            height: "75vh",
          }}
        >
          <div className="d-flex h-100 ">
            <div
              onClick={handleToggleIn}
              className={`sign-in position-relative ${
                isSignInActive ? "active" : ""
              }`}
              style={{
                background: "linear-gradient(to bottom, #5be0bb,#04543c",
                borderRadius: "5px 0 0 5px",
              }}
            >
              <div
                className=""
                style={{
                  width: "70%",
                  height: "auto",
                  boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
                  padding: "15px",
                  marginBottom: "15px", // Adding some margin at the bottom for spacing
                  borderRadius: "5px", // Adding border radius for rounded corners
                  backgroundColor: "#ffffff", // Adding background color to the div
                }}
                onClick={(e) => (isSignInActive ? e.stopPropagation() : null)}
              >
                <h4
                  style={{ color: "white" }}
                  className="position-absolute top-0 start-0 p-1"
                >
                  Sign In
                </h4>
                <Login />
              </div>
            </div>
            <div
              className={`sign-up position-relative ${
                isSignInActive ? "" : "active"
              }`}
              style={{
                background: "linear-gradient(to bottom, #0A96BA,#063970",
                borderRadius: " 0 5px  5px 0",
              }}
              onClick={handleToggleUp}
            >
              <div
                className=""
                style={{
                  width: "70%",
                  height: "auto",

                  boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
                  padding: "15px",
                  marginBottom: "15px", // Adding some margin at the bottom for spacing
                  borderRadius: "5px", // Adding border radius for rounded corners
                  backgroundColor: "#ffffff", // Adding background color to the div
                }}
                onClick={(e) => (!isSignInActive ? e.stopPropagation() : null)}
              >
                {" "}
                <h4
                  style={{ color: "white" }}
                  className="position-absolute top-0 start-0 p-1"
                >
                  Sign Up
                </h4>
                <Registration />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toggleButton">
        <button
          className="btn btn-primary toggleButton"
          onClick={() => setIsSignInActive(!isSignInActive)}
        >
          {isSignInActive ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </>
  );
};
export default LogReg;
