import React from "react";
import { useState } from "react";
import SelectTestToDo from "./SelectTestToDo";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
const ModerateTest = () => {
  const [hover, setHover] = useState(false);
  //   const [click, setClick] = useState(false);
  const handleClick = (event) => {
    // Prevent event from bubbling up
    event.stopPropagation();
    setHover(!hover);
  };
  const handleMainDivHover = () => {
    if (hover === false) {
      setHover(true);
    }
  };
  return (
    <div
      onMouseEnter={handleMainDivHover}
      //   onMouseLeave={() => setHover(false)}
      className="position-relative "
    >
      <div
        className="d-flex justify-content-between"
        onClick={() => setHover(!hover)}
        style={{ cursor: "pointer" }}
      >
        <h5 className="text-start" style={{ cursor: "pointer" }}>
          <FaRegNoteSticky /> Moderate
        </h5>
        <div onClick={handleClick}>
          {!hover ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}
        </div>
      </div>{" "}
      <hr />
      <div className={`content-for-test-type ${hover ? "show" : "hide"}`}>
        {hover ? (
          <>
            <SelectTestToDo testType={"moderate"} bgColor={"#B5DBED"} />
          </>
        ) : null}
      </div>{" "}
      <div
        className={`content-for-test-type ${!hover ? "show" : "hide"}`}
        onClick={() => setHover(!hover)}
        style={{ cursor: "pointer" }}
      >
        set of test with difficulty level moderate
      </div>
    </div>
  );
};
export default ModerateTest;
