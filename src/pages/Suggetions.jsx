import React from "react";
import Suggetion from "../components/Suggetion";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import MobilHeader from "../components/MobilHeader";

const Suggetions = () => {
  return (
    <>
      <div className="suggetions">
        <Appbar />
        <div className="actual-suggetions">
          <MobilHeader />
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
