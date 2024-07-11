import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { useGlobalContext } from "../../Context/GlobalContextOne";
import { FaFileUpload } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { FaUpload } from "react-icons/fa";
import ExcelExample from "../../img/excelExample.jpg";
import { MdNearbyError } from "react-icons/md";

const FileUpload = () => {
  const { departments } = useGlobalContext();
  const [file, setFile] = useState(null);
  const [selectedSubcode, setSubcode] = useState(""); // renamed from subcode
  const [department, setDepartment] = useState("");
  const [topcode, setTopcode] = useState("");
  const [viewExample, setViewExample] = useState(false);
  const [queFrom, setQueFrom] = useState("");
  const [loading, setLoading] = useState(false);
  const [excelMsg, setExcelMsg] = useState(false);
  const [fileTypeCheck, setFileTypeCheck] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  useEffect(() => {
    setSubcode("");
  }, [department]);
  const handleFileChange = (e) => {
    setExcelMsg(false);
    setFileTypeCheck(false);
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    // Check file type
    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(selectedFile.type)
    ) {
      setFileTypeCheck(true);
      // alert("Please select a valid Excel file.");
      e.target.value = null; // Reset the file input
      return;
    }

    // Proceed with setting the file state
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    // Validate the file type before processing
    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      alert("Please select a valid Excel file.");
      setFile(null);
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const keysArray = [
        "Question",
        "Option1",
        "Option2",
        "Option3",
        "Option4",
        "Answer",
        "Difficulty",
      ]; // Example array of keys to check

      const hasAllKeys = keysArray.every((key) => key in jsonData[0]);

      // Include the additional input data
      const payload = {
        selectedSubcode,
        topcode,
        queFrom,
        data: jsonData,
      };
      if (hasAllKeys) {
        setExcelMsg(false);
        // Send data to the backend
        fetch(
          "https://railwaymcq.com/railwaymcq/RailPariksha/InsertMCQfromExcel.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setLoading(false); // Set loading to false here
            if (data.message === "Data inserted successfully") {
              alert("Data inserted successfully");
              setDepartment("");
              setSubcode("");
              setTopcode("");
              setFile(null);
              setQueFrom("");
              if (fileInputRef.current) {
                fileInputRef.current.value = null; // Reset the file input field
              }
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setLoading(false);
          });
      } else {
        setLoading(false);
        setExcelMsg(true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSampleFile = () => {
    setViewExample(true);
  };

  return (
    <div>
      {viewExample ? (
        <div
          className=""
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            zIndex: "1",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
          onClick={() => setViewExample(false)}
        >
          <div
            className="position-relative m-3 "
            style={{
              boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
              background: "white",
              borderRadius: "15px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
              style={{
                height: "20px",
                width: "20px",
                cursor: "pointer",
                background: "white",
                borderRadius: "50%",
                zIndex: "100",
              }}
              onClick={() => setViewExample(false)}
            >
              <IoCloseCircleSharp
                style={{
                  color: "red",
                  boxShadow: "5px 5px 10px rgba(0,0,0, 0.5)",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="p-1 " style={{ maxWidth: "900px" }}>
              <img
                className="img-fluid"
                src={ExcelExample}
                alt="example Image"
                style={{
                  width: "100%",
                  height: "auto",
                  boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
                  padding: "15px",
                  marginBottom: "15px", // Adding some margin at the bottom for spacing
                  borderRadius: "5px", // Adding border radius for rounded corners
                  backgroundColor: "#ffffff", // Adding background color to the div
                }}
              />
              <h6 className="row m-1 " style={{ color: "red" }}>
                Note- columns name must be same as this table
              </h6>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div
        style={{
          boxShadow: "5px 5px 10px rgba(52,80,142, 0.3)", // Shadow on bottom-right
          padding: "15px",
          marginBottom: "15px", // Adding some margin at the bottom for spacing
          borderRadius: "5px", // Adding border radius for rounded corners
          backgroundColor: "#ffffff", // Adding background color to the div
        }}
      >
        <div className="text-start">
          <h5>
            <FaFileUpload /> Upload mcq using Excel Sheet{" "}
          </h5>
          <hr />
        </div>
        <div className="row ">
          <div className="col col-12 mb-2 col-md-3 mb-1">
            <p
              style={{ margin: "0px", padding: "0px" }}
              className="d-flex text-start"
            >
              {" "}
              Select Department
              <p style={{ color: "red", margin: "0px", padding: "0px" }}> *</p>
            </p>
            <select
              className=" Subject form-select "
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments &&
                Object.entries(departments)?.map(([key, departmentVal]) => (
                  <option key={key} value={departmentVal.deptt}>
                    {departmentVal.deptt}
                  </option>
                ))}
            </select>
          </div>
          <div className="col col-12 mb-2 col-md-3">
            {" "}
            <p
              style={{ margin: "0px", padding: "0px" }}
              className="d-flex text-start"
            >
              {" "}
              Select Subject
              <p style={{ color: "red", margin: "0px", padding: "0px" }}> *</p>
            </p>
            <select
              className=" Subject form-select "
              value={selectedSubcode}
              onChange={(e) => {
                setSubcode(e.target.value);
                // Reset topcode when changing subcode
                setTopcode("");
              }}
            >
              <option value="">Select Subject</option>
              {departments &&
                Object.entries(departments)?.map(([key, departmentVal]) => {
                  if (departmentVal.deptt === department) {
                    return Object.entries(departmentVal?.subjects)?.map(
                      ([subcode, subjects]) => (
                        <option key={subcode} value={subcode}>
                          {subjects.sub}
                        </option>
                      )
                    );
                  }
                  return null; // Return null if no match found
                })}
            </select>
          </div>
          <div className="col col-12 mb-2 col-md-3">
            {" "}
            <p
              style={{ margin: "0px", padding: "0px" }}
              className="d-flex text-start"
            >
              {" "}
              Select Topic
              <p style={{ color: "red", margin: "0px", padding: "0px" }}> *</p>
            </p>
            <select
              className="Subject form-select "
              value={topcode}
              onChange={(e) => setTopcode(e.target.value)}
            >
              <option value="">Select Topic</option>
              {selectedSubcode &&
                Object.entries(departments).map(([key, departmentVal]) => {
                  if (
                    departmentVal?.deptt === department &&
                    selectedSubcode !== "" &&
                    selectedSubcode !== undefined
                  ) {
                    if (departmentVal?.subjects[selectedSubcode]?.topics) {
                      return Object.entries(
                        departmentVal?.subjects[selectedSubcode]?.topics
                      ).map(([topcodeVal, topic]) => (
                        <option key={topcodeVal} value={topic.topcode}>
                          {topic.topic}
                        </option>
                      ));
                    }
                  }
                  return null; // Return null if no match found
                })}
            </select>
          </div>
          <div className="col col-12 mb-2 col-md-3">
            <p
              style={{ margin: "0px", padding: "0px" }}
              className="d-flex text-start"
            >
              {" "}
              Source of MCQ
              <p style={{ color: "red", margin: "0px", padding: "0px" }}> *</p>
            </p>
            <select
              className="form-select Subject"
              value={queFrom}
              onChange={(e) => setQueFrom(e.target.value)}
            >
              <option value="">Select Question from</option>
              <option value="default">Default / Other</option>
              {/* <option value="miscellaneous">miscellaneous</option> */}
              <option value="PDF">PDF</option>
              <option value="PYQ">PYQ</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="row justify-content-center align-items-center ">
          <div className="col col-8">
            <p
              style={{ margin: "0px", padding: "0px" }}
              className="d-flex text-start"
            >
              {" "}
              Select excel file
              <p style={{ color: "red", margin: "0px", padding: "0px" }}> *</p>
            </p>
            <div className=" input-group Subject">
              <input
                className="form-control"
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                ref={fileInputRef} // Assign ref to the file input
              />

              <button
                className={`btn  ${
                  selectedSubcode !== "" && file && topcode !== ""
                    ? "btn-success"
                    : "btn-danger disabled"
                }`}
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="mt-2">
            {excelMsg ? (
              <div style={{ color: "red" }}>
                {" "}
                <MdNearbyError /> Excel file`s columns name didn`t match
              </div>
            ) : null}{" "}
            {fileTypeCheck ? (
              <div style={{ color: "red" }}>
                {" "}
                <MdNearbyError /> Please select a valid Excel file.
              </div>
            ) : null}
            <u
              className="m-1"
              style={{ cursor: "pointer", color: "#2FB44D" }}
              onClick={handleSampleFile}
            >
              <TbHelpSquareRoundedFilled style={{ fontSize: "15px" }} /> Click
              here for sample Excel file
            </u>
            {loading ? (
              <div className=" d-flex justify-content-center">
                <div>
                  <div className=" d-flex ">
                    {" "}
                    <FaUpload className="" />{" "}
                    <b className="">&nbsp; Uploading</b>
                  </div>
                  <div
                    style={{ width: "200px" }}
                    className="row progress"
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow="100%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
