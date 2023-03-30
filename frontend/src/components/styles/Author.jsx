import React from "react";
import image05 from "../.././data/man2.jpeg";

const Author = () => {
  return (
    <div className="mb-4">
      <div className="flex flex-row">
        <div>
          <img className="w-16 h-17 rounded-full" src={image05} alt="Logo" />
        </div>
        <div
          className=" font-serif 
                text-black 
                dark:text-gray-400 
                pt-3
                ml-2
                text-xl
                "
        >
          João Felix
        </div>
      </div>
    </div>
  );
};

export default Author;
