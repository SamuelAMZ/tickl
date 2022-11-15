import { createContext, useState } from "react";

const HomePostsDataContext = createContext();

export const HomePostsDataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const changeData = (newData) => {
    setData(newData);
  };

  return (
    <HomePostsDataContext.Provider value={{ data, changeData }}>
      {children}
    </HomePostsDataContext.Provider>
  );
};

export default HomePostsDataContext;
