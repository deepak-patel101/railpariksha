import React, { useEffect } from "react";
import TrendingCom from "../components/Trendings/TrndingComp";
import Objection from "../components/Feedback/Objection";
import { useGlobalContext } from "../Context/GlobalContextOne";
const FeedBack = () => {
  const { setActivePage } = useGlobalContext();
  useEffect(() => {
    setActivePage("Feedback");
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <Objection />
    </div>
  );
};
export default FeedBack;
