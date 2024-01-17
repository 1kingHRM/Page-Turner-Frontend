import React from "react";

import Image from "next/image";
import { Loader, TextInput } from "@mantine/core";

const Settings = () => {
  return (
    <div className="w-full flex flex-col pt-10 ">
      <div className="flex justify-around items-center rounded-3xl">
        <div className="w-[60%]">
          <p className="text-2xl font-[600] text-white">Profile</p>
          <div className="w-full rounded-3xl h-[70vh] flex flex-col bg-white shadow-lg shadow-tertiary1"></div>
        </div>
      </div>

      <div className="flex justify-around items-center rounded-3xl mt-20">
        <div className="w-[60%]">
          <p className="text-2xl font-[600] text-white">Domain</p>
          <div className="w-full rounded-3xl h-[70vh] flex flex-col bg-white shadow-lg shadow-tertiary1"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
