import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// components
import SingleComment from "./SingleComment";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../helpers/postReq";

const CommentsList = ({ postData }) => {
  const location = useLocation();
  const [ids, setIds] = useState(null);

  //   ---------- get all comments id
  const getAllCommentsIds = async () => {
    // data
    const inputData = { postId: postData._id };
    // get request
    return await postReq(inputData, "/twitter/api/post/commentslist");
  };

  const {
    data: commentsIds,
    isLoading: commentsIdsQueryLoading,
    refetch: sendCommentsIds,
  } = useQuery([`${location.pathname}commentsIds`], getAllCommentsIds, {
    refetchOnWindowFocus: true,
    enabled: false,
  });

  useEffect(() => {
    sendCommentsIds();
  }, [location.pathname]);

  useEffect(() => {
    if (commentsIds && commentsIds.code === "ok") {
      setIds(commentsIds.payload);
    }
  }, [commentsIds]);

  return (
    <div className="commentList">
      <p>Comments ({postData.actionComments}) </p>
      {ids ? (
        ids.map((elm, idx) => <SingleComment id={elm} key={idx} />)
      ) : (
        <p>No comment yet</p>
      )}
    </div>
  );
};

export default CommentsList;
