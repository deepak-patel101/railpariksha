import React from "react";
import HomeTrending from "../components/HomeTrending";
import Department from "../components/Department";
import { useEffect } from "react";
import Slider from "../components/Slider";
import img from "../img/sv3.png";
import TrendingVideos from "../components/Trendings/TrendingVideos";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TrendingCom from "../components/Trendings/TrndingComp";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Home = () => {
  const navigate = useNavigate();
  const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("home");
  }, []);
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

  const handleClick = () => {
    navigate("/Feedback");
  };
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

        <div className="position-relative col-12 ">
          <div className="  d-flex align-items-center  justify-content-center ">
            <div style={{ fontSize: "12px" }}>
              <h6>Disclamer</h6>
              This website, Rail-Pariksha, is dedicated to learning and teaching
              purposes. All content is intended solely for educational purposes.
              If you believe that any content on this website belongs to you and
              should not be displayed, please raise an objection by contacting
              us directly. We are committed to addressing any concerns promptly
              and appropriately. Thank you for your understanding and
              cooperation.
            </div>
            <br />{" "}
          </div>
          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleClick}
            >
              {" "}
              Raise an objection
            </button>
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
