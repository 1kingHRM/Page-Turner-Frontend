"use client";

import React, { useState } from "react";

import SideNav from "./SideNav";
import Overview from "./Overview";
import Members from "./Members";
import Books from "./Books";
import Settings from "./Settings";

import { CiLogout } from "react-icons/ci";

import Image from "next/image";
import Me from "@/public/Author.jpg";

const Dashboard = () => {
  const [activePage, setActivePage] = useState(1);
  const pages = [
    {
      name: "Overview",
      component: <Overview />,
    },
    {
      name: "Books",
      component: <Books />,
    },
    {
      name: "Settings",
      component: <Settings />,
    },
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-pale flex lg:flex-row">
      <div className="lg:block hidden w-[15vw] h-full">
        <SideNav
          active={activePage}
          setIndex={(index) => setActivePage(index)}
        />
      </div>
      <div className="w-[85vw] h-full flex flex-col">
        <div className="flex flex-row items-center justify-between h-[10vh] px-20 border-[1.5px] border-b-faintBlack border-x-0 border-t-0">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none py-2 px-3 border border-faintBlack rounded-lg w-[300px] text-tertiary bg-offWhite"
            />
          </div>
          <div className="flex items-center">
            <Image
              src={Me}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        </div>
        <div className="overflow-y-scroll h-[90vh] scrollbar-custom ">
          {pages[activePage].component}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
