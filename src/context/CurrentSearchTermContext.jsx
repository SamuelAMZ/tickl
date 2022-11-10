import { createContext, useState } from "react";

const CurrentSearchTermContext = createContext();

export const CurrentSearchTermProvider = ({ children }) => {
  const [current, setCurrent] = useState("");

  const changeCurrent = (newActive) => {
    setCurrent(newActive);
  };

  return (
    <CurrentSearchTermContext.Provider value={{ current, changeCurrent }}>
      {children}
    </CurrentSearchTermContext.Provider>
  );
};

export default CurrentSearchTermContext;
