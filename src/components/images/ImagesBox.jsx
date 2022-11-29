import React, { useState, useEffect, useContext } from "react";

// icons
import { GrFormClose } from "react-icons/gr";

// contexts
import ImagesUploadedContext from "../../context/ImagesUploadedContext";

const ImagesBox = () => {
  const [imagesInDom, setImagesInDom] = useState(false);
  const { images, setImages } = useContext(ImagesUploadedContext);

  const determinClass = () => {
    if (images && imagesInDom) {
      if (images.length === 1) {
        // span the first image
        const image1 = Array.from(
          document.querySelector("#images-box-container").children
        )[0];
        image1.classList.remove("span-one");
        return "images-box-container one-image";
      }
      if (images.length === 2 || images.length === 4) {
        // span the first image
        const image1 = Array.from(
          document.querySelector("#images-box-container").children
        )[0];
        image1.classList.remove("span-one");
        return "images-box-container two-multi-images";
      }
      if (images.length === 3) {
        // span the first image
        const image1 = Array.from(
          document.querySelector("#images-box-container").children
        )[0];
        image1.classList.add("span-one");

        return "images-box-container two-multi-images";
      }
    }
  };

  //   determin if images are present in dom or not
  useEffect(() => {
    const imagesPresentInDom = document.querySelectorAll("#images-uploaded");
    if (imagesPresentInDom.length >= 1) {
      setImagesInDom(true);
    }
    if (imagesPresentInDom.length === 0) {
      setImagesInDom(false);
    }
  }, [images]);

  //   remove image on click of the remove icon
  const removeImage = (e) => {
    const targetImageId =
      e.target.parentElement.children[0].getAttribute("data-id");
    //   current images array screenshot
    const imagesScreenShot = images;
    // new images array
    imagesScreenShot.forEach((img, idx) => {
      if (img.imgId === targetImageId) {
        imagesScreenShot.splice(idx, 1);
      }
    });

    console.log(imagesScreenShot);

    // update images state
    setImages([...imagesScreenShot]);
  };

  return (
    <div id="images-box-container" className={determinClass()}>
      {images &&
        images.map((img, idx) => {
          return (
            <div key={idx} className="single-image-uploaded">
              <img
                id="images-uploaded"
                data-id={img.imgId}
                src={img.imgUrl}
                alt={img.imgName}
              />
              <div className="remove-image" onClick={removeImage}>
                <GrFormClose />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImagesBox;
