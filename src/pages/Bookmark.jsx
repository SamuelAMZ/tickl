import React, { useContext, useEffect, useState } from "react";

// loader
import { BarLoader } from "react-spinners";

// context
import UserContext from "../context/UserContext";

// components
import Checks from "../components/Checks";
import SingleBookmark from "../components/bookmark/SingleBookmark";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../helpers/postReq";

const Explore = () => {
  // context
  const { login, changeLogin } = useContext(UserContext);

  // states
  const [bookmarks, setBookmarks] = useState([]);

  // send bookmark list req
  const sendBookmarkReq = async () => {
    // data
    const inputData = { userId: login.user.id };
    // get request
    return await postReq(inputData, "/twitter/api/post/bookmarklist");
  };

  const {
    data: bookmarkData,
    isLoading: bookmarkQueryLoading,
    refetch: sendBookmark,
  } = useQuery(["bookmarklist"], sendBookmarkReq, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // set bookmarks to state
  useEffect(() => {
    if (bookmarkData && bookmarkData.code === "ok") {
      setBookmarks(bookmarkData.payload);
    }
  }, [bookmarkData]);

  useEffect(() => {
    if (login) {
      sendBookmark();
    }
  }, [login]);

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
              <div className="singlebook">
                {bookmarkQueryLoading ? (
                  <p className="loader">
                    <BarLoader color="#2a6da8" width={150} />
                  </p>
                ) : (
                  bookmarks.map((single, idx) => (
                    <SingleBookmark data={single} key={idx} />
                  ))
                )}
                {bookmarks.length === 0 && bookmarkData && <p>No bookmark</p>}
              </div>
            </div>
            <Third />
          </div>
        </>
      )}
    </>
  );
};

export default Explore;
