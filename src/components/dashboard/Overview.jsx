import React, { useEffect, useState } from "react";
import { MdAutoStories, MdAir, MdDownload } from "react-icons/md";

import Chart from "chart.js/auto";

import { motion } from "framer-motion";

import axios from "axios";
import baseUrl from "@/src/constants/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "@mantine/core";

const Overview = () => {
  const [books, setBooks] = useState(0);
  const [genres, setGenres] = useState(0);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  function getOverview() {
    let userData = window.localStorage.getItem("page-turner");
    userData = JSON.parse(userData);

    axios({
      method: "GET",
      url: `${baseUrl}/overview`,
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => {
        let payload = res.data.payload;

        setDownloads(payload.downloads);
        setBooks(payload.books);
        setGenres(payload.genres);

        setLoading(false);
      })
      .catch((err) => {
        toast.error("Unable to get the overview data from the server");
        setLoading(false);
      });
  }

  useEffect(() => {
    getOverview();
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Downloads",
            fill: false,
            backgroundColor: "#D4894A",
            borderColor: "#341008",
            data: [40, 68, 86, 74, 56, 60, 87, 40, 68, 86, 74, 56],
            lineTension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: "Downloads Per Month",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    var myChart = new Chart(ctx, config);
    window.myLine = myChart;

    return () => {
      myChart.destroy();
    };
  }, []);

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
      <div className="w-full flex flex-col h-auto px-10 bg-secondary">
        <p className="text-2xl text-slate-950 mt-5 font-medium">Overview</p>
        <p className="text-sm text-tertiary2">Admin Dashboard</p>

        {!loading && (
          <div className="flex flex-row gap-20 mt-10 justify-center items-center">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white shadow-lg cursor-default rounded-md h-[100px] gap-10 justify-between items-start flex flex-row px-5 py-4"
            >
              <div className="h-[70px] w-[70px] bg-slate-600 shadow-lg flex items-center justify-center">
                <MdAutoStories fill="#FFFFFF" size={"36px"} />
              </div>
              <div className="flex flex-col">
                <p className="text-md text-tertiary font-medium">Books</p>
                <p className="text-5xl text-tertiary font-bold">{books}</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white shadow-lg cursor-default rounded-md h-[100px] gap-10 justify-between items-start flex flex-row px-5 py-4"
            >
              <div className="h-[70px] w-[70px] bg-slate-600 shadow-lg flex items-center justify-center">
                <MdAir fill="#FFFFFF" size={"36px"} />
              </div>
              <div className="flex flex-col">
                <p className="text-md text-tertiary font-medium">Genres</p>
                <p className="text-5xl text-tertiary font-bold">{genres}</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white shadow-lg cursor-default rounded-md h-[100px] gap-10 justify-between items-start flex flex-row px-5 py-4"
            >
              <div className="h-[70px] w-[70px] bg-slate-600 shadow-lg flex items-center justify-center">
                <MdDownload fill="#FFFFFF" size={"36px"} />
              </div>
              <div className="flex flex-col">
                <p className="text-md text-tertiary font-medium">Downloads</p>
                <p className="text-5xl text-tertiary font-bold">
                  {downloads.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {loading && (
          <div className="w-full h-40 items-center justify-center flex">
            <Loader color="brown.6" />
          </div>
        )}

        <div className="flex justify-center items-center">
          <div className="w-[60%] rounded-lg h-[400px] bg-pale shadow-lg my-10 px-10 py-5">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
