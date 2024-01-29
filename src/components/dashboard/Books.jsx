import React, { useState, useEffect, useRef } from "react";
import { MdAutoStories, MdEdit, MdDelete, MdMenuBook } from "react-icons/md";
import { Loader, Modal, TextInput, Select, Textarea } from "@mantine/core";

import Image from "next/image";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

const Books = () => {
  const [opened, setOpened] = useState(false);
  const [flag, setFlag] = useState(-1);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [localBookFile, setLocalBookFile] = useState(null);
  const [modalFlag, setModalFlag] = useState(false);
  const inputRef = useRef(null);

  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  const [reloadFlag, setReloadFlag] = useState(false);
  const [bookId, setBookId] = useState("");

  const close = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setSelectedGenre("");
    setLocalBookFile(null);
    setOpened(false);
    setFlag(-1);
    setSelectedBook({});
    setBookId("");
  };

  const openEdit = (book) => {
    setOpened(true);
    setFlag(0);
    setSelectedBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookDescription(book.description);
    setSelectedGenre(book.genre.name);
    setLocalBookFile(book.file);
    setBookId(book.id);
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
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setLocalBookFile(book.file);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
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
  }, [reloadFlag]);

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

  function deleteBook() {
    setModalFlag(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    axios({
      method: "DELETE",
      url: `${baseUrl}/books/delete/${selectedBook._id}`,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        setModalFlag(false);
        toast.success("Deleted the book successfully");
        close();
        setReloadFlag(!reloadFlag);
      })
      .catch((err) => {
        toast.error("Could not delete the books");
        setModalFlag(false);
      });
  }

  function uploadBook(edit) {
    setModalFlag(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    let data = {
      title: bookTitle,
      description: bookDescription,
      author: bookAuthor,
      file: localBookFile,
      genre: selectedGenre,
    };

    if (edit) {
      data.genre = selectedGenre._id;
      data._id = bookId;
    }

    axios({
      method: edit ? "PUT" : "POST",
      url: `${baseUrl}/books/${edit ? "edit" : "create"}`,
      data: data,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        setModalFlag(false);
        toast.success(`${edit ? "Edited" : "Created"} the book successfully`);
        setReloadFlag(!reloadFlag);
        close();
      })
      .catch((err) => {
        toast.error(`Could not ${edit ? "edit" : "create"} the book`);
        setModalFlag(false);
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
                className="focus:outline-none py-2 px-3 border border-tertiary1 rounded-lg w-[300px] text-tertiary placeholder:text-gray-500 bg-offWhite"
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
            {flag === 0 && (
              <EditModal
                modalFlag={modalFlag}
                bookTitle={bookTitle}
                setBookTitle={setBookTitle}
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                bookAuthor={bookAuthor}
                setBookAuthor={setBookAuthor}
                bookDescription={bookDescription}
                setBookDescription={setBookDescription}
                uploadBook={() => uploadBook(true)}
              />
            )}
            {flag === 1 && (
              <DeleteModal
                bookAuthor={bookAuthor}
                bookTitle={bookTitle}
                close={close}
                deleteBook={deleteBook}
                localBookFile={localBookFile}
              />
            )}
            {flag === 2 && (
              <AddModal
                modalFlag={modalFlag}
                bookTitle={bookTitle}
                setBookTitle={setBookTitle}
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                bookAuthor={bookAuthor}
                setBookAuthor={setBookAuthor}
                bookDescription={bookDescription}
                setBookDescription={setBookDescription}
                uploadBook={() => uploadBook(false)}
                inputRef={inputRef}
                localBookFile={localBookFile}
                openFileDialog={openFileDialog}
                setLocalBookFile={setLocalBookFile}
              />
            )}
          </Modal>

          {!loading && books.length > 0 && (
            <div className="my-20 flex flex-wrap gap-10">
              {books.map((book, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex flex-col shadow-lg rounded-lg w-[250px] h-[250px]"
                  >
                    <div className=" w-full h-[200px] overflow-hidden">
                      <Document file={book.file}>
                        <Page
                          pageNumber={1}
                          width={200}
                          height={200}
                          renderTextLayer={false}
                        />
                      </Document>
                    </div>
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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });
}

const UploadFile = ({
  localBookFile,
  inputRef,
  setLocalBookFile,
  openFileDialog,
}) => {
  return localBookFile !== null ? (
    <div className=" w-full h-[200px] overflow-x-hidden">
      <Document file={localBookFile}>
        <Page pageNumber={1} width={400} height={200} renderTextLayer={false} />
      </Document>
    </div>
  ) : (
    <>
      <input
        type="file"
        ref={inputRef}
        multiple={false}
        accept=".pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file !== undefined) {
            getBase64(file)
              .then((res) => {
                setLocalBookFile(res);
              })
              .catch((_) => {
                setLocalBookFile(null);
              });
          }
        }}
      />

      <div
        onClick={openFileDialog}
        className="w-full cursor-pointer h-[200px] bg-pale rounded border border-primary justify-center items-center gap-2.5 inline-flex"
      >
        <div className="flex-col justify-start items-center gap-4 inline-flex">
          <div className="flex-col justify-start items-center gap-2 flex text-center">
            <p className="text-tertiary lg:text-2xl text-xl font-medium leading-9">
              Select a book to upload
            </p>
            <MdMenuBook color="#341008" size={"26px"} />
          </div>
        </div>
      </div>
    </>
  );
};

const AddModal = ({
  modalFlag,
  bookTitle,
  setBookTitle,
  genres,
  selectedGenre,
  setSelectedGenre,
  bookAuthor,
  setBookAuthor,
  bookDescription,
  setBookDescription,
  uploadBook,

  localBookFile,
  setLocalBookFile,
  inputRef,
  openFileDialog,
}) => {
  if (modalFlag) {
    return (
      <div className="flex flex-col w-full h-40 items-center justify-center">
        <Loader color="brown.6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl text-tertiary text-center pb-5">Add New Book?</p>
      <TextInput
        title="Book Title"
        placeholder="Enter Book Title"
        color="brown.6"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <div className="h-5" />
      <Select
        placeholder="Select Genre"
        data={genres.map((genre, i) => {
          return genre.name;
        })}
        value={selectedGenre}
        onChange={(e) => {
          if (e !== null) {
            setSelectedGenre(e);
          }
        }}
        className="text-tertiary placeholder:text-tertiary"
      />
      <div className="h-5" />
      <TextInput
        title="Book Author"
        placeholder="Enter Book Author"
        color="brown.6"
        value={bookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
      />
      <div className="h-5" />

      <Textarea
        title="Book Decription"
        placeholder="Enter Book Description"
        color="brown.6"
        value={bookDescription}
        onChange={(e) => setBookDescription(e.target.value)}
      />
      <div className="h-10" />

      <UploadFile
        inputRef={inputRef}
        localBookFile={localBookFile}
        openFileDialog={openFileDialog}
        setLocalBookFile={setLocalBookFile}
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

const DeleteModal = ({
  localBookFile,
  bookTitle,
  bookAuthor,
  close,
  deleteBook,
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl text-tertiary text-center mt-5">
        Are you sure you want to delete this book?
      </p>
      <div className="flex items-center justify-around w-full mt-5">
        <Document file={localBookFile}>
          <Page
            pageNumber={1}
            width={400}
            height={200}
            renderTextLayer={false}
          />
        </Document>
        <div className="flex flex-col w-[50%]">
          <p>{bookTitle}</p>
          <p>By {bookAuthor}</p>
        </div>
      </div>
      <div className="flex justify-around py-5">
        <button
          className="w-[40%] border-[1.5px] text-tertiary border-tertiary py-2 rounded-lg"
          onClick={close}
        >
          Cancel
        </button>
        <button
          className="w-[40%] bg-red-700 py-2 rounded-lg text-white font-medium"
          onClick={deleteBook}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const EditModal = ({
  modalFlag,
  bookTitle,
  setBookTitle,
  genres,
  selectedGenre,
  setSelectedGenre,
  bookAuthor,
  setBookAuthor,
  bookDescription,
  setBookDescription,
  uploadBook,
}) => {
  if (modalFlag) {
    return (
      <div className="flex flex-col w-full h-40 items-center justify-center">
        <Loader color="brown.6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl text-tertiary text-center pb-5">Edit Book</p>
      <TextInput
        title="Book Title"
        placeholder="Enter Book Title"
        color="brown.6"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <div className="h-5" />
      <Select
        placeholder="Select Genre"
        data={genres.map((genre, i) => {
          return genre.name;
        })}
        value={selectedGenre}
        onChange={(e) => {
          if (e !== null) {
            setSelectedGenre(e);
          }
        }}
      />
      <div className="h-5" />
      <TextInput
        title="Book Author"
        placeholder="Enter Book Author"
        color="brown.6"
        value={bookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
      />
      <div className="h-5" />

      <Textarea
        title="Book Decription"
        placeholder="Enter Book Description"
        color="brown.6"
        value={bookDescription}
        onChange={(e) => setBookDescription(e.target.value)}
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

export default Books;
