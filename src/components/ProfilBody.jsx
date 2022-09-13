import React, { useState } from "react";
import Post from "./Post";

const ProfilBody = () => {
  const data = [
    {
      image: "url(/img/2.jpeg)",
      desc: "What do you think do men prefer curvy women. Well I think .....",
    },
    {
      image: "url(/img/4.jpeg)",
      desc: "Oh ya baby got back be sure and Tickl her page",
    },
    {
      image: "url(/img/1.jpeg)",
      desc: "Now this is worth waiting for 2023 corvette",
    },
    {
      image: "url(/img/3.jpeg)",
      desc: "What do you think do men like cuddling more than women. Because of where it may lead.",
    },
    {
      image: "url(/img/elisabeth.jpeg)",
      desc: "Queen her legacy will live on forever.",
    },
    {
      image: "url(/img/paradise1.jpeg)",
      desc: "I was looking at sites and came across this one and just had to tickl it. There is a lot of beautiful woman in Ottawa",
    },
  ];
  const dataLikes = [
    {
      image: "url(/img/4.jpeg)",
      desc: "What do you think do men like cuddling more than women. Because of where it may lead.",
    },
    {
      image: "url(/img/1.jpeg)",
      desc: "Now this is worth waiting for 2023 corvette",
    },
    {
      image: "url(/img/paradise1.jpeg)",
      desc: "I was looking at sites and came across this one and just had to tickl it. There is a lot of beautiful woman in Ottawa",
    },
    {
      image: "url(/img/2.jpeg)",
      desc: "What do you think do men prefer curvy women. Well I think .....",
    },
  ];
  const dataReplies = [
    {
      image: "url(/img/3.jpeg)",
      desc: "What do you think do men like cuddling more than women. Because of where it may lead.",
    },
    {
      image: "url(/img/4.jpeg)",
      desc: "What do you think do men like cuddling more than women. Because of where it may lead.",
    },
    {
      image: "url(/img/1.jpeg)",
      desc: "Now this is worth waiting for 2023 corvette",
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
  ];

  const activeTabPosts = (e, active, tab) => {
    e.target.parentElement.children[0].classList.remove(active);
    e.target.parentElement.children[1].classList.remove(active);
    e.target.parentElement.children[2].classList.remove(active);
    e.target.parentElement.children[3].classList.remove(active);
    e.target.classList.add(active);
    setTab(tab);
  };

  const [tab, setTab] = useState("posts");

  const posts = () => {
    return (
      <div className="profil-posts">
        {data.map((item, id) => (
          <Post image={item.image} desc={item.desc} key={id} />
        ))}
      </div>
    );
  };
  const likes = () => {
    return (
      <div className="profil-posts">
        {dataLikes.map((item, id) => (
          <Post image={item.image} desc={item.desc} key={id} />
        ))}
      </div>
    );
  };
  const replies = () => {
    return (
      <div className="profil-posts">
        {dataReplies.map((item, id) => (
          <Post image={item.image} desc={item.desc} key={id} />
        ))}
      </div>
    );
  };

  return (
    <div className="profil-body">
      <div className="tab">
        <p
          onClick={(e) => activeTabPosts(e, "active", "posts")}
          className="active"
        >
          Posts
        </p>
        <p onClick={(e) => activeTabPosts(e, "active", "replies")}>Replies</p>
        <p onClick={(e) => activeTabPosts(e, "active", "media")}>Media</p>
        <p onClick={(e) => activeTabPosts(e, "active", "likes")}>Likes</p>
      </div>
      {tab === "posts" && posts()}
      {tab === "replies" && replies()}
      {tab === "media" && posts()}
      {tab === "likes" && likes()}
    </div>
  );
};

export default ProfilBody;
