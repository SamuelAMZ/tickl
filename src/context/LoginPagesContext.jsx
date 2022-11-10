import { createContext, useState } from "react";

const LoginFormsContext = createContext();

export const LoginFormProvider = ({ children }) => {
  const [active, setActive] = useState(true);

  const changeActive = (newActive) => {
    setActive(newActive);
  };

  return (
    <LoginFormsContext.Provider value={{ active, changeActive }}>
      {children}
    </LoginFormsContext.Provider>
  );
};

export default LoginFormsContext;
