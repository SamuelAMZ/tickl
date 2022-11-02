import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";

const SingleHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="single-header">
      <div className="backicon" onClick={() => navigate(-1)}>
        <BsArrow90DegLeft />
      </div>
      <div className="singletitle">{title}</div>
    </div>
  );
};

export default SingleHeader;
