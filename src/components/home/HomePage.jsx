import React from "react";

import NavBar from "../reusable/NavBar";
import Banner from "./Banner";
import Benefits from "./Benefits";
import Footer from "../reusable/Footer";
import About from "./About";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Benefits />
      <About />
      <Footer />
    </>
  );
};

export default HomePage;
