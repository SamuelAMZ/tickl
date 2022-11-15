import { createContext, useState } from "react";

const DesktopPostActiveContext = createContext();

export const DesktopPostActiveProvider = ({ children }) => {
  const [deskActive, setActive] = useState(false);

  const changeDeskActive = (newActive) => {
    setActive(newActive);
  };

  return (
    <DesktopPostActiveContext.Provider value={{ deskActive, changeDeskActive }}>
      {children}
    </DesktopPostActiveContext.Provider>
  );
};

export default DesktopPostActiveContext;
