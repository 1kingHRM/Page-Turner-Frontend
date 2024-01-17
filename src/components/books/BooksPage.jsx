"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/public/Books.png";
import Logo from "@/public/Logo.png";

import { motion } from "framer-motion";

const BooksPage = () => {
  return (
    <div className="w-[100vw] h-auto bg-gradient-to-b from-pale to-secondary">
      <div className="w-full h-[60vh] bg-primary"></div>
      <div className="h-[10vh] flex items-center justify-between lg:px-[10%] px-[5%] py-5">
        <Link
          href={"/"}
          className="w-[20vw] text-2xl text-tertiary flex items-center gap-2"
        >
          <Image src={Logo} alt="logo" className="w-[8vh] h-[5vh] " />
          <p className="lg:text-2xl text-tertiary font-[600]">Page Turner</p>
        </Link>
      </div>
    </div>
  );
};

export default BooksPage;
