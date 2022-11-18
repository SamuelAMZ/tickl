import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import trimData from "../helpers/trim";
import notif from "../helpers/notif";

const Post = ({ data }) => {
  let dateTrimed = data.date.split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [owner, setOwner] = useState(null);

  // find individual post owner based on ownerid
  useEffect(() => {
    const send = async () => {
      // send search request to backend
      setIsLoading(true);
      const ownerData = { ownerId: data.ownerId };

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
        }
      } catch (err) {
        notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };
    send();
  }, []);

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

            <div className="desc">{data.postText}</div>

            {/* <div className="image">
             <img src={image.replace("url(", "").replace(")", "")} /> 
          </div> */}

            {/* actions */}
            <div className="actions">
              <div className="btn btn-sm comment">
                <BiCommentDetail />
                <p>{data.actionComments}</p>
              </div>
              <div className="btn btn-sm repost">
                <FiRepeat />
                <p>{data.actionReposts}</p>
              </div>
              <div className="btn btn-sm like">
                <BiLike />
                <p>{data.actionLikes}</p>
              </div>
              <div className="btn btn-sm eye">
                <AiOutlineEye />
                <p>{data.actionViews}</p>
              </div>
              <div className="btn btn-sm more-actions">
                <BsUpload />
              </div>
            </div>
          </div>

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
    </>
  );
};

export default Post;
