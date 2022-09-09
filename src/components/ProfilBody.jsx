import React, { useState } from "react";
import Post from "./Post";

const ProfilBody = () => {
  const data = [
    {
      image: "url(/img/1.jpg)",
      desc: "Whose love is that? I think I know Its owner is quite happy though",
    },
    {
      image: "url(/img/elisabeth.jpeg)",
      desc: "The love is little, hairy and deep,",
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
  const dataLikes = [
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
  const dataReplies = [
    {
      image: "url(/img/4.jpg)",
      desc: "Full of joy like a vivid rainbow,I watch her laugh. I cry hello.",
    },
    {
      image: "url(/img/2.jpg)",
      desc: "She eats her jam with lots of bread. Ready for the day ahead.",
    },
    {
      image: "url(/img/3.jpg)",
      desc: "The only other sound's the break,Of distant waves and birds awake.",
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
        <p onClick={(e) => activeTabPosts(e, "active", "replies")}>
          Post & Replies
        </p>
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
