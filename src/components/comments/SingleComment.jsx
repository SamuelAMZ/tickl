import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import PostImagesBox from "../images/PostImagesBox";

// react query
import { useQuery } from "react-query";

// icons
import { FiMoreHorizontal } from "react-icons/fi";

// helpers
import trimData from "../../helpers/trim";
import postReq from "../../helpers/postReq";

const SingleComment = ({ id }) => {
  const location = useLocation();
  const [data, setData] = useState(null);

  let dateTrimed;
  if (data) {
    dateTrimed = data.comment.date.split("T")[0];
  }

  // get single comment
  const getComment = async () => {
    // data
    const inputData = { commentId: id };
    // get request
    return await postReq(inputData, "/twitter/api/post/onecomment");
  };

  const {
    data: commentData,
    isLoading: commentDataQueryLoading,
    refetch: sendCommentData,
  } = useQuery([`${id}`], getComment, {
    refetchOnWindowFocus: true,
    enabled: true,
  });

  useEffect(() => {
    if (commentData && commentData.code === "ok") {
      setData(commentData.payload);
    }
  }, [commentData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data && (
        <div className="post">
          {/* user */}
          <NavLink to={"/" + data.owner.username}>
            <div
              className="user"
              style={{
                backgroundImage: `url(${data.owner.profileicon.thumb})`,
              }}
            ></div>
          </NavLink>

          <div>
            {/* user details */}
            <div className="user-detail">
              {/* mobile phones */}
              <p className="user-first md:hidden">
                {trimData(data.owner.name, 14)}
              </p>

              {/* large screens */}
              <p className="user-first hidden md:block">
                {trimData(data.owner.name, 20)}
              </p>
              <p className="user-name hidden md:block">
                @{trimData(data.owner.username, 10)}
              </p>

              <p className="date">{dateTrimed}</p>
            </div>

            {/* post description */}
            {data.comment.commentText && (
              <div className="desc">{data.comment.commentText}</div>
            )}

            {/* post images */}
            {data.comment.commentImages.length >= 1 && (
              <PostImagesBox images={data.comment.commentImages} />
            )}
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
                  <a>Follow</a>
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

export default SingleComment;
