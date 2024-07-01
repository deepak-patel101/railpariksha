import React, { useEffect } from "react";
const YourIdeas = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <h1>My Ideas</h1>
    </div>
  );
};
export default YourIdeas;
