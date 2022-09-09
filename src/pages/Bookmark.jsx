import React from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Post from "../components/Post";

const Explore = () => {
  return (
    <>
      <div className="bookmark">
        <Appbar />
        <div className="actual-bookmark">
          <div className="books">
            <h3 className="date">12-12-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/4.jpg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/2.jpg)"} desc={"lorem ipsum"} />
              </div>
            </div>
          </div>
          <div className="books">
            <h3 className="date">12-13-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/1.jpg)"} desc={"lorem ipsum"} />
              </div>
            </div>
          </div>
          <div className="books">
            <h3 className="date">12-12-2022</h3>
            <div className="book">
              <div className="line"></div>
              <div className="book-posts">
                <Post image={"url(/img/5.jpg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/1.jpg)"} desc={"lorem ipsum"} />
                <Post image={"url(/img/3.jpg)"} desc={"lorem ipsum"} />
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
