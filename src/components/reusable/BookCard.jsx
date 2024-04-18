"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

function randomStart() {
  let x = Math.floor(Math.random() * 10 + 5);
  return [0, x, -x, 0];
}

const BookCard = ({ image, name, key }) => {
  const [range, setRange] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setRange(randomStart());
  }, []);

  return (
    <motion.div
      key={key}
      animate={{
        y: range,
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.2,
      }}
      className="flex flex-col cursor-pointer bg-secondary w-[150px] h-[150px] rounded-lg shadow-xl items-center px-2 justify-center"
    >
      <Image src={image} className="lg:w-[55px] w-[40px] h-auto" alt=" " />
      <p className="text-white mt-4 text-center text-[12px] lg:text-[14px] font-medium cursor-default">
        {name}
      </p>
    </motion.div>
  );
};

export default BookCard;
