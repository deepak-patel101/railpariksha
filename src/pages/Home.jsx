import React from "react";
import home from "../img/home.png";
import HomeTrending from "../components/HomeTrending";
import Department from "../components/Department";
import { FaPlay } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="container text-center mt-12">
        <div
          className="row"
          style={{
            background: "linear-gradient(to bottom, white,#bfdaf5 ",
            borderRadius: "15px",
          }}
        >
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
              <h4>Rail Pariksha</h4>

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
        <div className="row mt-3">
          <div className="col-12">
            <HomeTrending />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Department />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
