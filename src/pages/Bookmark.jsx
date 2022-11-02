import React from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Post from "../components/Post";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

const Explore = () => {
  return (
    <>
      <Header title={"Bookmark"} />
      <div className="bookmark md:max-w-7xl xl:max-w-screen-xl mx-auto p-2 md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-bookmark">
          <MobilHeader title={"Bookmark"} />
          <div className="books">
            <h3 className="date">12-12-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/4.jpeg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/2.jpeg)"} desc={"lorem ipsum"} />
              </div>
            </div>
          </div>
          <div className="books">
            <h3 className="date">12-13-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/1.jpeg)"} desc={"lorem ipsum"} />
              </div>
            </div>
          </div>
          <div className="books">
            <h3 className="date">12-12-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/4.jpeg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/1.jpeg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/3.jpeg)"} desc={"lorem ipsum"} />
              </div>
            </div>
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Explore;
