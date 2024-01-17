import React, { useState } from "react";

import { MdPersonAdd } from "react-icons/md";
import { motion } from "framer-motion";
import { Loader, Modal } from "@mantine/core";

const Members = () => {
  const [opened, setOpened] = useState(false);

  const values = [
    {
      id: 1100,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1101,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1102,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1103,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1104,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1105,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
    {
      id: 1106,
      name: "The Maybe Man",
      email: "t@mail.com",
    },
  ];

  return (
    <div className="w-full flex flex-col h-full px-10 bg-secondary">
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-2xl text-tertiary mt-5 font-medium">Members</p>
          <p className="text-sm text-tertiary">
            Add new members or remove existing ones
          </p>
        </div>

        <div className="flex items-center gap-10">
          <input
            type="text"
            placeholder="Search Member"
            className="focus:outline-none py-2 px-3 border border-faintBlack rounded-lg w-[300px] text-tertiary bg-offWhite"
          />
          <button
            onClick={() => {
              setOpened(true);
            }}
            className="py-2 px-4 bg-primary rounded-lg flex items-center gap-2 shadow-lg"
          >
            <MdPersonAdd size={20} />
            Add Member
          </button>
        </div>
      </div>

      <div className="bg-white w-full h-auto py-5 flex shadow-lg rounded-lg flex-col mt-20">
        <div className="flex text-slate-950 w-full mb-5">
          <p className="w-[10%] text-center">ID</p>
          <p className="w-[30%] text-center">Full Name</p>
          <p className="w-[30%] text-center">Email</p>
          <p className="w-[30%] text-center">Actions</p>
        </div>

        <div className="flex flex-col">
          {values.map((value, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.008,
                }}
                className="text-slate-950 cursor-pointer border border-faintBlack border-x-0 border-b-0 flex w-full hover:rounded-lg hover:bg-primary py-2"
              >
                <p className="w-[10%] text-center">{value.id}</p>
                <p className="w-[30%] text-center">{value.name}</p>
                <p className="w-[30%] text-center">{value.email}</p>
                <p className="w-[30%] text-center">Actions</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className="h-20 w-20"></div>
      </Modal>
    </div>
  );
};

export default Members;
