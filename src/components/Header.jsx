import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import notif from "../helpers/notif";

const Header = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchPage, setIsSearchPage] = useState(false);

  // automatic scroll to top on each component mont
  useEffect(() => {
    const topElm = document.querySelector("body");
    topElm.scrollIntoView({ behavior: "auto", block: "start" });
  }, [title]);

  // handle search bar
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // prevent having empty search input
    if (!(searchTerm.length >= 3)) {
      return notif("Please at least 3 characters");
    }
    // redirect to search page
    if (!location.pathname.includes("search")) {
      navigate(`/search/people/?s=${searchTerm}`);
    }
  };

  // detect search page for hidding dynamicly the search bar (avoid duplicates)
  useEffect(() => {
    if (location.pathname.includes("search")) {
      setIsSearchPage(false);
    } else {
      setIsSearchPage(true);
    }
  }, [location.pathname]);

  return (
    <div className="header-container">
      <div className="header home md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
        <NavLink to={"/home"}>
          <div className="logo">
            <img src="/img/logo.png" alt="logo" />
          </div>
        </NavLink>
        <div className="title">{title}</div>
        {isSearchPage && (
          <div className="search-header">
            <div className="form-wrapper bg-neutral">
              <BiSearch className="icon" onClick={handleSearch} />
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search here"
                  className="input input-md w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
