import React, { useEffect } from "react";
import DiscussMain from "../components/DiscussMain";
const YourIdeas = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <DiscussMain />{" "}
    </div>
  );
};
export default YourIdeas;
