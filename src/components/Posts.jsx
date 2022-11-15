import React, { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import notif from "../helpers/notif";
import { BarLoader } from "react-spinners";
import HomePostsDataContext from "../context/HomePostDataContext";
import HomeReRenderContext from "../context/HomeRerenderContext";

const Posts = () => {
  const { data, changeData } = useContext(HomePostsDataContext);
  const { reRender, changeRerender } = useContext(HomeReRenderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [paged, setPaged] = useState(10);

  useEffect(() => {
    const loadHomePosts = async () => {
      setIsLoading(true);
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

        setIsLoading(false);

        if (serverMessage.code === "500") {
          notif(serverMessage.message);
          console.log(serverMessage.message);
        }

        if (serverMessage.code === "ok") {
          // success message
          notif(serverMessage.message);
          // set latest posts
          changeData(serverMessage.data);
        }
      } catch (err) {
        notif("server error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };

    loadHomePosts();
  }, [reRender]);

  return (
    <>
      {isLoading && (
        <p className="loader">
          <BarLoader color="#2a6da8" width={150} />
        </p>
      )}
      {!isLoading &&
        data &&
        data.map((item, id) => <Post data={item} key={id} />)}
    </>
  );
};

export default Posts;
