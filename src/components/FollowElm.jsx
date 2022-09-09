import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";

const FollowElm = () => {
  return (
    <div className="elm">
      <MdOutlineAccountCircle />
      <div className="user-detail">
        <p className="user-first">Paris Saint</p>
        <p className="user-name">@paris</p>
      </div>
      <button>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default FollowElm;
