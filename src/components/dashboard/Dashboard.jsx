"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import { CiLogout } from "react-icons/ci";

import Image from "next/image";
import Logo from "@/public/Logo.png";

import { MdDashboard, MdAutoStories, MdAir, MdSettings } from "react-icons/md";

import Overview from "./Overview";
import Genres from "./Genres";
import Books from "./Books";
import Settings from "./Settings";

const Dashboard = () => {
  const navs = [
    {
      name: "Overview",
      icon: <MdDashboard size={26} />,
      component: <Overview />,
    },
    {
      name: "Books",
      icon: <MdAutoStories size={26} />,
      component: <Books />,
    },
    {
      name: "Genres",
      icon: <MdAir size={26} />,
      component: <Genres />,
    },
    {
      name: "Settings",
      icon: <MdSettings size={26} />,
      component: <Settings />,
    },
  ];

  const [active, setActive] = useState(0);

  const logout = () => {
    window.localStorage.setItem("page-turner", "");
    window.location.replace("/");
  };

  useEffect(() => {
    let userData = window.localStorage.getItem("page-turner");
    if (userData === undefined || userData === null || userData.length === 0) {
      window.location.replace("/");
      return <></>;
    }
  }, []);

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
        <div className="w-2/5 flex  h-10 items-center justify-around">
          {navs.map((nav, i) => {
            return (
              <p
                key={i}
                onClick={() => {
                  setActive(i);
                }}
                className={`text-2xl cursor-pointer flex gap-2 items-center text-tertiary ${
                  active === i && "font-[600] underline"
                }`}
              >
                {nav.icon}
                {nav.name}
              </p>
            );
          })}
        </div>
        <div
          onClick={logout}
          className="flex gap-2 items-center justify-center hover:underline cursor-pointer text-tertiary hover:font-medium text-2xl"
        >
          Logout
          <CiLogout size={22} />
        </div>
      </div>
      <div className="overflow-y-scroll h-[90vh] bg-secondary">
        {navs[active].component}
      </div>
    </div>
  );
};

export default Dashboard;
