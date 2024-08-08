import React, { useState } from "react";
import { FaLanguage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import GoogleTranslate from "../components/GoogleTranslate";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import UserList from "../components/Discussion/UserList";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import SignupInLoading from "../components/SignupInLoading";

const Navbar = () => {
  const { user, updateUserData } = useUserContext();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const handleLogOut = async () => {
    const token = localStorage.getItem("sessionToken"); // Retrieve the token from localStorage
    setMessage(true);
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "https://railwaymcq.com/railwaymcq/RailPariksha/sign_Out_User.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const result = await response.json();

      if (result.success) {
        localStorage.removeItem("sessionToken"); // Remove the token from localStorage
        setMessage(false);
      } else {
        setMessage(result.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(false);
    }
    const logoutUser = async () => {
      try {
        await fetch(
          "https://railwaymcq.com/railwaymcq/RailPariksha/userLogout.php"
        ); // Update URL as necessary
        updateUserData(null);
        // navigate("/Log&Reg");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    logoutUser();

    navigate("/");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleMyAccount = () => {
    setShowProfile(false);
    navigate("/Dashboard");
  };
  return (
    <div className="mb-2">
      {message && <SignupInLoading msg={"Signing Out."} />}
      <nav className="navbar navbar-expand-lg bg-body-tertiary Subject">
        <div className="container-fluid" style={{ fontSize: "15px" }}>
          <Link to="/" className="navbar-brand">
            Rail Pariksha
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="TestSeries">
                  Test Series
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Add-Notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Trending">
                  Trending
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="MyIdeas">
                  Discussion
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Videos">
                  Videos
                </Link>
              </li>
              {user?.login_type === "admin" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="Admin">
                    Admin
                  </Link>
                </li>
              ) : null}
            </ul>

            <div className="d-flex">
              <FaLanguage
                className="mr-1"
                style={{
                  fontSize: "40px",
                  paddingRight: "5px",
                  color: "#129ADA",
                }}
              />
              <GoogleTranslate />
            </div>

            <form className="d-flex" role="search">
              <input
                className="form-control m-1"
                type="search exams here"
                placeholder="Search"
                aria-label="Search"
                style={{ height: "40px" }}
              />
              <button
                className="btn btn-outline-success m-1"
                style={{ height: "40px" }}
                type="submit"
              >
                Search
              </button>
            </form>

            {user ? (
              <div>
                <button
                  className="btn btn-outline-success m-1"
                  style={{ height: "40px" }}
                  onClick={handleMyAccount}
                >
                  <MdDashboard />
                </button>
                <button
                  className="btn btn-outline-danger m-1"
                  onClick={handleLogOut}
                  style={{ height: "40px" }}
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <Link
                className="btn btn-success"
                to="Log&Reg"
                type="submit"
                style={{ height: "40px" }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
