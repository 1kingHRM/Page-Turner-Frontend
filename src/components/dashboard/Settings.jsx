"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, Modal } from "@mantine/core";

import axios from "axios";
import baseUrl from "@/src/constants/api";

const Settings = () => {
  const [opened, setOpen] = useState(false);
  const [flag, setFlag] = useState(-1);
  const [processing, setProcessing] = useState(false);

  const close = () => {
    setOpen(false);
    setProcessing(false);
    setFlag(-1);
  };

  function clearDatabase() {
    setProcessing(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);
    axios({
      method: "DELETE",
      url: `${baseUrl}/${
        flag === 0
          ? "books"
          : flag === 1
          ? "genres"
          : flag === 2
          ? "downloads"
          : ""
      }/delete`,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        toast.success(`Cleared the database successfully`);
        close();
      })
      .catch((err) => {
        toast.error(`Could not clear the database`);
        setProcessing(false);
      });
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
      <div className="w-full flex flex-col pt-10 px-[10%]">
        <h2 className="text-3xl text-tertiary font-[600] ">Books</h2>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-2xl text-tertiary font-medium">
              Clear the database
            </p>
            <p className="text-lg text-tertiary">
              You are about to remove all the books from the database. This
              process is not reversible
            </p>
          </div>
          <button
            onClick={() => {
              setFlag(0);
              setOpen(true);
            }}
            className="bg-red-700 px-3 py-2 text-white rounded-lg font-medium text-xl"
          >
            Clear
          </button>
        </div>

        <h2 className="text-3xl text-tertiary font-[600] mt-20">Genres</h2>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-2xl text-tertiary font-medium">
              Clear the database
            </p>
            <p className="text-lg text-tertiary">
              You are about to remove all the genres from the database. This
              process is not reversible
            </p>
          </div>
          <button
            onClick={() => {
              setFlag(1);
              setOpen(true);
            }}
            className="bg-red-700 px-3 py-2 text-white rounded-lg font-medium text-xl"
          >
            Clear
          </button>
        </div>

        <h2 className="text-3xl text-tertiary font-[600] mt-20">Downloads</h2>
        <div className="mt-2 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-2xl text-tertiary font-medium">
              Clear the database
            </p>
            <p className="text-lg text-tertiary">
              You are about to remove all the downloads from the database. This
              process is not reversible
            </p>
          </div>
          <button
            onClick={() => {
              setFlag(2);
              setOpen(true);
            }}
            className="bg-red-700 px-3 py-2 text-white rounded-lg font-medium text-xl"
          >
            Clear
          </button>
        </div>
      </div>

      <Modal opened={opened} onClose={close} color="brown.6">
        {!processing && (
          <div className="flex flex-col">
            <p className="text-2xl text-tertiary text-center mt-5">
              Are you sure you want to remove all
              {flag === 0 ? " books" : flag === 1 ? " genres" : " downloads"}?
            </p>
            <div className="flex justify-around pb-5 pt-10">
              <button
                className="w-[40%] border-[1.5px] text-tertiary border-tertiary py-2 rounded-lg"
                onClick={close}
              >
                Cancel
              </button>
              <button
                className="w-[40%] bg-red-700 py-2 rounded-lg text-white font-medium"
                onClick={clearDatabase}
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {processing && (
          <div className="flex flex-col w-full h-40 items-center justify-center">
            <Loader color="brown.6" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default Settings;
