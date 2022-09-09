import React from "react";
import Appbar from "../components/Appbar";
import ThirdProfil from "../components/ThirdProfil";
import ProfilHead from "../components/ProfilHead";
import ProfilBody from "../components/ProfilBody";

const Profil = () => {
  return (
    <>
      <div className="profil-page">
        <Appbar />
        <div className="actual-profil-page">
          <ProfilHead />
          <ProfilBody />
        </div>
        <ThirdProfil />
      </div>
    </>
  );
};

export default Profil;
