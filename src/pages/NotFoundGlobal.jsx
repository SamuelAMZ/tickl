import React, { useContext } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";

const Home = () => {
  const { login, changeLogin } = useContext(UserContext);

  return (
    <>
      <Checks />
      {login && (
        <>
          <Header title={"404"} />
          <MobilHeader title={"404"} />
          <div className="home md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
            <Appbar />

            <div className="actual-home">
              <div className="notfound">
                <h2>Page not Found 404</h2>
                <p>The requested page is not found</p>
              </div>
            </div>

            <Third />
          </div>
        </>
      )}

      {!login && (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default Home;
