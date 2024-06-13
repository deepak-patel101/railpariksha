import React, { useState, useEffect } from "react";
import "./css/slid.css";
import Subjects from "./Subjects";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { MdLeaderboard } from "react-icons/md";
import Loading from "./Loading";

const DepartmentCarousel = ({ departments }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState("Electrical"); // default value
  const [selectedDepartment, setSelectedDepartment] = useState(
    null // default value
  );
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { department_loading, department_error } = useGlobalContext();
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

  const getItemsPerPage = () => {
    if (screenSize.width >= 1182) {
      return 8;
    } else if (screenSize.width >= 998) {
      return 7;
    } else if (screenSize.width >= 772) {
      return 5;
    } else if (screenSize.width >= 680) {
      return 6;
    } else if (screenSize.width >= 5120) {
      return 3;
    } else {
      return 2;
    }
  };

  const handlePrev = () => {
    const itemsPerPage = getItemsPerPage();
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const handleNext = () => {
    const itemsPerPage = getItemsPerPage();
    setStartIndex((prevIndex) =>
      Math.min(departments?.length - itemsPerPage, prevIndex + itemsPerPage)
    );
  };
  useEffect(() => {
    setSelectedDepartment(departments?.[0]);
  }, [departments]);

  const handleClick = (btnname) => {
    const departmentname = btnname.deptt;
    setActiveBtn(departmentname);
    setSelectedDepartment(btnname);
  };
  return (
    <div className="container" style={{ margin: "0px", padding: "0px" }}>
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
            {department_loading ? <Loading style={{ width: "15px" }} /> : null}
          </h5>
          <p style={{ margin: "0px", padding: "0px" }}>
            An investment in knowledge pays the best interest.
          </p>
        </div>
        <div className="col-md-12">
          <div className="slider-container mt-4 mb-4">
            <button
              className="slider-button prev"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              &lt;
            </button>
            <div className="slider">
              {" "}
              <div
                className="slider-inner"
                style={{
                  transform: `translateX(-${
                    (startIndex / getItemsPerPage()) * 100
                  }%)`,
                }}
              >
                {departments?.map((department, index) => (
                  <div className="slider-item" key={index}>
                    <button
                      className={`btn btn-outline-secondary ${
                        activeBtn === department.deptt ? "active" : ""
                      }`}
                      onClick={() => handleClick(department)}
                    >
                      {department.deptt}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="slider-button next"
              onClick={handleNext}
              disabled={startIndex >= departments?.length - getItemsPerPage()}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <Subjects department={selectedDepartment} />
    </div>
  );
};

export default DepartmentCarousel;
