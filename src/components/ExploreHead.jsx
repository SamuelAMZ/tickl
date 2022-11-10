import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import notif from "../helpers/notif";
import Trends from "./Trends";

const ExploreHead = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchPage, setIsSearchPage] = useState(false);
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

  return (
    <>
      <div className="search-header search-pages mt-2 search-explore">
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

      <div className="trends">
        <h3>Trends For You</h3>
        <div className="trends-conatiner">
          <Trends />
          <Trends />
        </div>
      </div>
    </>
  );
};

export default ExploreHead;
