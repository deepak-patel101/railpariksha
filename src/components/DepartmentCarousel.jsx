import React, { useState, useEffect } from "react";
import "./css/slid.css";
import Subjects from "./Subjects";
import { MdLeaderboard } from "react-icons/md";

const DepartmentCarousel = ({ departments }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState("");
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
  console.log(
    "screenSize",
    screenSize.width,
    "startIndex",
    startIndex,
    "departments",
    departments?.length
  );
  const handlePrev = () => {
    if (screenSize.width >= 1182) {
      setStartIndex((prevIndex) =>
        prevIndex <= 0
          ? departments?.length - 12
          : startIndex <= 1
          ? prevIndex - 1
          : prevIndex - 2
      );
    } else if (screenSize.width <= 1182 && screenSize.width >= 998) {
      setStartIndex((prevIndex) =>
        prevIndex <= 0
          ? departments?.length - 10
          : startIndex <= 1
          ? prevIndex - 1
          : prevIndex - 2
      );
    } else if (screenSize.width <= 998 && screenSize.width >= 772) {
      setStartIndex((prevIndex) =>
        prevIndex <= 0
          ? departments?.length
          : startIndex <= 1
          ? prevIndex - 1
          : prevIndex - 2
      );
    } else if (screenSize.width <= 772 && screenSize.width >= 512) {
      setStartIndex((prevIndex) =>
        prevIndex <= 0
          ? departments?.length + 8
          : startIndex <= 1
          ? prevIndex - 1
          : prevIndex - 2
      );
    } else {
      console.log("else");

      setStartIndex((prevIndex) =>
        prevIndex <= 0
          ? departments?.length + 20
          : startIndex <= 1
          ? prevIndex - 1
          : prevIndex - 2
      );
    }
  };
  const handleNext = () => {
    if (screenSize.width >= 1182) {
      setStartIndex((prevIndex) =>
        prevIndex + 12 >= departments?.length
          ? 0
          : startIndex <= 1
          ? prevIndex + 1
          : prevIndex + 2
      );
    } else if (screenSize.width <= 1182 && screenSize.width >= 998) {
      console.log("1182 to 998 next");
      setStartIndex((prevIndex) =>
        prevIndex + 10 >= departments?.length
          ? 0
          : startIndex <= 1
          ? prevIndex + 1
          : prevIndex + 2
      );
    } else if (screenSize.width <= 998 && screenSize.width >= 772) {
      setStartIndex((prevIndex) =>
        prevIndex >= departments?.length - 1
          ? 0
          : startIndex <= 1
          ? prevIndex + 1
          : prevIndex + 2
      );
    } else if (screenSize.width <= 772 && screenSize.width >= 512) {
      setStartIndex((prevIndex) =>
        prevIndex - 8 >= departments?.length - 1
          ? 0
          : startIndex <= 1
          ? prevIndex + 1
          : prevIndex + 2
      );
    } else {
      setStartIndex((prevIndex) =>
        prevIndex - 20 >= departments?.length - 1
          ? 0
          : startIndex <= 1
          ? prevIndex + 1
          : prevIndex + 2
      );
    }
  };

  const handleClick = (btnname) => {
    setActiveBtn(btnname);
  };
  console.log(activeBtn);
  return (
    <div
      className="container "
      style={{
        margin: "0px",
        padding: "0px",
      }}
    >
      <div
        className="row"
        style={{
          borderRadius: "10px",
          boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)",
        }}
      >
        <div className="text-start">
          <h5>
            <MdLeaderboard /> Departments{" "}
          </h5>
          <p style={{ margin: "0px", padding: "0px" }}>
            An investment in knowledge pays the best interest.
          </p>
        </div>
        <div className="col-md-12">
          <div className="slider-container mt-4 mb-4">
            <button className="slider-button prev" onClick={handlePrev}>
              &lt;
            </button>
            <div className="slider">
              <div
                className={`slider-inner `}
                style={{ transform: `translateX(-${startIndex * (100 / 5)}%)` }}
              >
                {departments?.map((department, index) => (
                  <div className=" slider-item">
                    {" "}
                    <button
                      key={index}
                      className={` btn btn-outline-secondary  ${
                        activeBtn === department.dept_name ? "active" : null
                      }`}
                      onClick={() => handleClick(department.dept_name)}
                    >
                      {department.dept_name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button className="slider-button next" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      <Subjects department={activeBtn} />
    </div>
  );
};

export default DepartmentCarousel;
