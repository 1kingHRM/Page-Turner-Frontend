"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/public/Books.png";
import Logo from "@/public/Logo.png";

import Three from "@/public/Three.png";

import { motion } from "framer-motion";

import Arts from "@/public/Arts.png";
import Food from "@/public/Food.png";
import Geography from "@/public/Geography.png";
import History from "@/public/History.png";
import Knowledge from "@/public/Knowledge.png";
import Movie from "@/public/Movie.png";
import Music from "@/public/Music.png";
import Science from "@/public/Science.png";
import Society from "@/public/Society.png";
import Sports from "@/public/Sports.png";
import OfferCard from "../reusable/OfferCard";

const BooksPage = () => {
  const offers = [
    {
      image: Arts,
      name: "Arts and Literature",
    },
    {
      image: Food,
      name: "Food and Drink",
    },
    {
      image: Geography,
      name: "Geography",
    },
    {
      image: History,
      name: "History",
    },
    {
      image: Movie,
      name: "Film and TV",
    },
    {
      image: Music,
      name: "Music",
    },
    {
      image: Science,
      name: "Science",
    },
    {
      image: Society,
      name: "Society and Culture",
    },
    {
      image: Sports,
      name: "Sports and Leisure",
    },
    {
      image: Knowledge,
      name: "General Knowledge",
    },
  ];

  return (
    <div className="w-[100vw] h-auto">
      <div className="w-full h-[100vh] relative">
        <Image src={Three} alt="" className="object-cover w-full h-full absolute top-0 left-0 -z-10"/>
        <div className="bg-[#000000CC] flex flex-col items-center justify-center w-full h-full z-5">
        <p className="text-2xl lg:text-6xl text-white font-medium">
          Page Turner
        </p>
        <input
                type="search"
                placeholder="Search Book Title or Book Author"
                // value={searchText}
                // onKeyDown={handleKeyDown}
                // onChange={onTextChange}
                className="focus:outline-none mt-5 py-2 px-3 border border-tertiary1 rounded-lg lg:w-[400px] text-tertiary bg-offWhite"
              />
        <p className="mt-5 text-white lg:text-2xl text-lg">Or browse through our <span className="font-[600] underline">genres</span></p>
        </div>
      </div>
      <div className="w-full h-auto bg-pale py-20 flex flex-col">
        <p className="text-4xl text-center text-tertiary">Categories</p>
        <div className="flex lg:flex-col flex-row gap-0 lg:gap-20 mt-20">
          <div className="flex justify-around items-center gap-10 flex-col lg:flex-row w-full lg:px-[10%] px-0">
            {offers.map((offer, i) => {
              return i < 5 ? (
                <OfferCard key={i} image={offer.image} name={offer.name} />
              ) : (
                <></>
              );
            })}
          </div>
          <div className="flex justify-around items-center gap-10 flex-col lg:flex-row w-full lg:px-[10%] px-0">
            {offers.map((offer, i) => {
              return i >= 5 ? (
                <OfferCard key={i} image={offer.image} name={offer.name} />
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
