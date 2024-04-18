import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

const NavBar = ({ hideLogin = false }) => {
  return (
    <div className="h-[10vh] flex bg-pale items-center justify-between">
      <Link
        href={"/"}
        className="lg:w-[20vw] text-2xl text-tertiary flex items-center gap-2"
      >
        <Image src={Logo} alt="logo" className="w-[8vh] h-[5vh] " />
        <p className="text-xl lg:text-3xl text-tertiary font-medium">
          Page Turner
        </p>
      </Link>

      {!hideLogin && <Link
        href={"/sign-in"}
        className="px-4 py-3 rounded-lg bg-primary text-white shadow-lg
        font-medium text-xl w-[120px] text-center"
      >
        Sign In
      </Link>}
    </div>
  );
};

export default NavBar;
