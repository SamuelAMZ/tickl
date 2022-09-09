import React, { useState } from "react";
import Appbar from "../components/Appbar";
import Followers from "../components/Followers";
import Following from "../components/Following";
import Third from "../components/Third";

const Follow = () => {
  const [activeTab, setActiveTab] = useState("followers");

  const changeTab = (e, current) => {
    Array.from(e.target.parentElement.children).forEach((item) =>
      item.classList.remove("active")
    );
    e.target.classList.add("active");
    setActiveTab(current);
  };

  return (
    <>
      <div className="follow">
        <Appbar />
        <div className="actual-follow">
          <div className="tab">
            <p
              className="items active"
              onClick={(e) => changeTab(e, "followers")}
            >
              Followers
            </p>

            <p className="items" onClick={(e) => changeTab(e, "following")}>
              Following
            </p>
          </div>

          <div className="content">
            {activeTab === "followers" && (
              <div className="follow-container">
                <Followers />
                <Followers />
                <Followers />
                <Followers />
              </div>
            )}
            {activeTab === "following" && (
              <div className="follow-container">
                <Following />
                <Following />
                <Following />
              </div>
            )}
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Follow;
