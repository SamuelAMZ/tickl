import React, { useState } from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Notification from "../components/Notification";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

const Explore = (e) => {
  let mention;

  const mentions = () => {
    return (
      <div className="notifications">
        <Notification mention={(mention = true)} />
        <Notification mention={(mention = true)} />
        <Notification mention={(mention = true)} />
      </div>
    );
  };
  const all = () => {
    return (
      <div className="notifications">
        <Notification mention={(mention = true)} />
        <Notification mention={(mention = true)} />
        <Notification mention={(mention = false)} />
        <Notification mention={(mention = true)} />
        <Notification mention={(mention = false)} />
      </div>
    );
  };

  const activeTabAll = (e) => {
    e.target.classList.add("activeA");
    e.target.parentElement.children[1].classList.remove("activeB");
    setactualMention("all");
  };
  const activeTabMention = (e) => {
    e.target.classList.add("activeB");
    e.target.parentElement.children[0].classList.remove("activeA");
    setactualMention("mention");
  };

  const [actualMention, setactualMention] = useState("all");

  return (
    <>
      <Header title={"Notifications"} />
      <div className="notification md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-notification">
          <MobilHeader title={"Notifications"} />
          <div className="tab">
            <p onClick={(e) => activeTabAll(e)} className="activeA">
              All
            </p>
            <p onClick={(e) => activeTabMention(e)}>Mentions</p>
          </div>
          {actualMention === "all" && all()}
          {actualMention === "mention" && mentions()}
        </div>
        <Third />
      </div>
    </>
  );
};

export default Explore;
