"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "../reusable/NavBar";
import Footer from "../reusable/Footer";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

const Book = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  useEffect(() => {
    if (book.title === undefined || book.title === null) {
      axios({
        method: "GET",
        url: `${baseUrl}/books/${id}`,
      })
        .then((res) => {
          setBook(res.data.payload);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Could not get the book from the server");
        });
    }
  }, []);

  function download() {
    axios({
      method: "POST",
      url: `${baseUrl}/downloads`,
      data: {
        bookId: id,
      },
    })
      .then((res) => (window.location.href = book.file))
      .catch((err) => (window.location.href = book.file));
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        theme="colored"
      />
      <div
        className={`bg-pale w-[100vw] ${
          loading ? "h-[100vh]" : "h-auto"
        } flex flex-col lg:px-[10%] px-[5%] pt-5 pb-10`}
      >
        <NavBar hideLogin={true} />
        {!loading && book.title !== undefined && book.title !== null && (
          <div className="flex flex-col mt-20">
            <h1 className="lg:text-4xl text-2xl text-tertiary text-center underline">
              {book.title}
            </h1>
            <h2 className="lg:text-2xl text-xl text-tertiary text-center">
              Written by {book.author}
            </h2>
            <div className=" w-full h-[500px] scrollbar-custom overflow-scroll mt-5">
              <Document file={book.file}>
                <Page
                  pageNumber={1}
                  width={1024}
                  height={500}
                  renderTextLayer={false}
                />
              </Document>
            </div>

            <p className="text-xl lg:text-2xl text-tertiary font-normal text-start mt-5">
              {book.description}
            </p>

            <div className="flex w-full items-center justify-center mt-10 mb-20">
              <button
                onClick={download}
                className="bg-primary text-white text-xl rounded-lg px-4 py-3 lg:w-[300px]"
              >
                Download
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Book;
