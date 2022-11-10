import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Loading from "../components/Loading";
import notif from "../helpers/notif";
import { BiSearch } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

const Search = () => {
  const { login, changeLogin } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState(null);
  const [current, setCurrent] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // auto move user to username route
  useEffect(() => {
    // autoredirect to people page
    if (!isSearching) {
      if (location.pathname === "/search/" || location.pathname === "/search") {
        navigate("/search/people");
      }
    }

    if (isSearching) {
      // set current as data in the url
      navigate(`/search/people/?s=${current}`);
    }
  }, [location.pathname, isSearching]);

  // handle search bar
  const handleSearch = async (e) => {
    e.preventDefault();
    // prevent having empty search input
    if (!(current.length >= 3)) {
      return notif("Please at least 3 characters");
    }
    // edit the serach url
    setIsSearching(current);
  };

  //   getting search query from url
  useEffect(() => {
    let searchTerm = location.search;
    let searchQuery = decodeURIComponent(searchTerm.replace("?s=", ""));
    setUrlData(searchQuery);
  }, [location.search]);

  useEffect(() => {
    const send = async () => {
      if (urlData === "" || urlData === null) {
        return;
      }
      // send search request to backend
      setIsLoading(true);
      const data = { urlData };

      try {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("GET", "POST", "OPTIONS");
        headers.append(
          "Access-Control-Allow-Origin",
          `${process.env.REACT_APP_DOMAIN}`
        );
        headers.append("Access-Control-Allow-Credentials", "true");

        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/searchpeople`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        setIsLoading(false);

        //   check if data > 1
        if (serverMessage.data.length < 1) {
          setSearchData(null);
        } else {
          setSearchData(serverMessage.data);
        }

        console.log(serverMessage.data);
      } catch (err) {
        notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };
    send();

    // set no data if url search query is empty
    if (urlData === null || urlData === "") {
      setSearchData(null);
    }
    setCurrent(urlData);
  }, [urlData]);

  return (
    <>
      <Checks />
      {login && (
        <>
          <Header title={"Search"} />
          <MobilHeader title={"Search"} />
          <div className="home md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
            <Appbar />

            <div className="actual-home">
              <div className="h-2"></div>
              {/* search */}
              <div
                className="search-header search-pages mt-2
               "
              >
                <div className="form-wrapper bg-neutral">
                  <BiSearch className="icon" onClick={handleSearch} />
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="input input-md w-full"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                    />
                  </form>
                </div>
              </div>

              {/* tabs */}
              <div className="tabs w-full tab-container">
                <a className="tab btn active">People</a>
                <a className="tab btn">Top</a>
                <a className="tab btn">Latest</a>
                <a className="tab btn">Photo</a>
                <a className="tab btn">Video</a>
              </div>

              {/* sub routes */}
              <Outlet context={{ searchData, isLoading }} />
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

export default Search;
