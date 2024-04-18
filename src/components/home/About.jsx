import React from "react";

import Image from "next/image";
import Me from "@/public/Author.jpg";

const About = () => {
  return (
    <div className="h-auto flex lg:flex-row flex-col-reverse bg-gradient-to-b from-white to-pale justify-between lg:px-[10%] px-[5%] py-20">
      <Image
        src={Me}
        alt="Author"
        className="lg:w-[50%] w-full h-auto lg:h-[80vh] object-cover rounded-xl shadow-xl lg:mt-0 mt-10"
      />
      <div className="lg:w-[40%] w-full lg:mt-0 mt-20 flex flex-col lg:text-xl text-lg justify-center items-center">
        <p className="lg:text-2xl text-xl underline text-tertiary mb-10 text-center font-[600]">
          About
        </p>
        <p className="lg:text-xl text-lg text-tertiary lg:text-start text-center">
          My name is Dada Temitola, a final year student of Cardiff Metropolitan
          University. My student ID is ST20210859. This is my final year
          project.
        </p>
        <p className="lg:text-xl text-lg text-tertiary mt-5 lg:text-start text-center">
          Page Turner was created with one goal in mind: to bring the joy of
          reading to everyone. I believe that reading is one of the most
          rewarding activities, and I want to make it easier for people to find
          and read the books they love. This library management system is
          designed to make your reading experience as enjoyable and convenient
          as possible.
        </p>
        <p className="lg:text-xl text-lg text-tertiary mt-5 lg:text-start text-center">
          I hope you enjoy using Page Turner and find it to be a valuable
          resource for your reading needs.
        </p>
      </div>
    </div>
  );
};

export default About;
