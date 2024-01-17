"use client";

import React, { useState } from "react";

import Image from "next/image";
import Logo from "@/public/Logo.png";

import Link from "next/link";
import { motion } from "framer-motion";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-pale w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-white h-[65vh] w-[30vw] rounded-lg shadow-lg flex flex-col items-center">
        <Image src={Logo} alt="" className="w-[75px] h-auto pt-10" />
        <p className="py-5 text-2xl text-tertiary">
          Welcome back to Page Turner
        </p>

        <div className="flex flex-col items-start lg:justify-center lg:items-center mt-10 w-full px-[5%]">
          <div className="flex flex-col w-full lg:w-fit">
            <p className="text-tertiary text-base font-medium leading-loose mb-1">
              Email Address
            </p>
            <input
              type="email"
              className="lg:w-[350px] w-full font-normal border border-faintBlack px-2 py-2.5 focus:outline-none rounded-sm mb-3"
              placeholder="example@example.com"
              id="emailID"
            />
          </div>
          <div className="flex flex-col w-full lg:w-fit">
            <p className="text-slate-950 text-base font-medium leading-loose mb-1">
              Password
            </p>
            <div className="relative lg:w-[350px] w-full flex justify-center items-center">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="lg:w-[350px] w-full font-normal border border-faintBlack px-2 py-2.5 focus:outline-none rounded-sm"
                placeholder=""
                id="passwordID"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEyeOff fill="#470912" size={"20px"} />
                ) : (
                  <IoMdEye fill="#470912" size={"20px"} />
                )}
              </div>
            </div>
          </div>
        </div>

        <Link href={"/dashboard"}>
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            className="py-2 rounded-lg bg-primary text-white mt-10 shadow-lg font-medium text-xl lg:w-[200px] w-full"
          >
            Sign In
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
