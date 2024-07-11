import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { useUserContext } from "../../Context/UserContext";

const AdminPage = () => {
  const navigate = useNavigate();
  const [minNmax, setMinNmax] = useState(false);
  const { user } = useUserContext();
  const handleMinNMax = () => {
    setMinNmax(!minNmax);
  };

  if (user?.login_type === "admin") {
    console.log(user?.login_type);
    return (
      <div
        className="admin-container papaDiv"
        style={{ minHeight: "90vh", width: minNmax ? "250px" : "50px" }}
      >
        {minNmax ? <h5>Welcome, {user?.name} sir !</h5> : "Admin"}

        <hr />
        <button
          className="btn btn-sm btn-outline-dark Subject"
          onClick={handleMinNMax}
        >
          {minNmax ? <GrFormPrevious /> : <GrFormNext />}
        </button>
        <ul
          className="text-start"
          style={{
            listStyleType: "none",
            marginLeft: "0px",
            paddingLeft: "5px ",
          }}
        >
          <li>
            <Link to="/Admin/Q-Bank" className="menu-item">
              {minNmax ? "Add Qbank" : "1"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/Edit-Q-Bank" className="menu-item">
              {minNmax ? "Modify Qbank" : "2"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/ShowFeedback" className="menu-item">
              {minNmax ? "Show website Feedback" : "3"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/FatchQbankFeedback" className="menu-item">
              {minNmax ? "Show MCQ Feedback" : "4"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/MCQverifier" className="menu-item">
              {minNmax ? " MCQ verifier" : "5"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/AddVideolinks" className="menu-item">
              {minNmax ? "   Add Video Links" : "6"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/AddDept" className="menu-item">
              {minNmax ? "Add Department" : "7"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/VideoApproval" className="menu-item">
              {minNmax ? "  Video Approval" : "8"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/SummaryVideo" className="menu-item">
              {minNmax ? " Video Summary" : "9"}
            </Link>
          </li>
          <li>
            <Link to="/Admin/VideoModification" className="menu-item">
              {minNmax ? " Video Modification" : "10"}
            </Link>
          </li>
        </ul>
      </div>
    );
  } else if (user?.login_type === "user") {
    console.log(user?.login_type);
    return (
      <div className="admin-container">
        <div className="admin-container">
          <h2>Welcome, {user?.name} Sir!!!</h2>
          <ul className="admin-menu">
            <li>
              <Link to="/InspectionNote" className="menu-item">
                Note
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (user?.login_type === "partener") {
    console.log(user?.login_type);
    return (
      <div className="admin-container">
        <div className="admin-container">
          <h2>Welcome, {user?.name} Sir!!!</h2>
          <ul className="admin-menu">
            <li>
              <Link to="/AddVideolinksPartner" className="menu-item">
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
