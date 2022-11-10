import { createContext, useState } from "react";

const MoreDetailsContext = createContext();

export const MoreDetailsProvider = ({ children }) => {
  const [showMoreDetail, setActive] = useState(false);

  const changeShowMoreDetail = (newActive) => {
    setActive(newActive);
  };

  return (
    <MoreDetailsContext.Provider
      value={{ showMoreDetail, changeShowMoreDetail }}
    >
      {children}
    </MoreDetailsContext.Provider>
  );
};

export default MoreDetailsContext;
