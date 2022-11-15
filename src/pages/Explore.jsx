import React from "react";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Posts from "../components/Posts";
import ExploreHead from "../components/ExploreHead";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

// contexts
import { HomeReRenderProvider } from "../context/HomeRerenderContext";

const Explore = () => {
  return (
    <>
      <Header title={"Explore"} />
      <div className="explore md:max-w-7xl xl:max-w-screen-xl mx-auto p-2 md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-explore">
          <MobilHeader title={"Explore"} />
          <ExploreHead />
          <div className="posts">
            {/* rerender provider */}
            <HomeReRenderProvider>
              <Posts />
            </HomeReRenderProvider>
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Explore;
