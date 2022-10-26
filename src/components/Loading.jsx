import React, { useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";

const Loading = () => {
  //   useEffect(() => {
  //     document.querySelector("body").style.overflow = "hidden";
  //   }, []);

  return (
    <div className="loading-screen">
      <div className="loading-div">
        <div className="logo">
          <img src="./img/logo.png" alt="logo loading" />
        </div>
        <BarLoader color="#2a6da8" width={250} />
      </div>
    </div>
  );
};

export default Loading;
