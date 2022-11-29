import React from "react";

const HomeAds = ({ data }) => {
  return (
    <>
      {data && (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ad"
        >
          <div className="ad-container">
            <h3>Promoted</h3>
            <div
              className="featured"
              style={{ backgroundImage: `url(${data.img})` }}
            ></div>
          </div>
        </a>
      )}
    </>
  );
};

export default HomeAds;
