import React from "react";
import Buiseness from "../components/Buiseness";
import General from "../components/General";
import Sports from "../components/Sports";
import World from "../components/World";

import Bar from "../components/styles/Bar";

const Home = () => {
  return (
    <div className="xl:mx-96 lg:mx-4 mt-24 md:mx-4 sm:mx-4 mb-8">
      <General />
      <Bar bgColor={"#a74b22"} text={"World"} />
      <World />
      <Bar bgColor={"#4c5b64"} text={"Buiseness"} />
      <Buiseness />
      <Bar bgColor={"#5fa052"} text={"Sports"} />
      <Sports />
    </div>
  );
};

export default Home;
