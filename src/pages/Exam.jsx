import React from "react";

import { useGlobalContext } from "../Context/GlobalContextOne";
import Department from "../components/Department";
import TrendingTest from "../components/TrendingTest";

const Exam = () => {
  const { subject } = useGlobalContext();

  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <>
        <div>
          <TrendingTest />
        </div>
        <Department />
      </>
    </div>
  );
};
export default Exam;
