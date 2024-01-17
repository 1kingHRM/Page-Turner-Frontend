import React from "react";

import Image from "next/image";
import One from "@/public/One.png";
import Two from "@/public/Two.png";
import Three from "@/public/Three.png";

const Benefits = () => {
  const features = [
    {
      image: One,
    },
    {
      image: Two,
    },
    {
      image: Three,
    },
  ];
  return (
    <div className="flex flex-col bg-white lg:h-[70vh] h-auto items-center">
      <p className="py-20 text-tertiary font-[600] text-4xl underline">
        Features
      </p>
      <div className="flex lg:flex-row flex-col">
        {features.map((feature, i) => {
          return (
            <div key={i}>
              <Image src={feature.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefits;
