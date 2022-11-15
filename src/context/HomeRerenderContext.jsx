import { createContext, useState } from "react";

const HomeReRenderContext = createContext();

export const HomeReRenderProvider = ({ children }) => {
  const [reRender, setRerender] = useState(0);

  const changeRerender = (render) => {
    setRerender(render);
  };

  return (
    <HomeReRenderContext.Provider value={{ reRender, changeRerender }}>
      {children}
    </HomeReRenderContext.Provider>
  );
};

export default HomeReRenderContext;
