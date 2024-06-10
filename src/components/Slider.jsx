import React from "react";
import home from "../img/home.png";
import Study from "../img/Study.png";
import idea from "../img/idea.png";
import { FaPlay } from "react-icons/fa";
import "./css/imageSlider.css";
const Slider = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
        ></li>
        <li
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
        ></li>
      </ol>
      <div
        className="carousel-inner"
        style={{
          borderRadius: "10px",
          boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)",
        }}
      >
        <div className="carousel-item active">
          <div
            className="row "
            style={{
              background: "linear-gradient(to bottom, white,#bfdaf5)",
              borderRadius: "15px",
            }}
          >
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={home}
                alt="home"
                style={{
                  maxHeight: "240px",
                  minHeight: "120px",
                  // minWidth: "150px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              className="mt-3 col-12 col-md-6 d-flex justify-content-center align-items-center text-center"
              style={{ minHeight: "150px" }}
            >
              <div>
                <h4>Rail Pariksha</h4>
                <h3>Excellence Through Practice</h3>
                <p>
                  Learn <FaPlay style={{ color: "lightGreen" }} /> Practice{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Improve{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Succeed
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            className="row"
            style={{
              background: "linear-gradient(to bottom, white,#f9ce68)",
              borderRadius: "15px",
            }}
          >
            <div
              className=" mt-3 col-12 col-md-6 d-flex justify-content-center align-items-center text-center"
              style={{ minHeight: "150px" }}
            >
              <div>
                <h4>Rail Pariksha</h4>
                <h3>Learning never exhausts the mind</h3>
                <p>
                  Observe
                  <FaPlay style={{ color: "lightGreen" }} /> Understand{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Practice{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Reflect
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={Study}
                alt="study"
                style={{
                  maxHeight: "240px",
                  minHeight: "120px",
                  // minWidth: "150px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            className="row"
            style={{
              background: "linear-gradient(to bottom, white,#7fdb84)",
              borderRadius: "15px",
            }}
          >
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={idea}
                alt="idea"
                style={{
                  maxHeight: "240px",
                  minHeight: "120px",
                  // minWidth: "150px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              className="mt-3 col-12 col-md-6 d-flex justify-content-center align-items-center text-center"
              style={{ minHeight: "150px" }}
            >
              <div>
                <h4>Rail Pariksha</h4>
                <h3>Everything you can imagine is real</h3>
                <p>
                  Brainstorm
                  <FaPlay style={{ color: "lightGreen" }} /> Research{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Validate{" "}
                  <FaPlay style={{ color: "lightGreen" }} /> Refine
                </p>
              </div>
            </div>
          </div>
        </div>
        <a
          className="text-end"
          style={{
            color: "white",
            position: "absolute",
            bottom: "0",
            left: "0",
            opacity: "0.3",
            margin: "10px",
            zIndex: "2",
          }}
          href="https://storyset.com/work"
        >
          art{" "}
        </a>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <></>
    </div>
  );
};

export default Slider;
