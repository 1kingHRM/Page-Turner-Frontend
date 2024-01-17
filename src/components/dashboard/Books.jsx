import React, { useState } from "react";
import { MdAutoStories, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Loader, Modal } from "@mantine/core";
import Image from "next/image";
import Arts from "@/public/Arts.png";

const Books = () => {
  const [opened, setOpened] = useState(false);

  const books = [
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },

    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
    {
      id: 1,
      name: "The Lost Book",
      author: "James Cameron",
      image: Arts,
    },
  ];

  return (
    <div className="w-full flex flex-col h-auto px-10 bg-secondary">
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-2xl text-slate-950 mt-5 font-medium">Books</p>
          <p className="text-sm text-tertiary2">
            Add new books, edit books or remove books
          </p>
        </div>

        <div className="flex items-center gap-10">
          <input
            type="text"
            placeholder="Search Book"
            className="focus:outline-none py-2 px-3 border border-tertiary1 rounded-lg w-[300px] text-tertiary bg-offWhite"
          />
          <button className="py-2 px-4 bg-primary rounded-lg flex items-center gap-2 shadow-lg">
            <MdAutoStories size={20} />
            Add Book
          </button>
        </div>
      </div>
      <Loader color="brown.1" />
      <div className="my-20 flex flex-wrap gap-10">
        {books.map((book, i) => {
          return (
            <div
              key={i}
              className="bg-white flex flex-col shadow-lg rounded-lg w-[200px] h-[250px]"
            >
              <Image
                src={book.image}
                alt=""
                className="w-full h-[120px] object-contain"
              />
              <div className="px-2 flex flex-col">
                <p className="font-medium text-xl text-slate-950">
                  {book.name}
                </p>
                <p className="text-md text-slate-950">By: {book.author}</p>
                <div className="flex justify-around items-center text-tertiary my-5">
                  <div
                    className="p-2 rounded-lg bg-primary cursor-pointer"
                    onClick={() => setOpened(true)}
                  >
                    <MdEdit size={20} />
                  </div>
                  <div className="p-2 rounded-lg bg-primary cursor-pointer">
                    <MdDelete size={20} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className="h-20 w-20"></div>
      </Modal>
    </div>
  );
};

export default Books;
