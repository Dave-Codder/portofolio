"use client";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Worker sesuai pdfjs-dist v3
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({ fileUrl, numPages, onLoadSuccess }) {
  return (
    <div className="flex-1 overflow-y-auto rounded-lg border border-gray-700 p-2">
      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
        loading={<p className="text-gray-400">Loading PDF...</p>}
        className="flex flex-col items-center"
      >
        {numPages &&
          Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 300
                  : 600
              }
            />
          ))}
      </Document>
    </div>
  );
}
