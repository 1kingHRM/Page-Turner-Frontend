"use client";

import React, { useState } from "react";

import Image from "next/image";
import Logo from "@/public/Logo.png";

import { motion } from "framer-motion";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import axios from "axios";

import baseUrl from "@/src/constants/api";

import { Loader } from "@mantine/core";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    let email = document.getElementById("emailID").value;
    let password = document.getElementById("passwordID").value;

    if (email.length === 0) {
      toast.error("Please enter your email");
      return;
    }

    if (password.length === 0) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);
    axios({
      method: "POST",
      url: `${baseUrl}/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        toast.success("Welcome back");
        setLoading(false);
        let parsedResponse = JSON.stringify(res.data.payload);
        window.localStorage.setItem("page-turner", parsedResponse);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
        setLoading(false);
      });
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
      <div className="bg-pale w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <div className="bg-white py-10 lg:w-[35vw] w-[90vw] rounded-lg shadow-lg flex flex-col items-center">
          <Image src={Logo} alt="" className="w-[75px] h-auto" />
          <p className="py-5 text-2xl text-tertiary">
            Welcome back to Page Turner
          </p>

          {!loading && (
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-start lg:justify-center lg:items-center mt-10 w-full px-[5%]">
                <div className="flex flex-col w-full lg:w-fit">
                  <p className="text-tertiary text-base font-medium leading-loose mb-1">
                    Email Address
                  </p>
                  <input
                    type="email"
                    className="lg:w-[350px] w-full font-normal text-tertiary placeholder:text-gray-500 border border-faintBlack px-2 py-2.5 focus:outline-none rounded-sm mb-3"
                    placeholder="example@example.com"
                    id="emailID"
                  />
                </div>
                <div className="flex flex-col w-full lg:w-fit">
                  <p className="text-slate-950 text-base font-medium leading-loose mb-1">
                    Password
                  </p>
                  <div className="relative lg:w-[350px] w-full flex justify-center items-center">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      className="lg:w-[350px] w-full font-normal text-tertiary placeholder:text-gray-500 border border-faintBlack px-2 py-2.5 focus:outline-none rounded-sm"
                      placeholder=""
                      id="passwordID"
                    />
                    <div
                      className="absolute right-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoMdEyeOff fill="#470912" size={"20px"} />
                      ) : (
                        <IoMdEye fill="#470912" size={"20px"} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                className="py-2 rounded-lg bg-primary text-white mt-10 shadow-lg font-medium text-xl lg:w-[200px] w-[90%]"
                onClick={signIn}
              >
                Sign In
              </motion.button>
            </div>
          )}

          {loading && (
            <div className="h-44 w-full flex flex-col justify-center items-center ">
              <Loader color="brown.6" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
