import { createContext, useState } from "react";

const MenuActiveContext = createContext();

export const MenuActiveProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  const changeActive = (newActive) => {
    setActive(newActive);
  };

  return (
    <MenuActiveContext.Provider value={{ active, changeActive }}>
      {children}
    </MenuActiveContext.Provider>
  );
};

export default MenuActiveContext;
