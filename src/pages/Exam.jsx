import React from "react";
import Topics from "../components/Topics";
import { useGlobalContext } from "../Context/GlobalContextOne";
const Exam = () => {
  const { subject } = useGlobalContext();
  return (
    <>
      <h1>Exam</h1>
      {subject ? <Topics /> : null}
    </>
  );
};
export default Exam;
