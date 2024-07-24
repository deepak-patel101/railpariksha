import React, { lazy, Suspense } from "react";
import GoBackCom from "../GoBackCom";

const Cards = lazy(() => import("./Cards"));

const TrendingCom = () => {
  return (
    <div className="container">
      <GoBackCom link={"/"} page={"Trending"} />
      <div className="row papaDiv mb-3 mt-3 justify-content-center align-item-center">
        <div className="col-12 col-md-3 mb-2">
          <Suspense fallback={<div>Loading...</div>}>
            <Cards
              title={"Video"}
              TextData={
                "Explore the most-watched videos and accelerate your learning."
              }
            />
          </Suspense>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <Suspense fallback={<div>Loading...</div>}>
            <Cards
              title={"Question"}
              TextData={
                "Test your knowledge with trending questions that everyone is talking about."
              }
            />
          </Suspense>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <Suspense fallback={<div>Loading...</div>}>
            <Cards
              title={"Discussion"}
              TextData={
                "Join the conversation, share insights, and learn from others."
              }
            />
          </Suspense>
        </div>
        <div className="col-12 col-md-3 mb-2">
          <Suspense fallback={<div>Loading...</div>}>
            <Cards
              title={"Leader Board"}
              TextData={
                "Climb the ranks and see where you stand among the best."
              }
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TrendingCom;
