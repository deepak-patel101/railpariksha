import React, { useState, useEffect, useRef } from "react";
import "./css/slid.css";
import Subjects from "./Subjects";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { MdLeaderboard } from "react-icons/md";
import Loading from "./Loading";
import "./css/NoteReader.css"; // Import the custom CSS
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

const DepartmentCarousel = ({ departments }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState("Electrical"); // default value
  const [selectedDepartment, setSelectedDepartment] = useState(null); // default value
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { department_loading, department_error, notes } = useGlobalContext();
  const sliderRef = useRef(null);

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

  useEffect(() => {
    setSelectedDepartment(departments?.[0]);
  }, [departments]);

  const handleClick = (department) => {
    const departmentName = department.deptt;
    setActiveBtn(departmentName);
    setSelectedDepartment(department);
  };

  const isRecent = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const countRecentTopics = (department, notes) => {
    let recentCount = 0;
    // Count recent topics
    Object.values(department.subjects).forEach((subject) => {
      subject.topics.forEach((topic) => {
        if (isRecent(topic.createdOn)) {
          recentCount++;
        }
      });
    });

    // Count recent notes that match subCode and topcode
    notes?.forEach((note) => {
      const subject = department.subjects[note.subCode];
      if (subject) {
        subject.topics.forEach((topic) => {
          if (
            Number(note.topcode) === Number(topic.topcode) &&
            isRecent(note.createdOn)
          ) {
            recentCount++;
          }
        });
      }
    });

    return recentCount;
  };

  const smoothScroll = (element, direction) => {
    const start = element.scrollLeft;
    const distance = direction === "left" ? -100 : 100;
    const duration = 300; // in ms
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      element.scrollLeft = start + distance * progress;
      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      smoothScroll(sliderRef.current, "left");
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      smoothScroll(sliderRef.current, "right");
    }
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
          <div
            className="d-flex justify-content-center   m-3"
            style={{ position: "relative" }}
          >
            <button
              className=" btn btn-outline-dark Subject "
              onClick={slideLeft}
            >
              <GrFormPreviousLink
                className=""
                style={{
                  fontSize: "",
                }}
              />
            </button>
            <div
              className=" scrollspy-example-2"
              ref={sliderRef}
              style={{
                overflowX: "auto ",
                whiteSpace: "nowrap",
              }}
            >
              {departments?.map((department, index) => {
                const recentCount = countRecentTopics(department, notes);
                return (
                  <div
                    className="mt-3 m-2 Subject "
                    key={index}
                    style={{ display: "inline-block", borderRadius: "5px" }}
                  >
                    <button
                      className={`btn btn-outline-dark position-relative   ${
                        activeBtn === department.deptt ? "active" : ""
                      }`}
                      onClick={() => handleClick(department)}
                    >
                      {department.deptt}
                      {recentCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {recentCount}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-outline-dark Subject"
              onClick={slideRight}
              style={{}}
            >
              <GrFormNextLink style={{}} />
            </button>
          </div>
        </div>
      </div>
      <Subjects department={selectedDepartment} />
    </div>
  );
};

export default DepartmentCarousel;
