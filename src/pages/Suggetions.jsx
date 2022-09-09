import React from "react";
import Suggetion from "../components/Suggetion";
import Appbar from "../components/Appbar";
import Third from "../components/Third";

const Suggetions = () => {
  return (
    <>
      <div className="suggetions">
        <Appbar />
        <div className="actual-suggetions ">
          <div className="follow-container">
            <Suggetion />
            <Suggetion />
            <Suggetion />
            <Suggetion />
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Suggetions;
