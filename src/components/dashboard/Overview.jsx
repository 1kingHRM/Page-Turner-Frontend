import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import Chart from "chart.js/auto";

import { motion } from "framer-motion";

const Overview = () => {
  const overviews = [
    {
      name: "Total Books",
      value: 34,
      previous: 15,
      total: 65,
    },
    {
      name: "New Books",
      value: 56,
      previous: 72,
      total: 150,
    },
    {
      name: "New Members",
      value: 34,
      previous: 15,
      total: 65,
    },
    {
      name: "Total Members",
      value: 56,
      previous: 72,
      total: 150,
    },
  ];

  function isGreater(overview) {
    return overview.value > overview.previous;
  }

  function difference(overview) {
    return Math.abs(overview.value - overview.previous);
  }

  function isEqual(overview) {
    return overview.value === overview.previous;
  }

  React.useEffect(() => {
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
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Emails Sent",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [65, 78, 66, 44, 56, 67, 75, 65, 78, 66, 44, 56, 67, 75],
            fill: false,
            lineTension: 0.5,
          },
          {
            label: "Emails Received",
            fill: false,
            backgroundColor: "#edf2f7",
            borderColor: "#edf2f7",
            data: [40, 68, 86, 74, 56, 60, 87, 40, 68, 86, 74, 56, 60, 87],
            lineTension: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
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
    <div className="w-full flex flex-col h-auto px-10 bg-secondary">
      <p className="text-2xl text-slate-950 mt-5 font-medium">Overview</p>
      <p className="text-sm text-tertiary2">Admin Dashboard</p>
      <div className="flex flex-row gap-5 mt-20">
        {overviews.map((overview, i) => {
          return (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
              }}
              className="bg-white shadow-lg cursor-default rounded-md h-[100px] w-[25%] justify-between items-start flex flex-row px-5 py-4"
            >
              <div className="h-[70px] w-[70px] bg-slate-600 shadow-lg"></div>
              <p className="mt-2 text-6xl text-tertiary font-bold">
                {overview.value}
              </p>
              <div className="flex flex-col justify-start items-end">
                <p className="text-md text-tertiary font-medium">
                  {overview.name}
                </p>
                <div
                  className={`px-2 py-1 rounded-2xl font-medium text-md cursor-default flex gap-2 items-center ${
                    isGreater(overview)
                      ? "bg-green1 text-green2"
                      : isEqual(overview)
                      ? "bg-offWhite text-white"
                      : "bg-red1 text-red2"
                  }`}
                >
                  {difference(overview)}%
                  {isGreater(overview) && <IoMdArrowDropup size={20} />}
                  {!isGreater(overview) && !isEqual(overview) && (
                    <IoMdArrowDropdown size={20} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="w-full rounded-lg h-[400px] bg-white shadow-lg my-20 px-10 py-5">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  );
};

export default Overview;
