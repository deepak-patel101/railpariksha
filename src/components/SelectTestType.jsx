import React from "react";
import EasyTest from "./EasyTest";
import ModerateTest from "./ModerateTest";
import RandomTest from "./Randomtest";
import MarathonTest from "./MarathonTest";
import ToughTest from "./ToughTest";
const SelectTestType = () => {
  const style = {
    boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
    padding: "15px",
    marginBottom: "15px", // Adding some margin at the bottom for spacing
    borderRadius: "5px", // Adding border radius for rounded corners
    backgroundColor: "#ffffff", // Adding background color to the div
  };
  return (
    <>
      <div className="d-flex flex-column mb-3">
        <div
          className="p-2 mb-3"
          style={{
            ...style,
            // background: "linear-gradient(to bottom, white,#7fdb84)",
          }}
        >
          <EasyTest />
        </div>
        <div
          className="p-2 mb-3"
          style={{
            ...style,
            // background: "linear-gradient(to bottom, white,#7FC5DB)",
          }}
        >
          <ModerateTest />
        </div>{" "}
        <div
          className="p-2 mb-3"
          style={{
            ...style,
            // background: "linear-gradient(to bottom, white,#DB7F7F)",
          }}
        >
          <ToughTest />
        </div>{" "}
        <div
          className="p-2 mb-3"
          style={{
            ...style,
            // background: "linear-gradient(to bottom, white,#f9ce68)",
          }}
        >
          <RandomTest />
        </div>
        <div
          className="p-2 mb-3"
          style={{
            ...style,
            // background: "linear-gradient(to bottom, white,#C27FDB)",
          }}
        >
          <MarathonTest />
        </div>
      </div>
    </>
  );
};
export default SelectTestType;
