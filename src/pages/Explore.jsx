import React from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Post from "../components/Post";
import ExploreHead from "../components/ExploreHead";

const Explore = () => {
  const data = [
    {
      image: "url(/img/elisabeth.jpeg)",
      desc: "The love is little, hairy and deep,",
    },
    {
      image: "url(/img/1.jpg)",
      desc: "Whose love is that? I think I know Its owner is quite happy though",
    },

    {
      image: "url(/img/2.jpg)",
      desc: "She eats her jam with lots of bread. Ready for the day ahead.",
    },
    {
      image: "url(/img/3.jpg)",
      desc: "The only other sound's the break,Of distant waves and birds awake.",
    },
    {
      image: "url(/img/4.jpg)",
      desc: "Full of joy like a vivid rainbow,I watch her laugh. I cry hello.",
    },
  ];

  return (
    <>
      <div className="explore">
        <Appbar />
        <div className="actual-explore">
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
