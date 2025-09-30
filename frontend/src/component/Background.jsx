import React from "react";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

const images = [back1, back2, back3, back4];

function Background({ heroCount }) {
  return (
    <div className="w-full    " >
      <img
        src={images[heroCount]}
        alt="Background"
        className="w-[100%] h-[100%]    object-cover object-center"
    />
    </div>
  );
}

export default Background;
