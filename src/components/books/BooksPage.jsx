"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Three from "@/public/Three.png";
import axios from "axios";
import baseUrl from "@/src/constants/api";

import { Loader } from "@mantine/core";
import Footer from "../reusable/Footer";

function scrollToElement(elementID) {
  const element = document.getElementById(elementID);
  element?.scrollIntoView({ behavior: "smooth" });
}

const BooksPage = () => {
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (genres.length === 0) {
      axios({
        method: "GET",
        url: `${baseUrl}/genres`,
      })
        .then((res) => {
          setGenres(res.data.payload);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [genres]);

  function search(query) {
    window.location.href = `/results/search ${query}`;
  }

  return (
    <div className="w-[100vw] h-auto">
      <div className="w-full h-[100vh] relative">
        <Image
          src={Three}
          alt=""
          className="object-cover w-full h-full absolute top-0 left-0 -z-10"
        />
        <div className="bg-[#000000CC] flex flex-col items-center justify-center w-full h-full z-5">
          <p className="text-3xl lg:text-6xl text-white font-medium">
            Page Turner
          </p>
          <input
            type="search"
            placeholder="Search Book Title or Book Author"
            value={searchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search(searchText);
              }
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="focus:outline-none mt-5 py-2 px-3 border border-tertiary1 rounded-lg lg:w-[400px] w-[70%] text-tertiary placeholder:text-gray-500 bg-offWhite"
          />
          <p className="mt-5 text-white lg:text-2xl text-lg">
            Or browse through our{" "}
            <span
              onClick={() => scrollToElement("genre-section")}
              className="font-[600] underline cursor-pointer"
            >
              genres
            </span>
          </p>
        </div>
      </div>
      <div className="w-full h-auto bg-pale py-20 flex flex-col">
        <p className="text-4xl text-center text-tertiary" id="genre-section">
          Genres
        </p>
        {!loading && (
          <div className="flex flex-col gap-5 mt-16 lg:px-[10%] px-[5%]">
            {genres.map((genre, i) => {
              return (
                <Link
                  key={i}
                  href={`/results/genre ${genre.name}`}
                  className="text-2xl hover:underline hover:font-[600] text-tertiary w-fit"
                >
                  &#8226; {genre.name}
                </Link>
              );
            })}
          </div>
        )}

        {loading && (
          <div className="w-full h-56 flex justify-center items-center">
            <Loader color="brown.6" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BooksPage;
