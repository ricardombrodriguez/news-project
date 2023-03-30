import React from "react";
import image10 from ".././data/image6.png";
import image05 from ".././data/image5.png";

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
const Buiseness = () => {
  return (
    <div className="flex flex-row justify-between gap-12 ">
      <div className="flex flex-col w-2/5 justify-between">
        <div className="">
          <Header>Record gap in UK and US indices</Header>
          <NewsText>
            The index tracking the UK’s large and medium-sized companies is now
            trading at a record discount of 40 per cent to the US markets,
            putting more pressure on London’s standing as several firms mull a
            switch to Wall Street. Citigroup analysts warned yesterday of the
            valuation gap between the MSCI UK.
          </NewsText>
        </div>
        <hr class="h-px  bg-gray-600 border-0 dark:bg-gray-200"></hr>
        <div>
          <Header>House prices hold steady to defy forecasts</Header>
          <NewsText>
            House prices across the UK are holding up better than most experts
            had thought, with the latest data suggesting that, after wobbling at
            the end of last year, they have stabilised so far in 2023. The
            average UK house price was £285,476 in February, according to
            Halifax’s most recent house price index — 2.1 per cent higher than
            this time last...
          </NewsText>
        </div>
      </div>

      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-400"></div>
      <div className="w-1/5">
        <div className="mb-3">
          <img src={image10} alt="Logo" />
        </div>
        <Header>
          Debt Default Would Cripple U.S. Economy, New Analysis Warns
        </Header>
        <NewsText>
          As President Biden prepares to release his latest budget proposal, a
          top economist will warn lawmakers that Republicans’ refusal to raise
          the nation’s borrowing cap could put millions out of work.
        </NewsText>
      </div>

      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-400"></div>

      <div className="flex flex-col w-2/5 justify-between">
        <div className="flex flex-col items-end">
          <Header>
            U.S. Is Said to Consider Reinstating Detention of Migrant Families
          </Header>
          <div></div>
          <img className="h-96 w-96" src={image05} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Buiseness;
