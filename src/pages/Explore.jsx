import React from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Post from "../components/Post";
import ExploreHead from "../components/ExploreHead";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

const Explore = () => {
  const data = [
    {
      image: "url(/img/1.jpeg)",
      desc: "Now this is worth waiting for 2023 corvette",
    },
    {
      image: "url(/img/4.jpeg)",
      desc: "Oh ya baby got back be sure and Tickl her page",
    },

    {
      image: "url(/img/elisabeth.jpeg)",
      desc: "Queen her legacy will live on forever.",
    },

    {
      image: "url(/img/paradise1.jpeg)",
      desc: "I was looking at sites and came across this one and just had to tickl it. There is a lot of beautiful woman in Ottawa",
    },
    {
      image: "url(/img/2.jpeg)",
      desc: "What do you think do men prefer curvy women. Well I think .....",
    },
    {
      image: "url(/img/3.jpeg)",
      desc: "What do you think do men like cuddling more than women. Because of where it may lead.",
    },
  ];

  return (
    <>
      <Header title={"Explore"} />
      <div className="explore md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-explore">
          <MobilHeader />
          <ExploreHead />
          <div className="posts">
            {data.map((item, id) => (
              <Post image={item.image} desc={item.desc} key={id} />
            ))}
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Explore;
