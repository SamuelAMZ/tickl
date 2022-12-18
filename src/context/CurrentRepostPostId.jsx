import { createContext, useState } from "react";

const CurrentRepostPostIdContext = createContext();

export const CurrentRepostPostIdProvider = ({ children }) => {
  const [currentRepostPostId, setCurrent] = useState(null);

  const setCurrentRepostPostId = (newActive) => {
    setCurrent(newActive);
  };

  return (
    <CurrentRepostPostIdContext.Provider
      value={{ currentRepostPostId, setCurrentRepostPostId }}
    >
      {children}
    </CurrentRepostPostIdContext.Provider>
  );
};

export default CurrentRepostPostIdContext;
