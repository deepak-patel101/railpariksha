import React from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Topics = () => {
  const { subject } = useGlobalContext();
  console.log(subject);
  return (
    <>
      {Object.entries(subject?.topics).map(([key, value], index) => {
        return (
          <button key={key} className="btn btn-outline-primary  m-1">
            {value.topic}
          </button>
        );
      })}
    </>
  );
};
export default Topics;
