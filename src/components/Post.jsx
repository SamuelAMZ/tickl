import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// icons
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCommentDetail, BiLike, BiBookmark } from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";

// helpers
import trimData from "../helpers/trim";
import notif from "../helpers/notif";
import postReq from "../helpers/postReq";

// components
import PostImagesBox from "./images/PostImagesBox";
import RepostPost from "./post/RepostPost";

// react query
import { useQuery } from "react-query";

// context
import UserContext from "../context/UserContext";
import RepostPostActiveContext from "../context/RepostPostActiveContext";
import CurrentRepostPostIdContext from "../context/CurrentRepostPostId";
import RepostStateMobileContext from "../context/RepostStateMobileContext";

const Post = ({ data }) => {
  let dateTrimed = data.date.split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [owner, setOwner] = useState(null);
  const [originalOwner, setOriginalOwner] = useState(null);
  const [actions, setActions] = useState(null);
  const [likesCount, setLikesCount] = useState(data ? data.actionLikes : 0);
  const [unLikesCount, setUnLikesCount] = useState(data ? data.actionLikes : 0);
  const [repostCount, setRepostCount] = useState(data ? data.actionReposts : 0);

  // context
  const { login, changeLogin } = useContext(UserContext);
  const { repostActive, changeRepostActive } = useContext(
    RepostPostActiveContext
  );
  const { currentRepostPostId, setCurrentRepostPostId } = useContext(
    CurrentRepostPostIdContext
  );
  const { repostData, changeRepostMobile } = useContext(
    RepostStateMobileContext
  );

  // router
  const navigate = useNavigate();

  // redirect to single post page
  const handleRedirectToSinglePage = () => {
    navigate(`/post/${data._id}`);
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

    send();
  }, []);

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

    send();
  }, []);

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

  //  -------- repost (open repost popup or redirect to mobile repost route)
  const handleRepost = () => {
    setCurrentRepostPostId(data._id);
    if (window.screen.width >= 768) {
      // on desktop and tablet show repost popup
      // set active repost id to context
      // // make it appear
      changeRepostActive(true);
    } else {
      // redirect to repost page on mobile and set repost mobile state
      // state
      changeRepostMobile({ postData: data, ownerData: owner });
      // redirect
      navigate("/repost");
    }
  };

  const redirectTooriginalPost = () => {
    // should navigate to original post page
    if (data && data.originalPostId) {
      navigate(`/post/${data.originalPostId}`);
    }
  };

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

  return (
    <>
      {owner && (
        <div className="post">
          {/* user */}
          <NavLink to={"/" + owner.username}>
            <div
              className="user"
              style={{ backgroundImage: `url(${owner.profileicon.thumb})` }}
            ></div>
          </NavLink>

          <div>
            {/* user details */}
            <div className="user-detail">
              {/* mobile phones */}
              <p className="user-first md:hidden">{trimData(owner.name, 14)}</p>

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
              <div
                className="desc repostnote"
                onClick={handleRedirectToSinglePage}
              >
                {data.repostNote}
              </div>
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
                <div className="desc" onClick={handleRedirectToSinglePage}>
                  {data.postText}
                </div>
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
              {/* repost */}
              {data.postType !== "repost" && (
                <div
                  className={
                    actions && actions.repost
                      ? "btn btn-sm repost blue"
                      : "btn btn-sm repost"
                  }
                  onClick={handleRepost}
                >
                  <FiRepeat />
                  <p>{repostCount}</p>
                </div>
              )}
              {/* like */}
              <div
                className={
                  actions && actions.like
                    ? "btn btn-sm like blue"
                    : "btn btn-sm like"
                }
                onClick={actions && actions.like ? handleUnLikes : handleLikes}
              >
                <BiLike />
                <p>{likesCount}</p>
              </div>
              {/* bookmark */}
              {data.postType !== "repost" && (
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
              <label tabIndex={0} className="btn  btn-sm m-1 bg-white">
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

      {/* show desktop reposter */}
      {repostActive && data._id === currentRepostPostId && (
        <RepostPost postData={data} ownerData={owner} />
      )}
    </>
  );
};

export default Post;
