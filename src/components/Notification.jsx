import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Notification = ({ mention }) => {
  const removeNotification = (e) => {
    e.target.parentElement.remove();
  };

  return (
    <div className="single-notification">
      {mention && <p className="mention">@Lorem ipsum mention you</p>}
      <h3>Post title</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
        perspiciatis...
      </p>
      <span onClick={(e) => removeNotification(e)}>
        <AiOutlineCloseCircle />
      </span>
    </div>
  );
};

export default Notification;
