import { createContext, useState } from "react";

const CloudResultContext = createContext();

export const CloudResultProvider = ({ children }) => {
  const [cloudResult, setCurrent] = useState(null);

  const setCloudResult = (newActive) => {
    setCurrent(newActive);
  };

  return (
    <CloudResultContext.Provider value={{ cloudResult, setCloudResult }}>
      {children}
    </CloudResultContext.Provider>
  );
};

export default CloudResultContext;
