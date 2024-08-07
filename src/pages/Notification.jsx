import React, { useEffect, useState, useCallback, useRef } from "react";
import InspectionNote from "../components/InspectionNote";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Notification = () => {
  const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("Notification");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <InspectionNote />
    </div>
  );
};

export default Notification;
