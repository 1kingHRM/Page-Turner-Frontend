import React from "react";

import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";

import { MdDashboard, MdSettings, MdAutoStories } from "react-icons/md";
import Link from "next/link";

const SideNav = ({ active, setIndex }) => {
  const navs = [
    {
      name: "Overview",
      icon: <MdDashboard size={26} />,
    },
    {
      name: "Books",
      icon: <MdAutoStories size={26} />,
    },
    {
      name: "Settings",
      icon: <MdSettings size={26} />,
    },
  ];

  const logout = () => {
    window.localStorage.setItem("page-turner", "");
    window.location.replace("/");
  }

  return (
    <div className="w-full h-full flex flex-col border-[1.5px] border-r-faintBlack border-y-0 border-l-0">
      <Link href={"/"} className="flex items-center px-5 h-[10vh] ">
        <p className="text-2xl font-[600] text-tertiary">Page Turner</p>
      </Link>

      <div className="pb-10 flex flex-col h-full w-full justify-between items-center">
        <div className="flex flex-col px-2 gap-2 mt-5 w-full">
          {navs.map((nav, i) => {
            return (
              <motion.div
                onClick={() => setIndex(i)}
                whileHover={{
                  scale: 1.02,
                }}
                key={i}
                className={`flex items-center  ${i === active && "bg-primary text-white hover:bg-primary"
                  } hover:bg-secondary hover:text-black text-tertiary font-normal rounded-lg text-md w-full py-2 gap-3 pl-5 cursor-pointer`}
              >
                {nav.icon}
                {nav.name}
              </motion.div>
            );
          })}
        </div>

        <div onClick={logout} className="mt-10 flex gap-2 items-center justify-center hover:underline cursor-pointer text-tertiary hover:font-medium">
          Logout
          <CiLogout size={22} />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
