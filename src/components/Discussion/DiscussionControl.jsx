import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import Vision from "../../img/Vision.jpg";
import Vacancy from "../../img/Vacancy.jpg";
import Issue from "../../img/Issue.jpg";
import Question from "../../img/Study.png";
import Other from "../../img/Other.jpg";
import "./explore.css";
const DiscussionControl = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const { threadControl, setThreadControlData } = useGlobalContext();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setThreadControlData({ feed: true, search: "", explore: "" });
  };

  const explore = ["Vision", "Vacancy", "Issue", "Question", "Other"];
  return (
    <div style={{ height: "90vh" }}>
      <div className="mt-5 mb-3">
        <div className="input-group" style={{ paddingBottom: "0px" }}>
          <input
            type="text"
            className="form-control Subject2"
            placeholder="Search"
            aria-describedby="basic-addon2"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <div className="input-group-append" style={{ paddingBottom: "0px" }}>
            <button
              className="Subject btn btn-outline-secondary"
              type="button"
              onClick={() =>
                setThreadControlData({
                  search: searchValue,
                  feed: null,
                })
              }
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          className={`col-12  btn btn-sm btn-outline-dark Subject border-0 text-start ${
            threadControl.feed ? "active" : ""
          } `}
          onClick={() => handleButtonClick("Feed")}
        >
          Feed
        </button>
      </div>
      <div>
        <div className="mt-2 papaDiv">
          {" "}
          <h6
            className={`bg-${
              threadControl.explore !== "" ? "dark" : "secondary"
            } pb-1 pt-1`}
            style={{ color: "white" }}
          >
            {" "}
            Explore
          </h6>
          <hr />
          <div
            className="col-12   scrollspy-example-2"
            style={{
              height: "50vh",
              overflowY: "auto",
            }}
          >
            <div className="d-flex flex-wrap " style={{ height: "50vh" }}>
              {explore.map((item, index) => {
                return (
                  <div
                    className=" cards m-1"
                    key={index}
                    style={{
                      paddingBottom: "10px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setThreadControlData({
                        search: searchValue,
                        feed: null,
                        explore: item,
                      })
                    }
                  >
                    <figure class="card">
                      <img
                        src={
                          item === "Vision"
                            ? Vision
                            : item === "Vacancy"
                            ? Vacancy
                            : item === "Issue"
                            ? Issue
                            : item === "Question"
                            ? Question
                            : Other
                        }
                      />

                      <figcaption className=" ">
                        <h6
                          style={{ color: "black", border: "2px sold black" }}
                        >
                          {item}
                        </h6>
                      </figcaption>
                      <a href="https://www.freepik.com/free-vector/vision-statement-concept-illustration_19949385.htm#fromView=search&page=1&position=2&uuid=810c33b5-17c6-456b-9926-d9af87fe80f5">
                        Image by storyset on Freepik
                      </a>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionControl;
