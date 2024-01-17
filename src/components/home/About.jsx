import React from "react";

import Image from "next/image";
import Me from "@/public/Author.jpg";

const About = () => {
  return (
    <div className="h-[90vh] flex bg-white justify-between px-[10%] pb-10">
      <Image
        src={Me}
        alt="Author"
        className="w-[50%] h-full object-cover rounded-xl"
      />
      <div className="lg:w-[40%] w-[90%] lg:mt-0 mt-20 bg-secondary h-auto rounded-2xl shadow-xl text-slate-950 flex flex-col lg:text-xl text-lg px-10 py-5">
        <p className="lg:text-2xl text-tertiary mb-10 text-center font-[600]">
          Who am I?
        </p>
        <p>
          My name is Dada Temiloluwa, a final year student of Cardiff
          Metropolitan University. My student ID is St20210859. This is my final
          year project.
        </p>
        <p className="lg:text-2xl text-deepGreen my-10 text-center font-[600]">
          About Page Turner
        </p>
        <p>
          Page Turner was created with one goal in mind: to bring the joy of
          reading to everyone. I believe that reading is one of the most
          rewarding activities, and I want to make it easier for people to find
          and read the books they love. This library management system is
          designed to make your reading experience as enjoyable and convenient
          as possible. I hope you enjoy using Page Turner and find it to be a
          valuable resource for your reading needs.
        </p>
      </div>
    </div>
  );
};

export default About;
