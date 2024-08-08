import React, { useEffect } from "react";
import TrendingCom from "../components/Trendings/TrndingComp";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Trending = () => {
  const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("trending");
  }, []);
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
