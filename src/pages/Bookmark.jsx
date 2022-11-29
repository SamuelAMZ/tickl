import React, { useContext } from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Post from "../components/Post";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

// context
import UserContext from "../context/UserContext";

// components
import Checks from "../components/Checks";

const Explore = () => {
  // context
  const { login, changeLogin } = useContext(UserContext);

  return (
    <>
      <Checks />

      {login && (
        <>
          <Header title={"Bookmark"} />
          <div className="bookmark md:max-w-7xl xl:max-w-screen-xl mx-auto p-2 md:px-10 xl:px-5">
            <Appbar />
            <div className="actual-bookmark">
              <MobilHeader title={"Bookmark"} />
              <p>No bookmark yet</p>
            </div>
            <Third />
          </div>
        </>
      )}
    </>
  );
};

export default Explore;
