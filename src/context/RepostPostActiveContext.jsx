import { createContext, useState } from "react";

const RepostPostActiveContext = createContext();

export const RepostPostActiveProvider = ({ children }) => {
  const [repostActive, setActive] = useState(false);

  const changeRepostActive = (newActive) => {
    setActive(newActive);
  };

  return (
    <RepostPostActiveContext.Provider
      value={{ repostActive, changeRepostActive }}
    >
      {children}
    </RepostPostActiveContext.Provider>
  );
};

export default RepostPostActiveContext;
