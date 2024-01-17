import React from "react";

const Banner = () => {
  return (
    <div className="bg-pale h-[70vh] flex px-[10%]">
      <div className="flex flex-col w-[40%] mt-20">
        <p className="text-primary text-4xl leading-10 font-medium">
          Discover the joy of reading with{" "}
          <span className="text-tertiary text-6xl font-[700]">Page Turner</span>
        </p>

        <p className="text-xl mt-10 text-primary">
          Our online library management system makes it easy to find and read
          your favourite books. With a wide selection of titles and a
          user-friendly interface, you'll be sure to find something that sparks
          your imagination. So turn the page on your old reading habits and join
          the Page Turner community today!
        </p>
      </div>
    </div>
  );
};

export default Banner;
