import React from "react";
import { useEffect } from "react";
const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <h1>Dashboard</h1>
    </div>
  );
};
export default Dashboard;
