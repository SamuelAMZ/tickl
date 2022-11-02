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

        <a
          href="https://paradisespaandtanning.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/pickering.jpg)" }}
          ></div>
        </a>
        <a
          href="https://paradisespaandtanning.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/oshawa.jpg)" }}
          ></div>
        </a>
        <a
          href="https://carriesvip.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/carries.jpg)" }}
          ></div>
        </a>

        <div className="who-follow">
          <WhoToFollow />
        </div>

        <a
          href="https://paradisespaandtanning.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/pickering.jpg)" }}
          ></div>
        </a>
        <a
          href="https://paradisespaandtanning.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/oshawa.jpg)" }}
          ></div>
        </a>
        <a
          href="https://carriesvip.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="featured"
            style={{ backgroundImage: "url(/img/carries.jpg)" }}
          ></div>
        </a>

        <div className="empty"></div>
      </div>
    </div>
  );
};

export default Third;
