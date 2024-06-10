import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfReader = () => {
  const pdfUrl =
    "https://drive.google.com/uc?export=download&id=1m-2YH1BrCOPs8Vr6qYd_T8YZtTGlYlwH";

  return (
    <div>
      <Worker workerUrl={`${process.env.PUBLIC_URL}/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PdfReader;
