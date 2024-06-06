import React from "react";
import "./css/Subject.css";
import { IoMdArrowDropright } from "react-icons/io";
const Subjects = ({ department }) => {
  const subjects = [
    { name: "Subject 1" },
    { name: "Subject 2" },
    { name: "Subject 3" },
    { name: "Subject 4" },
    { name: "Subject 5" },
    { name: "Subject 6" },
    { name: "Subject 7" },
    { name: "Subject 8" },
    { name: "Subject 9" },
  ];
  return (
    <>
      <div className="container mt-5">
        {" "}
        department={department}
        <div className="row">
          {subjects?.map((subject, index) => (
            <div
              key={index}
              className="col-md-4 mb-3 parent "
              style={{ cursor: "pointer" }}
            >
              <div className="card Subject">
                <div className="card-body">
                  <div className="row">
                    <div className="col-8 col-sm-10 ">
                      {" "}
                      <b className="">{department}</b>
                      <p className="card-title underline">
                        {subject.name}
                      </p>{" "}
                    </div>
                    <div className="col-4 col-sm-2 d-flex arrow justify-content-center align-items-center text-center">
                      <IoMdArrowDropright />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Subjects;
