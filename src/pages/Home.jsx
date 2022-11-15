import React, { useState, useEffect, useContext } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import TopPost from "../components/TopPost";
import Posts from "../components/Posts";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import DesktopPost from "../components/post/DesktopPost";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import DesktopPostActiveContext from "../context/DesktopPostContext";

// contexts
import { HomeReRenderProvider } from "../context/HomeRerenderContext";

const Home = () => {
  const { login, changeLogin } = useContext(UserContext);
  const { deskActive, changeDeskActive } = useContext(DesktopPostActiveContext);

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
                {/* show desktop poster */}
                {deskActive && <DesktopPost />}
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
