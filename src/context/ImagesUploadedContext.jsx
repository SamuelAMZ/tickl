import { createContext, useState } from "react";

const ImagesUploadedContext = createContext();

export const ImagesUploadedProvider = ({ children }) => {
  const [images, changeImages] = useState([]);

  const setImages = (render) => {
    changeImages(render);
  };

  return (
    <ImagesUploadedContext.Provider value={{ images, setImages }}>
      {children}
    </ImagesUploadedContext.Provider>
  );
};

export default ImagesUploadedContext;
