import React, { useEffect } from "react";
import UserCard from "../UserCard";
import { useOutletContext } from "react-router-dom";
import { BarLoader } from "react-spinners";

const People = () => {
  const { searchData, isLoading } = useOutletContext();

  return (
    <div className="people-container">
      {isLoading ? (
        <p className="loader">
          <BarLoader color="#2a6da8" width={150} />
        </p>
      ) : (
        <>
          {searchData ? (
            searchData.map((data, idx) => {
              return <UserCard data={data} key={idx} />;
            })
          ) : (
            <p className="nodata">No data</p>
          )}
        </>
      )}
    </div>
  );
};

export default People;
