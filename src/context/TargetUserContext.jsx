import { createContext, useState } from "react";

const TargetUserContext = createContext();

export const TargetUserProvider = ({ children }) => {
  const [targetUser, setLogin] = useState(null);

  const setTargetUser = (newLogin) => {
    setLogin(newLogin);
  };

  return (
    <TargetUserContext.Provider value={{ targetUser, setTargetUser }}>
      {children}
    </TargetUserContext.Provider>
  );
};

export default TargetUserContext;
