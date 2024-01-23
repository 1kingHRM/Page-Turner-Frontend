"use client";

import React, { useState } from "react";

import Books from "./Books";

import Link from "next/link";

import { CiLogout } from "react-icons/ci";

import Image from "next/image";
import Logo from "@/public/Logo.png";

const Dashboard = () => {

  const logout = () => {
    window.localStorage.setItem("page-turner", "");
    window.location.replace("/");
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-pale flex flex-col">
      <div className="flex flex-row items-center justify-between h-[10vh] px-10 border-[1.5px] border-b-faintBlack border-x-0 border-t-0">
        <Link
          href={"/"}
          className="w-[20vw] text-2xl text-tertiary flex items-center gap-2"
        >
          <Image src={Logo} alt="logo" className="w-[8vh] h-[5vh] " />
          <p className="text-xl lg:text-3xl text-tertiary font-medium">
            Page Turner
          </p>
        </Link>
        <div onClick={logout} className="flex gap-2 items-center justify-center hover:underline cursor-pointer text-tertiary hover:font-medium">
          Logout
          <CiLogout size={22} />
        </div>    
      </div>
      <div className="overflow-y-scroll h-[90vh] scrollbar-custom bg-secondary">
        <Books />
      </div>
    </div>
  );
};

export default Dashboard;
