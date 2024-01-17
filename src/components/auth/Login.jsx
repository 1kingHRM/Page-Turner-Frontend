"use client";

import React from "react";

import Image from "next/image";
import Logo from "@/public/Logo.png";

import Link from "next/link";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="bg-pale w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-white h-[70vh] w-[30vw] rounded-lg shadow-lg flex flex-col items-center">
        <Image src={Logo} alt="" className="w-[75px] h-auto pt-10" />
        <p className="mt-5 text-2xl text-tertiary">
          Welcome back to Page Turner
        </p>

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
