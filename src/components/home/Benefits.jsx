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
    <div className="flex flex-col bg-gradient-to-b from-pale to-white h-auto items-center">
      <p className="py-20 text-tertiary font-[600] text-2xl  lg:text-4xl underline">
        Features
      </p>
      <div className="flex flex-col justify-start gap-3 w-full items-start px-[10%]">
        {features.map((feature, i) => {
          return (
            <p
              key={i}
              className="lg:text-2xl text-xl text-tertiary font-medium"
            >
              &#8226; {feature}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Benefits;
