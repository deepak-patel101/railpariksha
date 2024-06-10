import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalContextOne";
import { FaFilePdf } from "react-icons/fa6";
import PdfReader from "./PdfReader";
import { read } from "@popperjs/core";
import { redirect } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const NotesReader = () => {
  const { subject } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);

  return (
    <div
      className="p-4"
      style={{
        background: "white",
        height: "80vh",
        maxWidth: "150vh",
        boxShadow: "5px 5px 10px rgba(0,0,0, 0.3)",
        borderRadius: "10px",
      }}
    >
      {readMore ? (
        <div
          style={{
            margin: "0",
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
          }}
          onClick={() => setReadMore(!readMore)}
        >
          <div
            className="position-relative "
            onClick={(e) => e.stopPropagation()} // Stop click event propagation
          >
            <div
              className="position-absolute top-0 end-0 m-2 "
              style={{ cursor: "pointer", background: "white" }}
              onClick={() => setReadMore(!readMore)}
            >
              <IoCloseCircleSharp />
            </div>
            <PdfReader onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      ) : null}
      <div className="row">
        <div
          className="col-4"
          style={{ maxHeight: "70vh", overflowY: "auto", position: "fix" }}
        >
          <nav
            id="navbar-example3"
            className="h-100 flex-column align-items-stretch pe-4 border-end"
            style={{ background: "white", height: "auto" }}
          >
            <nav className="nav nav-pills flex-column">
              {Object.entries(subject?.topics).map(([key, value], index) => {
                return (
                  <a
                    key={key}
                    className="btn btn-outline-primary m-1"
                    href={`#item-${key}`}
                  >
                    {value.topic}
                  </a>
                );
              })}
            </nav>
          </nav>
        </div>

        <div className="col-8">
          <div
            data-bs-spy="scroll"
            data-bs-target="#navbar-example3"
            data-bs-smooth-scroll="true"
            className="scrollspy-example-2"
            tabIndex="0"
            style={{ maxHeight: "70vh", overflowY: "auto", position: "fix" }}
          >
            {Object.entries(subject?.topics).map(([key, value], index) => {
              return (
                <div id={`item-${key}`}>
                  <h4>{value.topic}</h4>
                  <p>
                    <ul>
                      <li>
                        <strong>1.7.4 Over Head equipment (OHE)</strong>
                        <br />A system of conductors / equipments carrying
                        traction power from traction sub station to electric
                        locomotive.
                      </li>
                      <li>
                        <strong>1.7.5 Neutral Section (NS)</strong>
                        <br />
                        To separate OHE of two adjoining feed posts. A short
                        neutral section (PTFE) type is provided opposite the
                        Traction Sub Station to avoid the need of lowering the
                        pantograph during extended feed conditions.
                      </li>
                      <li>
                        <strong>1.7.6 Sectioning Post (SP)</strong>
                        <br />
                        <ol>
                          <li>
                            To facilitate the extension of traction power from
                            one feed zone to half of the adjoining feed zone
                            during emergency.
                          </li>
                          <li>
                            Parallel the UP and DN OHE in double the sections.
                          </li>
                        </ol>
                      </li>
                      <li>
                        <strong>
                          1.7.7 Sub-sectioning and paralleling post (SSP)
                        </strong>
                      </li>
                    </ul>
                  </p>{" "}
                  <button
                    className="btn btn-outline-success"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {" "}
                    <FaFilePdf /> Read more
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesReader;
