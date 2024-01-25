"use client";

import React, { useEffect, useState } from 'react'

import axios from "axios"
import baseUrl from '@/src/constants/api';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loader } from '@mantine/core';
import NavBar from '../reusable/NavBar';

const Book = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});

    useEffect(() => {
        if (book.title === undefined || book.title === null) {
            axios({
                method: "GET",
                url: `${baseUrl}/books/${id}`
            }).then((res) => {
                setBook(res.data.payload);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                toast.error("Could not get the book from the server");
            })
        }


    }, [book, loading])


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
            <div className='bg-pale w-[100vw] h-auto flex flex-col lg:px-[10%] px-[5%] pt-5 pb-10'>
                <NavBar hideLogin={true} />
                <div className='flex flex-col'>

                </div>
            </div>

        </>
    )
}

export default Book