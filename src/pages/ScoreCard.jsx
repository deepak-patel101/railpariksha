import React, { useEffect } from "react";
import { useTestContext } from "../Context/TestContext";
import { useNavigate } from "react-router-dom";
import AnswerSheet from "../components/AnswerSheet";
import UserScoreCard from "../components/UserScoreCard";
import { IoMdArrowDropright } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ScoreCard = () => {
  const { start_Test, userResponse } = useTestContext();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/TestSeries/Select-Topics", { replace: true });
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const handleNewTest = () => {
    navigate("/TestSeries/Select-Topics");
  };

  return (
    <div className="container text-start mt-12" style={{ minHeight: "90vh" }}>
      <h4 className="text-center m-0 p-0"> Test Analysis</h4>
      <hr />
      <br />
      <UserScoreCard />
      <AnswerSheet />
      <hr />
      <h6>
        Great job on your last test! Improve & keep the streak going with
        another round.
      </h6>
      <div class="d-flex flex-row  align-items-center mb-3">
        <div class="p-2">
          <IoArrowBackCircleOutline
            className="backBtn "
            style={{
              borderRadius: "100%",
              border: "0px",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={handleNewTest}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = ""; // Reset to default
              e.target.style.color = ""; // Reset to default
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
