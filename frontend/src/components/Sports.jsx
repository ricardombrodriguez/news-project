import React from "react";
import image05 from ".././data/image9.png";

import tw from "tailwind-styled-components";
const Header = tw.p`
  font-serif
  text-xl 
  font-extrabold 
  text-gray-900 
  dark:text-gray-400 
  text-justify 
  mb-2
`;

const NewsText = tw.p`
  font-serif 
  text-black 
  dark:text-gray-400 
  text-justify 
  text-m
`;
const Sports = () => {
  return (
    <div className="flex flex-row justify-between gap-12 ">
      <div className="flex flex-col w-2/5 justify-between">
        <div className="flex flex-col items-start">
          <Header>
            United might have avoided Anfield horror show with proper No 9
          </Header>
          <div></div>
          <img className="h-96 w-96" src={image05} alt="Logo" />
        </div>
      </div>
      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-400"></div>

      <div className="flex flex-col w-3/5 justify-between">
        <div className="">
          <Header>
            Uefa offers refund to every Liverpool fan at Champions League final
          </Header>
          <NewsText>
            Every Liverpool supporter who bought a ticket for the Champions
            League final in Paris will be eligible to receive a refund as the
            fallout from the security fiasco continues. In an unprecedented
            move, Uefa has announced that it will reimburse those fans who
            attended the showpiece between Jürgen...
          </NewsText>
        </div>
        <hr class="h-px  bg-gray-600 border-0 dark:bg-gray-200"></hr>
        <div>
          <Header>
            United might have avoided Anfield horror show with proper
          </Header>
          <NewsText>
            Football must be careful not to scapegoat Bruno Fernandes for all
            the ills of the game when he is simply one symptom of a general
            malaise. Manchester United’s captain is a good football player.
          </NewsText>
        </div>
        <hr class="h-px  bg-gray-600 border-0 dark:bg-gray-200"></hr>
        <div>
          <Header>
            Ireland are brilliant – but have they peaked too soon for World Cup?
          </Header>
          <NewsText>
            Irish rugby is still revelling in an ascendancy on the international
            stage and the European scene. They deserve to do so. In the
            immediate aftermath of the stunning win over France in Dublin on
            February 11, it was as if a thunderstorm was breaking in your head.
            It was just the good old Irish fans asking you to...
          </NewsText>
        </div>
      </div>
    </div>
  );
};

export default Sports;
