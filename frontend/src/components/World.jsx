import React from "react";
import image from ".././data/imagefire.png";
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
const World = () => {
  return (
    <div className="flex flex-row justify-between gap-12 ">
      <div className="flex flex-col w-3/5 justify-between">
        <div className="">
          <Header>Arab states bring Syria’s dictator in from the cold</Header>
          <NewsText>
            Arab states wanting to bring Syria’s Assad regime in from the cold
            are heading for a confrontation with western allies who remain
            opposed to lifting sanctions and normalising relations. Last week
            Egypt’s foreign minister became the latest senior figure from a
            western-aligned Arab country to meet...
          </NewsText>
        </div>
        <hr class="h-px  bg-gray-600 border-0 dark:bg-gray-200"></hr>
        <div>
          <Header>
            U.S. Is Said to Consider Reinstating Detention of Migrant Families
          </Header>
          <NewsText>
            President Biden has turned to increasingly restrictive measures as
            his administration prepares for the end of Title 42, which has
            allowed border authorities to swiftly expel migrants, which has
            allowed border authorities to swiftly expel migrants.{" "}
          </NewsText>
        </div>
      </div>

      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-400"></div>

      <div className="flex flex-col w-1/5 justify-between">
        <div>
          <Header>A Freshman Repub in Oklahoma Makes the Case for Big</Header>
          <NewsText>
            Four Americans have been kidnapped by gunmen in Mexico after
            crossing the border to buy medicines. The four, who were in a camper
            van with North Carolina registration plates, were caught in a
            shoot-out during which at least one Mexican citizen was killed.
          </NewsText>
        </div>
      </div>

      <div class="left-1/2 -ml-0.5 w-0.5 bg-gray-400"></div>

      <div className="w-1/5">
        <Header>Fury over train crash could delay Greek election</Header>

        <img src={image} alt="Logo" />
      </div>
    </div>
  );
};

export default World;
