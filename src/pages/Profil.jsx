import React, { useContext, useEffect } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import ThirdProfil from "../components/ThirdProfil";
import ProfilHead from "../components/ProfilHead";
import ProfilBody from "../components/ProfilBody";
import MobilHeader from "../components/MobilHeader";
import UserContext from "../context/UserContext";

const Profil = () => {
  const { login, changeLogin } = useContext(UserContext);

  return (
    <>
      <Checks />
      {login && (
        <div className="profil-page">
          <Appbar />
          <div className="actual-profil-page">
            <MobilHeader />
            <ProfilHead />
            <ProfilBody />
          </div>
          <ThirdProfil />
        </div>
      )}
      {!login && (
        <>
          <h2>Loading ...</h2>
        </>
      )}
    </>
  );
};

export default Profil;
