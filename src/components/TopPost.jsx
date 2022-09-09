import React from "react";
import { BiSearch } from "react-icons/bi";

const TopPost = () => {
  return (
    <div className="top-post">
      <div className="new-post">
        <h2>What is going on?</h2>
        <div className="search">
          <BiSearch />
        </div>
      </div>
    </div>
  );
};

export default TopPost;
