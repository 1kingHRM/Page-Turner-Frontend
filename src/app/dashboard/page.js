"use client";

import Dashboard from "@/src/components/dashboard/Dashboard";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  // let userData = window.localStorage.getItem("page-turner");
  // if(userData === undefined || userData === null || userData.length === 0) {
  //   window.location.replace("/");
  //   return <></>
  // }
  

  return <Dashboard />;
}
