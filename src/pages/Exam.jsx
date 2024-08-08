import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import Department from "../components/Department";
import TrendingTest from "../components/TrendingTest";

const Exam = () => {
  const { subject, setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("Exam");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <div>
        <TrendingTest />
      </div>
      <Department />
    </div>
  );
};
export default Exam;
