import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../helpers/postReq";
import trimData from "../../helpers/trim";

// component
import PostImagesBox from "../images/PostImagesBox";

// icons
import { FiMoreHorizontal } from "react-icons/fi";

const SingleBookmark = ({ data }) => {
  const navigate = useNavigate();

  // states
  const [singleBook, setSingleBook] = useState(null);
  const [owner, setOwner] = useState(null);

  let dateTrimed;
  if (singleBook) {
    dateTrimed = singleBook.date.split("T")[0];
  }

  // send single bookmark req
  const sendBookmarkReq = async () => {
    // data
    const inputData = { postId: data };
    // get request
    return await postReq(inputData, "/twitter/api/post/singlebookmark");
  };

  const {
    data: bookmarkData,
    isLoading: bookmarkQueryLoading,
    refetch: sendBookmark,
  } = useQuery([data], sendBookmarkReq, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (bookmarkData && bookmarkData.payload) {
      setSingleBook(bookmarkData.payload.postInfo);
      setOwner(bookmarkData.payload.ownerInfo);
    }
  }, [bookmarkData]);

  // redirect to single post page
  const handleRedirectToSinglePage = () => {
    navigate(`/post/${data}`);
  };

  return (
    <>
      {singleBook && (
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

            <div>
              {/* post description */}
              {singleBook.postText && (
                <div className="desc" onClick={handleRedirectToSinglePage}>
                  {singleBook.postText}
                </div>
              )}

              {/* post images */}
              {singleBook.postImages.length >= 1 && (
                <PostImagesBox images={singleBook.postImages} />
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

      {!singleBook && <p>bookmark loading...</p>}
    </>
  );
};

export default SingleBookmark;
