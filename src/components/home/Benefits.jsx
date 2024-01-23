import React from "react";

import Image from "next/image";
import Logo from "@/public/Logo.png";

const Benefits = () => {
  const features = [
    "A simple search function that allows users to find books by their title or author",
    "Download any book directly to your device",
    "A clean, minimalist interface that is very easy to navigate",
  ];
  return (
    <div className="flex flex-col bg-gradient-to-b from-pale to-white lg:h-[70vh] h-auto items-center">
      <p className="py-20 text-tertiary font-[600] text-4xl underline">
        Features
      </p>
      <div className="flex lg:flex-row flex-col justify-around">
        {features.map((feature, i) => {
          return (
            <div key={i} className={`bg-gradient-to-b from-pale to-secondary   ${i === 1 ? "px-5 py-4 w-[15%]" : "px-3 py-3 w-[15%]" } shadow-xl rounded-lg  `  }>
             <p>{feature}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefits;
