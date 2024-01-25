"use client";

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import baseUrl from '@/src/constants/api';
import NavBar from '../reusable/NavBar';
import { Loader } from '@mantine/core';
import Footer from '../reusable/Footer';
import Link from 'next/link';

const SearchResults = ({ search }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (books.length === 0) {

      let genre = search.startsWith("Genre");
      let query = search.substring(genre ? 8 : 9);

      axios({
        method: "GET",
        url: `${baseUrl}/books${genre ? `/genre/${query}` : `?search=${query}`}`
      }).then((res) => {
        setLoading(false);
        setBooks(res.data.payload);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }





  }, [loading, books])


  function formatQuery(query) {
    let splits = query.split("%20");
    let result = "";
    for (let i = 1; i < splits.length; ++i) {
      result += splits[i];
      if (i !== splits.length - 1) {
        result += " ";
      }
    }
    return result;
  }


  return (
    <div className='bg-pale w-[100vw] h-auto flex flex-col lg:px-[10%] px-[5%] pt-5 pb-10'>
      <NavBar hideLogin={true} />
      <h2 className='text-tertiary text-2xl lg:text-3xl lg:mt-10 text-center font-[400]'>Showing search results for <span className='font-[600]'>{formatQuery(search)}</span></h2>
      {
        !loading && <div className='flex lg:flex-row flex-col lg:flex-wrap gap-5 mt-20 lg:px-0 px-[10%] pb-20'>
          {
            books.map((book, i) => {
              return <Link
                key={i}
                href={`/book/${book._id}`}
                className="flex flex-col shadow-lg rounded-lg lg:w-[200px] lg:h-[220px] h-[250px] w-full relative top-0 left-0"
              >
                <div className='rounded-lg lg:w-[200px] lg:h-[220px] w-full h-[250px] absolute bg-white -z-10'>

                </div>

                {/* <Image
          src={book.image}
          alt=""
          className="w-full h-[120px] object-contain pt-5"
        /> */}

                <div className='rounded-lg lg:w-[200px] lg:h-[220px] w-full h-[250px] bg-gradient-to-b from-transparent to-[#00000040] px-2 pb-3 flex flex-col justify-end'>
                  <p className="font-medium text-xl text-center text-white">
                    {book.title}
                  </p>
                  <p className="text-sm font-[400] text-center text-secondary">
                    By: {book.author}
                  </p>

                </div>
              </Link>
            })
          }
        </div>
      }

      {
        loading && <div className='w-full h-56 flex justify-center items-center'>
          <Loader color='brown.6' />
        </div>
      }

      <Footer />
    </div>
  )
}

export default SearchResults