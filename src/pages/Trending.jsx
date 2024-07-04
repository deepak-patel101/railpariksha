import React, { useEffect } from "react";
import TrendingCom from "../components/Trendings/TrndingComp";
const Trending = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <TrendingCom />
    </div>
  );
};
export default Trending;
