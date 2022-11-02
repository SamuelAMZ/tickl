import { createContext, useState } from "react";

const MobileShowContext = createContext();

export const MobileShowProvider = ({ children }) => {
  const [show, setShow] = useState(true);

  const changeShow = (newShow) => {
    setShow(newShow);
  };

  return (
    <MobileShowContext.Provider value={{ show, changeShow }}>
      {children}
    </MobileShowContext.Provider>
  );
};

export default MobileShowContext;
