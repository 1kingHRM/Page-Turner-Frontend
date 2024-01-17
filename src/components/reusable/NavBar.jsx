import Link from "next/link";
import React from "react";

const NavBar = ({ active = 0 }) => {
  return (
    <div className="h-[10vh] flex bg-pale px-[10%] items-center justify-between">
      <div className="w-[10vw] text-2xl text-tertiary">Logo</div>

      <div className="w-[25vw] flex items-center justify-center">
        <Link
          href={"/"}
          className="px-4 py-2 bg-primary text-white text-xl font-medium rounded-lg shadow-lg"
        >
          {" "}
          Sign In{" "}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
