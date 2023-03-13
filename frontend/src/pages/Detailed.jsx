import React from "react";

import image05 from ".././data/image10.png";
import Topic from "../components/styles/Topic";
import tw from "tailwind-styled-components";
import Author from "../components/styles/Author";
const Header = tw.p`
  font-serif
  text-5xl 
  font-extrabold 
  text-gray-900 
  dark:text-gray-400 
  text-justify 
  mb-5
`;

const NewsText = tw.p`
  font-serif 
  text-black 
  dark:text-gray-400 
  text-justify 
  text-xl
`;

const Detailed = () => {
  return (
    <div className="xl:mx-96 lg:mx-4 mt-24 md:mx-4 sm:mx-4 mb-8">
      <Topic textColor={"#5fa052"} text={"Sports"} />

      <div className="mb-4">
        <Header>
          A Freshman Republican in Oklahoma Makes the Case for Big Spending Cuts
        </Header>
      </div>
      <div>
        <Author />
      </div>
      <div className="mb-10">
        <NewsText>
          Representative Josh Brecheen’s calls for a debt showdown reflects how
          the party has linked its spending fight with cultural battles.
          Representative Josh Brecheen’s calls for a debt showdown reflects how
          the party has linked its spending fight with cultural battles.
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </NewsText>
      </div>

      <div className="mb-9 flex justify-center w-full">
        <img className="w-full" src={image05} alt="Logo" />
      </div>
      <div className="mb-4">
        <NewsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          aliquet, diam in dictum laoreet, metus risus porttitor elit, eu mollis
          metus arcu non lacus. Sed aliquet rhoncus varius. Ut sodales ligula
          vitae nisl cursus, vel lacinia est aliquam. Quisque dapibus vestibulum
          orci, vitae dictum odio porta sed. Aliquam gravida, tellus at lacinia
          accumsan, orci ex luctus nibh, eu vestibulum nisi mi eu ipsum. Duis
          tincidunt lectus nisi. Duis ut diam vitae nisi aliquet porttitor.
          Mauris finibus leo vel tincidunt sagittis. Vivamus hendrerit blandit
          ex, a sagittis ligula egestas vitae. Sed faucibus tortor eget
          malesuada molestie. Nullam posuere gravida maximus. Donec volutpat non
          augue ut hendrerit. Nam non mollis purus. Morbi libero lacus, pharetra
          at porta ut, gravida nec sapien. In nec quam et justo convallis
          sodales ac non risus. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Sed eu lacus auctor,
          dignissim ante id, tristique ligula. Donec at faucibus metus.
          Curabitur vestibulum felis at neque placerat, et varius metus rutrum.
          Fusce in risus ultrices, ultrices neque nec, accumsan ante. Vestibulum
          sollicitudin urna non nunc lobortis, sit amet vestibulum nunc
          vulputate. Aliquam nec nisi pellentesque, luctus metus dapibus,
          tincidunt ipsum. Etiam egestas eu nunc sit amet dapibus. Donec gravida
          risus ante, ut porttitor lectus porta at. Morbi tristique dui mauris,
          in pellentesque orci volutpat id. Aliquam erat volutpat. Aenean lacus
          magna, fringilla ac risus sed, consectetur posuere ipsum. Quisque
          varius pulvinar fringilla. Integer velit dui, maximus vitae erat ac,
          vehicula laoreet quam. Donec in orci ut justo mollis mattis. Nulla
          vestibulum molestie posuere. Nullam velit odio, congue sed nisl et,
          sagittis commodo orci. Nulla non viverra orci, et posuere tortor. Nunc
          eleifend aliquam quam sit amet feugiat. Nunc nec malesuada libero.
          Vestibulum tincidunt scelerisque neque, eget luctus erat volutpat id.
          Maecenas velit est, aliquam suscipit tincidunt eget, vehicula sed mi.
          Cras semper facilisis lacus in semper. Suspendisse dictum nec nisl non
          scelerisque. Etiam mattis eros eu sollicitudin varius. Vestibulum
          pretium massa vel mauris bibendum varius. Aliquam ut diam id tortor
          scelerisque ullamcorper at vel quam. Vestibulum sed dui metus.
          Suspendisse vulputate, neque sit amet cursus placerat, mauris tellus
          porttitor ligula, a elementum tellus augue sed nunc. Donec eu lacinia
          orci. Aenean id magna elementum, congue nulla et, eleifend metus.
          Vestibulum ligula tellus, efficitur ut nisl eu, venenatis gravida
          quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut
          ut magna dolor. Maecenas iaculis, orci semper placerat viverra, diam
          tellus sollicitudin mi, lacinia cursus felis erat vitae dui. Mauris
          nibh ipsum, malesuada ac mi et, ornare tempor magna. Duis commodo
          tortor fringilla quam ornare, ut fermentum turpis laoreet. Fusce
          tempus massa ligula, quis tempor nisl pulvinar nec. Duis ex neque,
          interdum eu nisi nec, elementum faucibus justo. Cras gravida, leo quis
          tempor venenatis, elit neque vulputate elit, sit amet efficitur nulla
          ipsum sed felis. Curabitur faucibus consequat elit a maximus. Nam leo
          velit, posuere id libero sed, hendrerit congue massa. Donec pretium
          ante porta, mollis turpis et, sollicitudin dolor. Maecenas nec nulla
          sodales, eleifend augue eget, cursus nisi. Suspendisse at elit at quam
          sagittis pretium.
        </NewsText>
      </div>

      <div className="font-bold tex-gray-900 mb-4 text-l">13/03/2024</div>
    </div>
  );
};

export default Detailed;
