import React, { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../Context/UserContext";
import AddVideolinksPartner from "../components/Dashboard/AddVideolinksPartner";
import SideBar from "../components/Dashboard/SideBar";
import BeComeVideoPartner from "../components/Dashboard/BecomeVideoPartner";
import UpdateProfile from "../components/Dashboard/UpdateProfile";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Dashboard = () => {
  const [actBtn, setActBtn] = useState("DASHBOARD");
  const { user } = useUserContext();
const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("DashBoard");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const handleSlide = () => {};
  useEffect(() => {
    handleSlide();
  }, [user]);

  return (
    <div className="container " style={{ minHeight: "90vh" }}>
      <div className="d-flex justify-content-between">
        {/* {handleSlide()} */}
        <SideBar className="mt-2" setActBtn={setActBtn} />;
        <div>
          {actBtn ? (
            <div className="m-2 ps-4 pe-4 papaDiv">
              <h5>{actBtn}</h5>
            </div>
          ) : null}
        </div>
        <div></div>
      </div>
      <div className="d-flex justify-content-center text-center">
        {/* <div className="col-12 col-md-4 ">
          <button
            className="btn btn-outline-success m-2  papaDiv "
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleNavigate("ADD-MCQ");
            }}
          >
            Add MCQ
          </button>
        </div> */}
      </div>
      {/* {actBtn === "ADD-MCQ" ? <QbankMaster /> : null} */}
      {actBtn === "ADD VIDOES" ? <AddVideolinksPartner /> : null}

      {user.login_type === "admin" ? null : actBtn === "YOUTUBE PARTNER" ? (
        <BeComeVideoPartner />
      ) : null}
      {actBtn === "UPDATE PROFILE" ? <UpdateProfile /> : null}
      {actBtn === "DASHBOARD" ? <div>Dashboard</div> : null}
    </div>
  );
};
export default Dashboard;
