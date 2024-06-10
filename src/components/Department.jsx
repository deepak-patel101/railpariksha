import React from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import DepartmentCarousel from "./DepartmentCarousel";

const Department = () => {
  const { department_loading, departments, department_error } =
    useGlobalContext();
  console.log(department_loading, departments, department_error);
  return (
    <>
      <DepartmentCarousel departments={departments} />
      <h1>{department_error}</h1>
    </>
  );
};
export default Department;
