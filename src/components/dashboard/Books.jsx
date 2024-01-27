import React, { useState, useEffect } from "react";
import { MdAutoStories, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Loader, Modal, TextInput, Select, Textarea } from "@mantine/core";
import Image from "next/image";
import Arts from "@/public/Arts.png";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [opened, setOpened] = useState(false);
  const [flag, setFlag] = useState(-1);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);

  const close = () => {
    setOpened(false);
    setFlag(-1);
    setSelectedBook({});
  };

  const openEdit = (book) => {
    setOpened(true);
    setFlag(0);
    setSelectedBook(book);
  };

  const openAdd = () => {
    setOpened(true);
    setFlag(2);
    setSelectedBook({});
  };

  const openDelete = (book) => {
    setOpened(true);
    setFlag(1);
    setSelectedBook(book);
  };

  function getBooks() {
    setLoading(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    axios({
      method: "GET",
      url: `${baseUrl}/books`,
    })
      .then((res) => {
        setBooks(res.data.payload);
        getGenres();
      })
      .catch((err) => {
        toast.error("Could not fetch the books from the server");
        setLoading(false);
      });
  }

  function getGenres() {
    setLoading(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    axios({
      method: "GET",
      url: `${baseUrl}/genres`,
    })
      .then((res) => {
        setGenres(res.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Could not fetch the genres from the server");
        setLoading(false);
      });
  }

  useEffect(() => {
    getBooks();
  }, []);

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

  function onSearch() {
    setLoading(true);

    let searchQuery = splitWords(searchText);

    axios({
      method: "GET",
      url: `${baseUrl}/books/?search=${searchQuery}`,
    })
      .then((res) => {
        setLoading(false);
        setBooks(res.data.payload);
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
        setLoading(false);
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onTextChange = (event) => {
    setSearchText(event.target.value);
  };

  function uploadBook() {}

  const AddModal = () => {
    return (
      <div className="flex flex-col">
        <p className="text-2xl text-tertiary text-center pb-5">Add New Book?</p>
        <TextInput
          title="Book Title"
          placeholder="Enter Book Title"
          color="brown.6"
        />
        <div className="h-5" />
        <Select
          placeholder="Select Genre"
          data={genres.map((genre, i) => {
            return genre.name;
          })}
          // value={credentials.category}
          // onChange={(e) => {
          //   if (e !== null) {
          //     setCredentials({ ...credentials, category: e });
          //   }
          // }}
        />
        <div className="h-5" />
        <TextInput
          title="Book Author"
          placeholder="Enter Book Author"
          color="brown.6"
        />
        <div className="h-5" />

        <Textarea
          title="Book Decription"
          placeholder="Enter Book Description"
          color="brown.6"
        />
        <div className="h-10" />

        <button
          onClick={uploadBook}
          className="w-full rounded-lg bg-primary text-white font-medium py-2"
        >
          Upload
        </button>
      </div>
    );
  };

  const DeleteModal = ({ book, onCancel }) => {
    return (
      <div className="flex flex-col">
        <p className="text-2xl text-tertiary text-center mt-5">
          Are you sure you want to delete this book?
        </p>
        <div className="flex items-center justify-around w-full mt-5">
          <Image src={book.image} alt="" className="" />
          <div className="flex flex-col w-[50%]">
            <p>{book.name}</p>
            <p>By {book.author}</p>
          </div>
        </div>
        <div className="flex justify-around py-5">
          <button
            className="w-[40%] border-[1.5px] border-black py-2 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-[40%] bg-red-700 py-2 rounded-lg text-white font-medium"
            onClick={onCancel}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const EditModal = ({ book, onEdit }) => {
    return (
      <div className="flex flex-col">
        <p className="text-2xl text-tertiary text-center pb-5">Edit Book</p>
        <TextInput
          title="Book Title"
          placeholder="Enter Book Title"
          color="brown.6"
          value={book.name}
        />
        <div className="h-5" />
        <Select
          placeholder="Select Genre"
          data={[
            "Handmade Goods",
            "Jewelry",
            "Home Decor",
            "Clothing",
            "Arts",
            "Vintage Items",
            "Photography",
            "Cosmetics",
            "Toys",
          ]}
          value={book.genre}
          // value={credentials.category}
          // onChange={(e) => {
          //   if (e !== null) {
          //     setCredentials({ ...credentials, category: e });
          //   }
          // }}
        />
        <div className="h-5" />
        <TextInput
          title="Book Author"
          placeholder="Enter Book Author"
          color="brown.6"
          value={book.author}
        />
        <div className="h-5" />

        <Textarea
          title="Book Decription"
          placeholder="Enter Book Description"
          color="brown.6"
          value={book.description}
        />
        <div className="h-10" />

        <button
          onClick={onEdit}
          className="w-full rounded-lg bg-primary text-white font-medium py-2"
        >
          Upload
        </button>
      </div>
    );
  };

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
      {!loading && (
        <div className="w-full flex flex-col h-auto px-10">
          <div className="flex flex-row justify-between items-center">
            <div>
              <p className="text-2xl text-slate-950 mt-5 font-medium">Books</p>
              <p className="text-sm text-tertiary2">
                Add new books, edit books or remove books
              </p>
            </div>

            <div className="flex items-center gap-10">
              <input
                type="search"
                placeholder="Search Book Title or Book Author"
                value={searchText}
                onKeyDown={handleKeyDown}
                onChange={onTextChange}
                className="focus:outline-none py-2 px-3 border border-tertiary1 rounded-lg w-[300px] text-tertiary bg-offWhite"
              />
              <button
                onClick={openAdd}
                className="py-2 px-4 bg-primary rounded-lg flex items-center gap-2 shadow-lg text-white"
              >
                <MdAutoStories size={20} />
                Add Book
              </button>
            </div>
          </div>

          <Modal opened={opened} onClose={close} color="brown.6">
            <AddModal />
            {/* {flag === 0 ? (
                  <EditModal book={selectedBook} onEdit={close} />
                ) : flag === 1 ? (
                  <DeleteModal book={selectedBook} onCancel={close} />
                ) : (
                  <AddModal onUpload={close} genres={genres} />
                )} */}
          </Modal>

          {!loading && books.length > 0 && (
            <div className="my-20 flex flex-wrap gap-10">
              {books.map((book, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex flex-col shadow-lg rounded-lg w-[250px] h-[250px]"
                  >
                    {/* <Image
                src={book.image}
                alt=""
                className="w-full h-[120px] object-contain pt-5"
              /> */}

                    <div className="w-full h-[120px] pt-5" />
                    <div className="px-2 flex flex-col">
                      <p className="font-medium text-xl text-center text-slate-950">
                        {book.title}
                      </p>
                      <p className="text-md text-center text-slate-950">
                        By: {book.author}
                      </p>
                      <div className="flex gap-5 justify-around items-center text-tertiary my-5">
                        <div
                          className="py-2 w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                          onClick={() => openEdit(book)}
                        >
                          Edit
                          <MdEdit size={20} />
                        </div>
                        <div
                          onClick={() => openDelete(book)}
                          className="py-2  w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                        >
                          Delete
                          <MdDelete size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="h-full w-full flex-col text-3xl font-medium text-tertiary flex justify-center items-center">
          There are no books yet in the database.
        </div>
      )}

      {loading && (
        <div className="h-full w-full flex flex-col justify-center items-center ">
          <Loader color="brown.6" />
        </div>
      )}
    </>
  );
};

export default Books;
