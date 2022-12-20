import React, { useState, useContext, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

//// context
import UserContext from "../context/UserContext";

// componenent
import Checks from "../components/Checks";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import PostImagesBox from "../components/images/PostImagesBox";
import CommentsForm from "../components/comments/CommentsForm";
import CommentsList from "../components/comments/CommentsList";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../helpers/postReq";
import trimData from "../helpers/trim";
import notif from "../helpers/notif";

// icons
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCommentDetail, BiLike, BiBookmark } from "react-icons/bi";
import { BarLoader } from "react-spinners";

const SingleNormalPost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // context
  const { login, changeLogin } = useContext(UserContext);

  //   states
  const [currentUrl, setCurrentUrl] = useState(null);
  const [data, setData] = useState(null);
  const [owner, setOwner] = useState(null);
  const [actions, setActions] = useState(null);
  const [originalOwner, setOriginalOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(data ? data.actionLikes : 0);
  const [unLikesCount, setUnLikesCount] = useState(data ? data.actionLikes : 0);
  const [postType, setPostType] = useState("normal");

  let dateTrimed = data ? data.date.split("T")[0] : "";

  //   get post id from url
  useEffect(() => {
    const id = location.pathname.replace("/post/", "");
    setCurrentUrl(id.trim());
  }, [location.pathname]);

  //   send request to get single post data
  const sendReq = async () => {
    // data
    const inputData = { postId: currentUrl };
    // get request
    return await postReq(inputData, "/twitter/api/post/singlepost");
  };

  const {
    data: singleData,
    isLoading: singleQueryLoading,
    refetch: sendSingle,
  } = useQuery(["singlepost"], sendReq, {
    refetchOnWindowFocus: true,
    enabled: false,
  });

  useEffect(() => {
    if (currentUrl) {
      sendSingle();
    }
  }, [currentUrl]);

  //   set data and owner
  useEffect(() => {
    if (singleData && singleData.code === "ok") {
      setData(singleData.payload.postInfo);
      setOwner(singleData.payload.ownerInfo);
    }
  }, [singleData]);

  //   redirect repost post ro original post
  const redirectTooriginalPost = () => {
    // should navigate to original post page
    if (data && data.originalPostId) {
      navigate(`/post/${data.originalPostId}`);
    }
  };

  // -------- actions checks
  useEffect(() => {
    const send = async () => {
      // send search request to backend
      setIsLoading(true);
      const postData = { postId: data._id, userId: login.user.id };

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/post/actions`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: JSON.stringify(postData),
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        setIsLoading(false);

        //   check if data > 1
        if (serverMessage.code === "ok") {
          setActions(serverMessage.payload.data);
        } else {
          setActions(null);
        }
      } catch (err) {
        // notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };

    if (data) {
      send();
    }
  }, [data]);

  // -------- likes
  const sendLikesReq = async () => {
    // data
    const inputData = { postId: data._id, userId: login.user.id };
    // get request
    return await postReq(inputData, "/twitter/api/post/likes");
  };

  const {
    data: likesData,
    isLoading: likesQueryLoading,
    refetch: sendLike,
  } = useQuery(["likes"], sendLikesReq, {
    refetchOnWindowFocus: true,
    enabled: false,
  });
  // update like
  const handleLikes = () => {
    // send like request
    sendLike();
    // increase if do not already liked and decrease if already
    // update like count +1
    setLikesCount(Number(likesCount) + 1);
    // change color to blue
    setActions({ ...actions, like: true });
  };

  // useEffect give the real delayed data
  useEffect(() => {
    if (likesData && likesData.code === "bad") {
      setLikesCount(data.actionLikes);
    }
  }, [likesData]);

  // -------- unlikes
  const sendUnLikesReq = async () => {
    // data
    const inputData = { postId: data._id, userId: login.user.id };
    // get request
    return await postReq(inputData, "/twitter/api/post/unlikes");
  };

  const {
    data: unLikesData,
    isLoading: unlikesQueryLoading,
    refetch: sendUnLike,
  } = useQuery(["unlikes"], sendUnLikesReq, {
    refetchOnWindowFocus: true,
    enabled: false,
  });
  // update like
  const handleUnLikes = () => {
    // send like request
    sendUnLike();
    // increase if do not already liked and decrease if already
    // update like count +1
    setLikesCount(Number(likesCount) - 1);
    // change color to blue
    setActions({ ...actions, like: false });
  };

  // useEffect give the real delayed data
  useEffect(() => {
    if (unLikesData && unLikesData.code === "bad") {
      setUnLikesCount(data.actionLikes);
    }
  }, [unLikesData]);

  //  -------- bookmark
  const sendBookmarkReq = async () => {
    // data
    const inputData = { postId: data._id, userId: login.user.id };
    // get request
    await postReq(inputData, "/twitter/api/post/newbookmark");
    notif("bookmarked successfully");
    return;
  };

  const {
    data: bookmarkData,
    isLoading: bookmarkQueryLoading,
    refetch: sendBookmark,
  } = useQuery(["newbookmark"], sendBookmarkReq, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const handleBookmark = async (e) => {
    // set loading icon
    e.target.classList.add("loading");
    e.target.children[0].classList.add("hidden");
    await sendBookmark();
    e.target.classList.remove("loading");
    e.target.children[0].classList.remove("hidden");
  };

  // -------- find individual post owner based on ownerid
  useEffect(() => {
    const send = async () => {
      // send search request to backend
      setIsLoading(true);
      let ownerData = { ownerId: "", repostId: "" };

      if (data.postType === "normal") {
        ownerData = { ownerId: data.ownerId, repostId: "" };
      }
      if (data.postType === "repost") {
        ownerData = { ownerId: data.ownerId, repostId: data.originalUId };
      }

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/post/findpostowner`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: JSON.stringify(ownerData),
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        setIsLoading(false);

        //   check if data > 1
        if (serverMessage.data.length < 1) {
          setOwner(null);
          notif("can't find post awner");
        } else {
          setOwner(serverMessage.data);
          setOriginalOwner(serverMessage.originalU);
        }
      } catch (err) {
        notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };

    if (data) {
      send();
    }
  }, [data]);

  //   set unset state when data state is set
  useEffect(() => {
    if (data) {
      console.log(data.postType);

      setLikesCount(data.actionLikes);
      setPostType(data.postType);
    }
  }, [data]);

  return (
    <>
      <Checks />
      {login && (
        <>
          <Header title={"Post Page"} />
          <div className="notification md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
            <Appbar />
            <div className="actual-notification">
              <MobilHeader title={"Post Page"} />
              {/* from post (copy paste stuff) */}
              <>
                {owner && !isLoading && (
                  <div className="post">
                    {/* user */}
                    <NavLink to={"/" + owner.username}>
                      <div
                        className="user"
                        style={{
                          backgroundImage: `url(${owner.profileicon.thumb})`,
                        }}
                      ></div>
                    </NavLink>

                    <div>
                      {/* user details */}
                      <div className="user-detail">
                        {/* mobile phones */}
                        <p className="user-first md:hidden">
                          {trimData(owner.name, 14)}
                        </p>

                        {/* large screens */}
                        <p className="user-first hidden md:block">
                          {trimData(owner.name, 20)}
                        </p>
                        <p className="user-name hidden md:block">
                          @{trimData(owner.username, 10)}
                        </p>

                        <p className="date">{dateTrimed}</p>
                      </div>

                      {/* if repost render repost node */}
                      {originalOwner && (
                        <div className="desc repostnote">{data.repostNote}</div>
                      )}

                      <div
                        className={originalOwner && "repost-style"}
                        onClick={redirectTooriginalPost}
                      >
                        {/* reposts render */}
                        {originalOwner && (
                          <div className="repost-data-originalu">
                            <img src={originalOwner.profileicon.thumb} />
                            <p>{originalOwner.name}</p>
                          </div>
                        )}

                        {/* post description */}
                        {data.postText && (
                          <div className="desc">{data.postText}</div>
                        )}

                        {/* post images */}
                        {data.postImages.length >= 1 && (
                          <PostImagesBox images={data.postImages} />
                        )}
                      </div>

                      {/* actions */}
                      <div className="actions">
                        {/* comment */}
                        <div className="btn btn-sm comment">
                          <BiCommentDetail />
                          <p>{data.actionComments}</p>
                        </div>

                        {/* like */}
                        <div
                          className={
                            actions && actions.like
                              ? "btn btn-sm like blue"
                              : "btn btn-sm like"
                          }
                          onClick={
                            actions && actions.like
                              ? handleUnLikes
                              : handleLikes
                          }
                        >
                          <BiLike />
                          <p>{likesCount}</p>
                        </div>

                        {/* bookmark */}
                        {postType && postType !== "repost" && (
                          <div
                            className="btn btn-sm more-actions"
                            onClick={handleBookmark}
                          >
                            <BiBookmark />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* more btn */}
                    <div className="post-more">
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn  btn-sm m-1 bg-white"
                        >
                          <FiMoreHorizontal />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>Follow @user</a>
                          </li>
                          <li>
                            <a>Like Post</a>
                          </li>
                          <li>
                            <a>Bookmark Post</a>
                          </li>
                          <li>
                            <a>Visit Profile</a>
                          </li>
                          <li>
                            <a>Report</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* loader */}
                {isLoading && (
                  <p className="loader">
                    <BarLoader color="#2a6da8" width={150} />
                  </p>
                )}

                {/* comment from */}
                {owner && !isLoading && <CommentsForm postData={data} />}

                {/* comment list */}
                {owner && !isLoading && <CommentsList postData={data} />}
              </>
            </div>
            <Third />
          </div>
        </>
      )}
    </>
  );
};

export default SingleNormalPost;
