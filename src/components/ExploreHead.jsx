import React from "react";
import Trends from "./Trends";

const ExploreHead = () => {
  return (
    <>
      <div
        className="explore-head"
        style={{ backgroundImage: "url(/img/3.jpg)" }}
      >
        <div className="second">
          {/* desc */}
          <div className="desc">
            <h3>Top post - 23k reposts</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              deleniti quidem officia Lorem ipsum dolor sit amet consectetur
              adipisicing elit...
            </p>
          </div>
        </div>
        <span className="background"></span>
      </div>
      <div className="trends">
        <h3>Trends For You</h3>
        <div className="trends-conatiner">
          <Trends />
          <Trends />
        </div>
      </div>
    </>
  );
};

export default ExploreHead;
