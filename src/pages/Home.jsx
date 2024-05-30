import React from "react";
import home from "../img/home.png";
import { FaPlay } from "react-icons/fa";
const Home = () => {
  return (
    <>
      <div
        className="container text-center mt-2"
        style={{
          background: "linear-gradient(to bottom, white,#bfdaf5 ",
        }}
      >
        <div className="row">
          <div className="col-12 col-md-6 ">
            <img
              src={home}
              alt="study"
              style={{
                height: "100%",
                width: "100%",
                minHeight: "120px",
                minWidth: "150px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            className="col-12 col-md-6 d-flex justify-content-center align-items-center text-center"
            style={{ minHeight: "150px" }}
          >
            <div>
              <p>
                <b>Rail Pariksha</b>
              </p>
              <h3>Excellence Through Practice</h3>
              <p>
                Learn{"  "} <FaPlay style={{ color: "lightGreen" }} /> Practice
                {"  "}
                <FaPlay style={{ color: "lightGreen" }} /> Improve{"  "}
                <FaPlay style={{ color: "lightGreen" }} /> Succeed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
