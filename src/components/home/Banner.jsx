"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/public/Hero.png";
import Logo from "@/public/Logo.png";

import { motion } from "framer-motion";
import NavBar from "../reusable/NavBar";

const Banner = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let userData = window.localStorage.getItem("page-turner");
    if (userData !== undefined && userData !== null && userData.length > 0) {
      setHide(true);
    }
  }, []);

  return (
    <div className="bg-pale lg:h-[90vh] h-auto flex flex-col lg:px-[10%] px-[5%] pt-5 pb-10 justify-between">
      <NavBar hideLogin={hide} />
      <div className="flex lg:flex-row flex-col mt-10 w-full justify-between">
        <div className="flex flex-col lg:w-[40%] w-full justify-center">
          <p className="text-primary lg:text-4xl text-2xl leading-10 font-medium lg:text-start text-center">
            Discover the joy of reading with{" "}
            <span className="text-tertiary text-3xl lg:text-6xl font-[700]">
              Page Turner
            </span>
          </p>

          <p className="text-xl mt-10 text-tertiary text-center lg:text-start">
            Our online library management system makes it easy to find and read
            your favourite books. With a wide selection of titles and a
            user-friendly interface, you'll be sure to find something that
            sparks your imagination. So turn the page on your old reading habits
            and join the Page Turner community today!
          </p>

          <Link href={"/books"}>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              className="px-4 py-3 rounded-lg bg-primary text-white mt-10 shadow-lg font-medium text-xl lg:w-[200px] w-full"
            >
              Explore Now
            </motion.button>
          </Link>
        </div>
        <div className="lg:w-[50%] w-full lg:mt-0 mt-10">
          <Image src={Hero} alt="" className="object-contain w-full" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
