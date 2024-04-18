import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

const Footer = () => {
  return (
    <div className="bg-pale lg:h-[35vh] h-auto flex flex-col lg:px-[10%] px-[5%]">
      <div className="flex mt-10">
        <div className="flex lg:flex-row flex-col items-center justify-center w-full">
          <Image src={Logo} alt="logo" className="w-[30vh] h-[20vh] " />
          <div className="flex-col flex ">
            <p className="text-xl lg:text-2xl text-tertiary font-medium">
              Page Turner
            </p>
            <p className="text-primary lg:text-xl text-lg font-normal">
              The bookworm's best friend
            </p>
          </div>
        </div>
      </div>
      <p className=" mt-10 text-slate-400 sm:text-[16px] text-center sm:leading-[28px] text-base font-normal leading-loose mb-10">
        © {new Date().getFullYear()} Page Turner. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
