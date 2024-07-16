import React, { useEffect } from "react";
import VideoLearner from "../components/VideoLearner";

const Videos = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div className="container text-center mt-12" style={{ minHeight: "90vh" }}>
      <VideoLearner />
    </div>
  );
};

export default Videos;
