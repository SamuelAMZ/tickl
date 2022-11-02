import React from "react";
import Suggetion from "../components/Suggetion";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";

const Suggetions = () => {
  return (
    <>
      <Header title={"Suggetions"} />
      <div className="suggetions md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-suggetions">
          <MobilHeader title={"Suggetions"} />
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
