import React from "react";

const Topic = ({ textColor, text }) => {
  return (
    <div
      className=" font-serif text-3xl font-bold mb-4"
      style={{ color: textColor }}
    >
      {text}
    </div>
  );
};

export default Topic;
