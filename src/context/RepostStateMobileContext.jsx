import { createContext, useState } from "react";

const RepostStateMobileContext = createContext();

export const RepostStateMobileProvider = ({ children }) => {
  const [repostData, setData] = useState(null);

  const changeRepostMobile = (newData) => {
    setData(newData);
  };

  return (
    <RepostStateMobileContext.Provider
      value={{ repostData, changeRepostMobile }}
    >
      {children}
    </RepostStateMobileContext.Provider>
  );
};

export default RepostStateMobileContext;
