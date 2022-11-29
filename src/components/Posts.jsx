import React, { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import notif from "../helpers/notif";
import { BarLoader } from "react-spinners";

// contexts
import HomePostsDataContext from "../context/HomePostDataContext";
import HomeReRenderContext from "../context/HomeRerenderContext";

// infinit scroll package
import InfiniteScroll from "react-infinite-scroll-component";

// componenets
import HomeAds from "./ads/HomeAds";

const Posts = () => {
  const { data, changeData } = useContext(HomePostsDataContext);
  const [paged, setPaged] = useState(0);
  const [isMore, setIsMore] = useState(true);
  let { reRender, changeRerender } = useContext(HomeReRenderContext);
  const [timeToReload, setTimeToReload] = useState(0);

  const loadHomePosts = async () => {
    // body of the current page
    const pagedData = { paged };

    // load latest posts
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/twitter/api/post/homeposts`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(pagedData),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      if (serverMessage.code === "500") {
        notif(serverMessage.message);
        console.log(serverMessage.message);
      }

      if (serverMessage.code === "ok") {
        if (serverMessage.more === "no") {
          setIsMore(false);
        }
        if (serverMessage.more === "yes") {
          // set latest posts
          changeData([...data, ...serverMessage.data]);
          // increment paged
          setPaged(paged + 8);
        }
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
    }
  };

  // reset states on rerender
  useEffect(() => {
    // reset paged
    setPaged(0);
    // reset posts data
    changeData([]);
    // provok reload
    setTimeToReload(timeToReload + 1);
  }, [reRender]);

  // first load
  useEffect(() => {
    loadHomePosts();

    // reset data on unmount
    return () => changeData([]);
  }, [timeToReload]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {/* posts */}
      <InfiniteScroll
        dataLength={data.length}
        next={loadHomePosts}
        hasMore={isMore}
        loader={
          <p className="loader">
            <BarLoader color="#2a6da8" width={150} />
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Bravo! You have seen it all</b>
          </p>
        }
      >
        {data &&
          data.map((item, id) => {
            // posts
            if (!item.ad) {
              return <Post data={item} key={id} />;
            }
            if (item.ad) {
              // ads
              return <HomeAds data={item} key={id} />;
            }
          })}
      </InfiniteScroll>
    </>
  );
};

export default Posts;
