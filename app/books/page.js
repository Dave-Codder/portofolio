"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Import PdfViewer hanya di client-side (SSR dimatikan)
const PdfViewer = dynamic(() => import("../components/PdfViewer"), {
  ssr: false,
});

export default function Books() {
  const books = [
    {
      title: "Rahasia mendulang uang dan membangun masa depan di internet",
      desc: "Panduan untuk mendulang uang dan membangun masa depan di internet.",
      filePath:
        "/books/rahasia-mendulang-uang-dan-membangun-masa-depan-di-internet.pdf",
    },
    {
      title: "Clean Code",
      desc: "A handbook for writing maintainable and readable code.",
    },
    {
      title: "You Don’t Know JS",
      desc: "A deep dive into JavaScript’s core concepts.",
    },
  ];

  const [selectedBook, setSelectedBook] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleDownload = (filePath) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop() || "book.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setNumPages(null);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-primary relative"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-12 text-center">
        Recommended Books
      </h1>

      {/* List Buku */}
      <div className="max-w-7xl mx-auto space-y-8">
        {books.map((book, index) => (
          <motion.div
            key={index}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              {book.title}
            </h2>
            <p className="text-text">{book.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-lg shadow-lg w-[95vw] max-w-5xl h-[90vh] flex flex-col relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="mb-4 flex flex-col items-center text-center gap-4">
                {/* Tombol di atas */}
                <div className="flex gap-2">
                  {selectedBook.filePath && (
                    <button
                      onClick={() => handleDownload(selectedBook.filePath)}
                      className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-opacity-90"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>

                {/* Judul buku */}
                <h2 className="text-2xl font-semibold text-secondary">
                  {selectedBook.title}
                </h2>

                {/* Deskripsi buku */}
                <p className="text-text text-center">{selectedBook.desc}</p>
              </div>

              {/* PDF Preview */}
              {selectedBook.filePath ? (
                <PdfViewer
                  fileUrl={selectedBook.filePath}
                  numPages={numPages}
                  onLoadSuccess={onDocumentLoadSuccess}
                />
              ) : (
                <p className="text-gray-400 italic">
                  Preview not available for this book.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
