import React, { useState } from "react";
import { FaLanguage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import GoogleTranslate from "../components/GoogleTranslate";
import { useUserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, updateUserData } = useUserContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    updateUserData(null);
    navigate("/");
  };
  return (
    <div className=" mb-2" style={{}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  Subject ">
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
              {/* <li className="nav-item">
                <Link className="nav-link disabled" to aria-disabled="true">
                  My performance
                </Link>
              </li> */}
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
              </li>{" "}
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
              />{" "}
              <GoogleTranslate />
            </div>
            {/* <div>
              {language === "english" ? (
                <img
                  style={{
                    height: "45px",
                    width: "45px",
                    cursor: "pointer",
                  }}
                  src={english}
                  alt="english"
                  onClick={() => handleClick("hindi")}
                />
              ) : (
                <img
                  style={{
                    height: "45px",
                    width: "45px",
                    cursor: "pointer",
                  }}
                  src={hindi}
                  alt="hindi"
                  onClick={() => handleClick("english")}
                />
              )}
            </div> */}
            <form className="d-flex  " role="search">
              <input
                className="form-control  m-1"
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
              <button
                className="btn btn-success m-1 "
                onClick={handleLogOut}
                style={{ height: "40px" }}
              >
                {" "}
                Sign Out
              </button>
            ) : (
              <Link
                className="btn btn-success "
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
