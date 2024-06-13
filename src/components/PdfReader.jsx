import React, { useState, useEffect } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

import pdf from "./pdf.pdf";

const PdfReader = ({ link }) => {
  const [defPdf] = useState(pdf);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchMastInfo = async () => {
    try {
      const response = await fetch(
        "https://drive.google.com/uc?export=download&id=1m-2YH1BrCOPs8Vr6qYd_T8YZtTGlYlwH"
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const data = await response.json();
    } catch (error) {
      console.error("Error fetching SUBJECT_MASTER info:", error);
    }
  };

  useEffect(() => {
    // fetchMastInfo();
  }, [link]);

  useEffect(() => {
    const handleResize = () => {
      setIsFullscreen(window.innerWidth < 580);
    };

    // Set initial mode
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="container"
      style={{
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="pdf-container"
        style={{
          width: isFullscreen ? "90vw" : "90vw",
          height: isFullscreen ? "90vh" : "90vh",
        }}
      >
        {defPdf && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={defPdf} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        )}
      </div>
    </div>
  );
};

export default PdfReader;
