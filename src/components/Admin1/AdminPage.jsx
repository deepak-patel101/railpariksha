import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useUserContext } from "../../Context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineQuestionAnswer,
  MdOutlineOndemandVideo,
  MdOutlineLeaderboard,
} from "react-icons/md";

import { VscFeedback } from "react-icons/vsc";

const AdminPage = () => {
  const navigate = useNavigate();
  const [minNmax, setMinNmax] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);

  const { user, dashboardData, adminDashBoardData } = useUserContext();
  console.log(dashboardData);
  const handleMinNMax = () => {
    setMinNmax(!minNmax);
  };

  const handlePageJump = (btn, path) => {
    adminDashBoardData({
      activeBtn: btn,
      minNmax: !minNmax,
      defaultPath: path,
    });
    console.log(path);
    // setActiveBtn(btn);
    // setMinNmax(!minNmax);
    // navigate(path);
  };
  useEffect(() => {
    if (dashboardData.activeBtn === "") {
      navigate(dashboardData.defaultPath);
    }
  }, []);

  if (user?.login_type === "admin") {
    return (
      <div>
        <div
          onClick={() => (minNmax === true ? setMinNmax(false) : null)}
          className="admin-container papaDiv position-absolute"
          style={{
            minHeight: "90vh",
            width: !minNmax ? "250px" : "70px",
            zIndex: "9990",
            cursor: minNmax === true ? "pointer" : null,
          }}
        >
          {!minNmax ? (
            <h5>
              <FaUserCircle /> Welcome, {user?.name} sir!
            </h5>
          ) : (
            <h5>
              <FaUserCircle />
            </h5>
          )}
          <div className="" style={{ position: "relative" }}>
            <hr />
            <div
              style={{
                position: "absolute",
                borderRadius: "50%",
                background: "white",
                height: "20px",
                width: "20px",
                fontSize: "18px",
                top: "-9px",
                right: "",
                margin: "0",
                padding: "0",
                cursor: "pointer",
              }}
              className="text-center d-flex justify-content-center align-items-center border border-dark start-100"
              onClick={handleMinNMax}
            >
              {minNmax ? <GrFormNext /> : <GrFormPrevious />}
            </div>
          </div>
          <ul
            className="text-start"
            style={{
              listStyleType: "none",
              marginLeft: "0px",
              paddingLeft: "5px",
            }}
          >
            <li>
              {!minNmax ? (
                <h5>
                  <MdOutlineQuestionAnswer /> Qbank
                </h5>
              ) : (
                <h5>
                  <MdOutlineQuestionAnswer />
                </h5>
              )}
              {!minNmax ? (
                <ul>
                  <li
                    onClick={() => handlePageJump("Add_Qbank", "/Admin/Q-Bank")}
                  >
                    <Link
                      to="/Admin/Q-Bank"
                      className={`nav-link ${
                        dashboardData.activeBtn === "Add_Qbank"
                          ? "alert alert-dark p-1 m-0 border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Add Qbank" : "1"}
                    </Link>
                  </li>
                  <li
                    onClick={() =>
                      handlePageJump("Edit-Q-Bank", "/Admin/Edit-Q-Bank")
                    }
                  >
                    <Link
                      to="/Admin/Edit-Q-Bank"
                      className={`nav-link ${
                        dashboardData.activeBtn === "Edit-Q-Bank"
                          ? "alert alert-dark p-1 m-0 border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Modify Qbank" : "2"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/MCQverifier"
                      className={`nav-link ${
                        activeBtn === "MCQ_verifier"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "MCQ verifier" : "3"}
                    </Link>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              {!minNmax ? (
                <h5>
                  <VscFeedback /> Website Feedback
                </h5>
              ) : (
                <h5>
                  <VscFeedback />
                </h5>
              )}
              {!minNmax ? (
                <ul>
                  <li>
                    <Link
                      to="/ShowFeedback"
                      className={`nav-link ${
                        activeBtn === "Show_Feedback"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Show website Feedback" : "3"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/FatchQbankFeedback"
                      className={`nav-link ${
                        activeBtn === "Show_MC_QFeedback"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Show MCQ Feedback" : "3"}
                    </Link>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              {!minNmax ? (
                <h5>
                  <MdOutlineOndemandVideo /> Edit Video
                </h5>
              ) : (
                <h5>
                  <MdOutlineOndemandVideo />
                </h5>
              )}
              {!minNmax ? (
                <ul>
                  <li>
                    <Link
                      to="/AddVideolinks"
                      className={`nav-link ${
                        activeBtn === "Add_Video_Links"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Add Video Links" : "3"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/VideoApproval"
                      className={`nav-link ${
                        activeBtn === "Video_Approval"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Video Approval" : "3"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/SummaryVideo"
                      className={`nav-link ${
                        activeBtn === "Video_Summary"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Video Summary" : "3"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/VideoModification"
                      className={`nav-link ${
                        activeBtn === "Video_Modification"
                          ? "active border-bottom"
                          : ""
                      }`}
                    >
                      {!minNmax ? "Video Modification" : "3"}
                    </Link>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              {!minNmax ? (
                <h5>
                  <MdOutlineLeaderboard /> Add Department
                </h5>
              ) : (
                <h5>
                  <MdOutlineLeaderboard />
                </h5>
              )}
              {!minNmax ? (
                <ul>
                  <li>
                    <Link
                      to="/AddDept"
                      className={`nav-link ${
                        activeBtn === "Add_Dept" ? "active border-bottom" : ""
                      }`}
                    >
                      {!minNmax ? "Add Department" : "3"}
                    </Link>
                  </li>
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (user?.login_type === "user") {
    return (
      <div className="admin-container">
        <div className="admin-container">
          <h2>Welcome, {user?.name} Sir!!!</h2>
          <ul className="admin-menu">
            <li>
              <Link to="/InspectionNote" className="nav-link">
                Note
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (user?.login_type === "partner") {
    return (
      <div className="admin-container">
        <div className="admin-container">
          <h2>Welcome, {user?.name} Sir!!!</h2>
          <ul className="admin-menu">
            <li>
              <Link to="/AddVideolinksPartner" className="nav-link">
                Add Video
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    navigate("/LoginForm");
  }
};

export default AdminPage;
