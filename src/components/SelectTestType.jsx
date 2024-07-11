import React, { useState, useMemo, useEffect } from "react";
import EasyTest from "./EasyTest";
import ModerateTest from "./ModerateTest";
import RandomTest from "./Randomtest";
import MarathonTest from "./MarathonTest";
import ToughTest from "./ToughTest";
import { useTestContext } from "../Context/TestContext";
import { TbArrowsSort } from "react-icons/tb";
const SelectTestType = () => {
  const { test_data, setTempTest, temp_test_data, defaultActiveBtn } =
    useTestContext();
  const [activeBtn, setActiveBtn] = useState(defaultActiveBtn);
  // Use useMemo to filter test_data based on activeBtn
  const filteredTestData = useMemo(() => {
    if (!test_data || typeof test_data !== "object") return test_data;

    // Filter the test_data based on activeBtn
    const filteredData = {};
    Object.keys(test_data).forEach((difficultyLevel) => {
      filteredData[difficultyLevel] = {};
      Object.keys(test_data[difficultyLevel]).forEach((questionSetKey) => {
        const questionSet = test_data[difficultyLevel][questionSetKey];
        if (Array.isArray(questionSet)) {
          const filteredQuestions = questionSet.filter(
            (question) => question.queFrom === activeBtn || activeBtn === "All"
          );
          if (filteredQuestions.length > 0) {
            filteredData[difficultyLevel][questionSetKey] = filteredQuestions;
          }
        }
      });
    });

    return filteredData;
  }, [test_data, activeBtn]);

  useEffect(() => {
    setTempTest(filteredTestData);
  }, [filteredTestData]);
  const uniqueQueFromValues = new Set(["All"]);

  // Check if test_data is defined and is an object
  if (test_data && typeof test_data === "object") {
    // Iterate through each difficulty level
    Object.values(test_data).forEach((difficultyLevel) => {
      // Check if difficultyLevel is defined and is an object
      if (difficultyLevel && typeof difficultyLevel === "object") {
        // Iterate through each set of questions
        Object.values(difficultyLevel).forEach((questionSet) => {
          // Check if questionSet is defined and is an array
          if (Array.isArray(questionSet)) {
            // Iterate through each question
            questionSet.forEach((question) => {
              // Set default value for queFrom if it is null or undefined
              const queFromValue =
                question.queFrom !== null && question.queFrom !== undefined
                  ? question.queFrom
                  : "All";

              // Add queFrom value to the Set
              uniqueQueFromValues.add(queFromValue);
            });
          }
        });
      }
    });
  }

  // Convert Set to an array if needed
  const uniqueQueFromArray = Array.from(uniqueQueFromValues);

  const style = {
    boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
    padding: "15px",
    marginBottom: "15px", // Adding some margin at the bottom for spacing
    borderRadius: "5px", // Adding border radius for rounded corners
    backgroundColor: "#ffffff", // Adding background color to the div
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
          padding: "15px",
          marginBottom: "15px", // Adding some margin at the bottom for spacing
          borderRadius: "5px", // Adding border radius for rounded corners
          backgroundColor: "#ffffff", // Adding background color to the div
        }}
      >
        <b>
          <TbArrowsSort /> Sort question sets based on
        </b>
        <br />
        <div className="d-flex justify-content-start">
          {uniqueQueFromArray.map((btn, index) =>
            btn === "default" ? null : (
              <div key={index} className="underline col-2 row col-md-2 m-1">
                <button
                  className={`btn btn-sm btn-outline-dark mb-1 Subject ${
                    activeBtn === btn ? "active" : ""
                  }`}
                  onClick={() => setActiveBtn(btn)}
                >
                  {btn === "PDF" ? "NOTES & PDF" : btn}
                </button>
              </div>
            )
          )}
        </div>
      </div>

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
    </div>
  );
};

export default SelectTestType;
