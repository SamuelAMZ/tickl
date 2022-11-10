import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import MoreDetailsContext from "../context/MoreDetailContext";

const MoreDetail = ({ data }) => {
  const { showMoreDetail, changeShowMoreDetail } =
    useContext(MoreDetailsContext);

  return (
    <>
      <div
        className="more-container"
        onClick={() => changeShowMoreDetail(false)}
      ></div>

      <div className="more-content">
        <div className="actual-content">
          {data &&
            data.map((data, idx) => {
              return (
                <>
                  <div>
                    <h3>{data.title}</h3>
                    <p>{data.info}</p>
                  </div>
                </>
              );
            })}
        </div>
        <div className="close" onClick={() => changeShowMoreDetail(false)}>
          <IoClose />
        </div>
      </div>
    </>
  );
};

export default MoreDetail;
