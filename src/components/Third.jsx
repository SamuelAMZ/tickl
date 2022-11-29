import React, { useState, useEffect, useRef } from "react";
import WhoToFollow from "./WhoToFollow";
import { FaFeatherAlt } from "react-icons/fa";

const Third = () => {
  //box size - view height
  const [size, setSize] = useState(0);
  const elem = useRef();

  useEffect(() => {
    let preSize = window.innerHeight - elem.current.offsetHeight;
    if (preSize > 0) {
      preSize = 0;
    }
    setSize(preSize);
  }, []);

  return (
    <div className="third">
      <div ref={elem} className="t-elms" style={{ top: size }}>
        <div className="who-follow">
          <WhoToFollow />
        </div>
        {/* 
        <a
          href="http://www.pickeringangels.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="ad"
        >
          <div className="ad-container">
            <h3>Promoted</h3>
            <div
              className="featured"
              style={{ backgroundImage: "url(/img/pickering.jpg)" }}
            ></div>
          </div>
        </a> */}

        <div className="empty"></div>
      </div>
    </div>
  );
};

export default Third;
