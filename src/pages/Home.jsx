import React from "react";
import HomeTrending from "../components/HomeTrending";
import Department from "../components/Department";
import { useEffect } from "react";
import Slider from "../components/Slider";
import img from "../img/sv3.png";
import TrendingVideos from "../components/Trendings/TrendingVideos";
import { MdOutlineOndemandVideo } from "react-icons/md";
import TrendingCom from "../components/Trendings/TrndingComp";

const Home = () => {
  useEffect(() => {
    fetch("https://railwaymcq.com/railwaymcq/RailPariksha/Visitors_count.php")
      .then((response) => response.text())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      {/*  image for home */}
      <div>
        <Slider />
        {/* <div className="col-12 col-md-6 ">
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
          </div> */}
      </div>
      {/* image ends here */}

      <div className="row mt-3 p-2 m-1 papaDiv">
        {/* <div className="d-flex justify-content-center papaDiv"> */}
        <div
          className="col-12 col-md-3 mt-2"
          style={{
            overflow: "hidden",
            borderRadius: "50px",
            background: `linear-gradient(to bottom, white,#ed8c4d)`,
          }}
        >
          <img
            src={img}
            className=""
            alt="iimg"
            style={{
              height: "100px",
              filter: "drop-shadow(10px 5px 8px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>
        <div className="position-relative col-12 col-md-8">
          <div className="  d-flex align-items-center mt-5 justify-content-center ">
            <h6>"Arise, awake, and stop not till the goal is reached."</h6>
            <br />{" "}
          </div>
          <div className="text-end">
            <h6> — Swami Vivekananda</h6>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <TrendingCom from={"home"} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <TrendingVideos from={"home"} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <Department />
        </div>
      </div>
    </div>
  );
};
export default Home;
