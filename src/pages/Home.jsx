import React, { useState, useEffect, useContext } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import TopPost from "../components/TopPost";
import Posts from "../components/Posts";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";

// contexts
import { HomeReRenderProvider } from "../context/HomeRerenderContext";

const Home = () => {
  const { login, changeLogin } = useContext(UserContext);

  return (
    <>
      <Checks />
      {/* rerender provider */}
      <HomeReRenderProvider>
        {login && (
          <>
            <Header title={"Home"} />
            <MobilHeader title={"Home"} />
            <div className="home md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
              <Appbar />

              <div className="actual-home">
                <TopPost />
                <div className="posts">
                  <Posts />
                </div>
              </div>

              <Third />
            </div>
          </>
        )}

        {!login && (
          <>
            <Loading />
          </>
        )}
      </HomeReRenderProvider>
    </>
  );
};

export default Home;
