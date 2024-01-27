import React, { useState, useEffect } from "react";
import { MdAir, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Loader, Modal, TextInput, Select, Textarea } from "@mantine/core";
import Image from "next/image";
import Arts from "@/public/Arts.png";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Genres = () => {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (genres.length === 0) {
      setLoading(true);
      let userData = window.localStorage.getItem("page-turner");
      userData = JSON.parse(userData);

      axios({
        method: "GET",
        url: `${baseUrl}/genres`,
      }).then((res) => {
        setGenres(res.data.payload)
        setLoading(false);
      }).catch((err) => {
        toast.error("Could not fetch the genres from the server");
        setLoading(false);
      });
    }
  }, [])

  function splitWords(text) {
    let splits = text.split(" ");
    let value = "";
    for (let i = 0; i < splits.length; ++i) {
      value += splits[i];
      if (i !== splits.length - 1) {
        value += "%20";
      }
    }
    return value;
  }

  const openAdd = () => {
    setOpen(true);
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        theme="colored"
      />
      {
        !loading && <div className="w-full flex flex-col h-auto px-10">
          <div className="flex flex-row justify-between items-center">
            <div>
              <p className="text-2xl text-slate-950 mt-5 font-medium">Genres</p>
              <p className="text-sm text-tertiary2">
                Add new genres, edit existing ones or remove genres
              </p>
            </div>

            <div className="flex items-center gap-10">

              <button
                onClick={openAdd}
                className="py-2 px-4 bg-primary rounded-lg flex items-center gap-2 shadow-lg text-white"
              >
                <MdAir size={20} />
                Add Genre
              </button>
            </div>
          </div>
          <div className="my-20 flex flex-wrap gap-10">
            {genres.map((genre, i) => {
              return (
                <div
                  key={i}
                  className="bg-white flex flex-col shadow-lg w-[200px] px-5 rounded-lg"
                >
                  <p className="text-center w-full pt-5 text-tertiary text-2xl">{genre.name}</p>

                  <div className="flex gap-5 justify-around items-center text-tertiary my-5">
                    <div
                      className="py-2 w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                      onClick={() => openEdit(book)}
                    >
                      <MdEdit size={20} />
                    </div>
                    <div
                      onClick={() => openDelete(book)}
                      className="py-2  w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                    >
                      <MdDelete size={20} />
                    </div>
                  </div>


                </div>
              );
            })}
          </div>

        </div>
      }


      {
        loading && <div className="h-44 w-full flex flex-col justify-center items-center ">
          <Loader color="brown.6" />
        </div>
      }
    </>
  );
};



export default Genres;

