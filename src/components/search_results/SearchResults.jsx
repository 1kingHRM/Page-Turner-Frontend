"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";

import baseUrl from "@/src/constants/api";
import NavBar from "../reusable/NavBar";
import { Loader } from "@mantine/core";
import Footer from "../reusable/Footer";
import Link from "next/link";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

const SearchResults = ({ search }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [googleSearchUrl, setGoogleSearchUrl] = useState("");

  useEffect(() => {
    let genre = search.startsWith("genre");
    let query = search.substring(genre ? 8 : 9);

    setGoogleSearchUrl(`https://www.google.com/search?q=${query}`);

    if (books.length === 0) {
      axios({
        method: "GET",
        url: `${baseUrl}/books${
          genre ? `/genre/${query}` : `?search=${query}`
        }`,
      })
        .then((res) => {
          setLoading(false);
          setBooks(res.data.payload);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, []);

  function formatQuery(query, start = 1) {
    let splits = query.split("%20");
    let result = "";
    for (let i = start; i < splits.length; ++i) {
      result += splits[i];
      if (i !== splits.length - 1) {
        result += " ";
      }
    }
    return result;
  }

  return (
    <div
      className={`bg-pale w-[100vw] ${
        books.length === 0 ? "h-[100vh]" : "h-auto"
      } flex flex-col lg:px-[10%] px-[5%] pt-5 pb-10`}
    >
      <NavBar hideLogin={true} />
      <h2 className="text-tertiary text-2xl lg:text-3xl mt-10 text-center font-[400]">
        Showing search results for{" "}
        <span className="font-[600]">{formatQuery(search)}</span>
      </h2>

      {loading && (
        <div className="w-full h-56 flex justify-center items-center">
          <Loader color="brown.6" />
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="flex lg:flex-row flex-col lg:flex-wrap gap-5 mt-20 lg:px-0 px-[10%] pb-20">
          {books.map((book, i) => {
            return (
              <Link
                key={i}
                href={`/book/${book._id}`}
                className="flex flex-col w-[250px] h-[280px]"
              >
                <div className=" w-[250px] h-[220px] overflow-x-hidden overflow-y-hidden">
                  <Document file={book.file}>
                    <Page
                      pageNumber={1}
                      width={250}
                      height={220}
                      renderTextLayer={false}
                    />
                  </Document>
                </div>

                <p className="font-[600] text-xl text-center text-tertiary mt-2 hover:underline">
                  {book.title}
                </p>
                <p className="text-md font-[400] text-center text-tertiary">
                  By: {book.author}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center text-tertiary lg:text-4xl text-2xl my-10">
          There are no books in the database that match your search
        </div>
      )}

      <div className="flex flex-col  w-full items-center justify-center">
        <p className="lg:text-2xl text-xl text-tertiary font-medium">
          Did not find what you were looking for?
        </p>
        <Link
          href={googleSearchUrl}
          target="__blank"
          className="lg:text-xl text-lg text-tertiary"
        >
          Check it out on <span className="font-[600] underline">Google</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
