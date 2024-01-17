"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/public/Hero.png";
import Logo from "@/public/Logo.png";

import { motion } from "framer-motion";

const BooksPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-pale to-secondary lg:px-[10%] px-[5%] py-5">
      <div className="h-[10vh] flex items-center justify-between">
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
