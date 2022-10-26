import React, { useContext, useEffect } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import ProfilHead from "../components/ProfilHead";
import ProfilBody from "../components/ProfilBody";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";

const Profil = () => {
  const { login, changeLogin } = useContext(UserContext);

  return (
    <>
      <Checks />
      <Header title={"Profile"} />
      {login && (
        <div className="profil-page md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
          <Appbar />
          <div className="actual-profil-page">
            <MobilHeader />
            <ProfilHead />
            <ProfilBody />
          </div>
          <Third />
        </div>
      )}
      {!login && (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default Profil;
