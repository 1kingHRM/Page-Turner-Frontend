import React, { useState, useEffect } from "react";
import { MdAir, MdEdit, MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { Loader, Modal, TextInput, Select, Textarea } from "@mantine/core";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Genres = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [genres, setGenres] = useState([]);
  const [searchedGenres, setSearchedGenres] = useState([]);

  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(-1);

  const [genreName, setGenreName] = useState("");
  const [searchText, setSearchText] = useState("");

  const [reloadFlag, setReloadFlag] = useState(false);

  const [currentGenre, setCurrentGenre] = useState({});

  useEffect(() => {
    if (genres.length === 0 || reloadFlag) {
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
          setReloadFlag(false);
        })
        .catch((err) => {
          toast.error("Could not fetch the genres from the server");
          setLoading(false);
          setReloadFlag(false);
        });
    }
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

  const uploadGenre = (edit) => {
    setUploading(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    let dto = {
      name: genreName,
    };

    if (edit) {
      dto._id = currentGenre._id;
    }

    axios({
      method: edit ? "PUT" : "POST",
      url: `${baseUrl}/genres/${edit ? "edit" : "add"}`,
      data: dto,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        toast.success(`${edit ? "Edited" : "Created"} the genre successfully`);
        cancel();
      })
      .catch((err) => {
        toast.error(`Could not ${edit ? "edit" : "add"} the genre`);
        setUploading(false);
      });
  };

  const deleteGenre = () => {
    setUploading(true);
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    axios({
      method: "DELETE",
      url: `${baseUrl}/genres/delete/${currentGenre._id}`,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        toast.success(`Deleted the genre successfully`);
        cancel();
      })
      .catch((err) => {
        toast.error(`Could not delete the genre`);
        setUploading(false);
      });
  };

  function onSearch(text) {
    if (text.length === 0) {
      setSearchedGenres([]);
      return;
    }

    // if not exist, display empy and searvh Google

    const lowerText = text.toLowerCase();
    const result = genres.filter((genre) =>
      genre.name.toLowerCase().startsWith(lowerText)
    );

    setSearchedGenres(result);
  }

  function cancel() {
    setGenreName("");
    setUploading(false);
    setReloadFlag(true);
    setOpen(false);
  }

  const openAdd = () => {
    setOpen(true);
    setFlag(0);
  };

  const openEdit = (genre) => {
    setOpen(true);
    setFlag(1);
    setGenreName(genre.name);
    setCurrentGenre(genre);
  };

  const openDelete = (genre) => {
    setOpen(true);
    setFlag(2);
    setCurrentGenre(genre);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onTextChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
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
              <p className="text-2xl text-slate-950 mt-5 font-medium">Genres</p>
              <p className="text-sm text-tertiary">
                Add new genres, edit existing ones or remove genres
              </p>
            </div>

            <div className="flex items-center gap-10">
              <input
                type="search"
                placeholder="Search Genre"
                value={searchText}
                onKeyDown={handleKeyDown}
                onChange={onTextChange}
                className="focus:outline-none py-2 px-3 border border-tertiary1 rounded-lg w-[300px] text-tertiary placeholder:text-gray-500 bg-offWhite"
              />
              <button
                onClick={openAdd}
                className="py-2 px-4 bg-primary rounded-lg flex items-center gap-2 shadow-lg text-white"
              >
                <MdAir size={20} />
                Add Genre
              </button>
            </div>
          </div>

          <Modal
            opened={open}
            onClose={() => {
              setOpen(false);
              setGenreName("");
              setUploading(false);
            }}
            color="brown.6"
          >
            {flag === 0 && (
              <AddModalComponent
                genreName={genreName}
                setGenreName={setGenreName}
                uploadGenre={() => uploadGenre(false)}
                uploading={uploading}
              />
            )}
            {flag === 1 && (
              <EditModalComponent
                genreName={genreName}
                setGenreName={setGenreName}
                uploadGenre={() => uploadGenre(true)}
                uploading={uploading}
              />
            )}
            {flag == 2 && (
              <DeleteModalComponent
                cancel={cancel}
                currentGenre={currentGenre}
                deleteGenre={deleteGenre}
              />
            )}
          </Modal>

          {searchedGenres.length === 0 && (
            <div className="my-20 flex flex-wrap gap-10">
              {genres.map((genre, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex flex-col shadow-lg w-[200px] px-5 rounded-lg"
                  >
                    <p className="text-center w-full pt-5 text-tertiary text-2xl">
                      {genre.name}
                    </p>

                    <div className="flex gap-5 justify-around items-center text-tertiary my-5">
                      <div
                        className="py-2 w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                        onClick={() => openEdit(genre)}
                      >
                        <MdEdit size={20} />
                      </div>
                      <div
                        onClick={() => openDelete(genre)}
                        className="py-2  w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                      >
                        <MdDelete size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {searchedGenres.length > 0 && (
            <div className="my-20 flex flex-wrap gap-10">
              {searchedGenres.map((genre, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white flex flex-col shadow-lg w-[200px] px-5 rounded-lg"
                  >
                    <p className="text-center w-full pt-5 text-tertiary text-2xl">
                      {genre.name}
                    </p>

                    <div className="flex gap-5 justify-around items-center text-tertiary my-5">
                      <div
                        className="py-2 w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                        onClick={() => openEdit(genre)}
                      >
                        <MdEdit size={20} />
                      </div>
                      <div
                        onClick={() => openDelete(genre)}
                        className="py-2  w-full gap-2 items-center text-white justify-center flex rounded-lg bg-primary cursor-pointer"
                      >
                        <MdDelete size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="h-44 w-full flex flex-col justify-center items-center ">
          <Loader color="brown.6" />
        </div>
      )}
    </>
  );
};

const AddModalComponent = ({
  uploading,
  genreName,
  setGenreName,
  uploadGenre,
}) => {
  return (
    <>
      {!uploading && (
        <div className="flex flex-col">
          <p className="text-2xl text-tertiary text-center pb-5">Add Genre</p>

          <TextInput
            title="Genre Name"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            placeholder="Enter Genre Name"
          />

          <button
            onClick={uploadGenre}
            className="w-full mt-5 rounded-lg bg-primary text-white font-medium py-2"
          >
            Upload
          </button>
        </div>
      )}

      {uploading && (
        <div className="flex flex-col w-full h-32 items-center justify-center">
          <Loader color="brown.6" />
        </div>
      )}
    </>
  );
};

const EditModalComponent = ({
  uploading,
  genreName,
  setGenreName,
  uploadGenre,
}) => {
  return (
    <>
      {!uploading && (
        <div className="flex flex-col">
          <p className="text-2xl text-tertiary text-center pb-5">Edit Genre</p>

          <TextInput
            title="Genre Name"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            placeholder="Enter Genre Name"
          />

          <button
            onClick={uploadGenre}
            className="w-full mt-5 rounded-lg bg-primary text-white font-medium py-2"
          >
            Update
          </button>
        </div>
      )}

      {uploading && (
        <div className="flex flex-col w-full h-32 items-center justify-center">
          <Loader color="brown.6" />
        </div>
      )}
    </>
  );
};

const DeleteModalComponent = ({ currentGenre, cancel, deleteGenre }) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl text-tertiary text-center mt-5">
        Are you sure you want to delete the{" "}
        <span className="font-[600]">{currentGenre.name}</span> genre?
      </p>
      <div className="flex justify-around py-5">
        <button
          className="w-[40%] border-[1.5px] text-tertiary border-tertiary py-2 rounded-lg"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className="w-[40%] bg-red-700 py-2 rounded-lg text-white font-medium"
          onClick={deleteGenre}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Genres;
