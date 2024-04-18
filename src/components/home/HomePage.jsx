import React from "react";
import Banner from "./Banner";
import Benefits from "./Benefits";
import Footer from "../reusable/Footer";
import About from "./About";
const HomePage = () => {
  return (
    <div className="bg-white">
      <Banner />
      <Benefits />
      <About />
      <Footer />
    </div>
  );
};

export default HomePage;
