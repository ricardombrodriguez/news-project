import React from "react";

const Bar = ({ bgColor, text }) => {
  return (
    <div className=" h-7 my-6 rounded-sm" style={{ backgroundColor: bgColor }}>
      <div className=" font-serif text-xl font-bold text-white ml-4">
        {text}
      </div>
    </div>
  );
};

export default Bar;
